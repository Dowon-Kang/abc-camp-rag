import os

import chromadb
import torch
from dotenv import load_dotenv
from groq import Groq
from transformers import AutoTokenizer, AutoModel


DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
DB_PATH = os.path.join(DATA_DIR, "chroma_db")
COLLECTION_NAME = "yes24_books"

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))


class BookChatbot:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=DB_PATH)
        self.collection = self.client.get_collection(name=COLLECTION_NAME)
        self.tokenizer = AutoTokenizer.from_pretrained("klue/bert-base")
        self.model = AutoModel.from_pretrained("klue/bert-base")

        api_key = os.getenv("GROQ_API_KEY")
        if not api_key or api_key == "your_groq_api_key_here":
            self.groq_client = None
        else:
            self.groq_client = Groq(api_key=api_key)

    def get_embedding(self, text):
        inputs = self.tokenizer(
            text, return_tensors="pt", padding=True, truncation=True, max_length=512
        )
        with torch.no_grad():
            outputs = self.model(**inputs)
        embedding = outputs.last_hidden_state[:, 0, :].squeeze().numpy()
        return embedding.tolist()

    def search(self, query, n_results=5):
        query_embedding = self.get_embedding(query)
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            include=["documents", "metadatas", "distances"],
        )
        return results

    def _build_context(self, results):
        books = []
        for doc, meta, dist in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0],
        ):
            similarity = max(0, 1 - dist) * 100
            books.append(
                f"- 제목: {meta['title']}, 저자: {meta['author']}, "
                f"출판사: {meta['publisher']}, 판매가: {meta['price']}원, "
                f"할인율: {meta['discount']}%, 출간일: {meta['pub_date']}, "
                f"유사도: {similarity:.1f}%, 링크: {meta.get('link', '')}"
            )
        return "\n".join(books)

    def generate_response(self, query):
        results = self.search(query, n_results=5)

        if not results["documents"][0]:
            return "검색 결과가 없습니다. 다른 키워드로 다시 시도해 주세요."

        context = self._build_context(results)

        if self.groq_client is None:
            return self._format_plain(query, context, results)

        system_prompt = (
            "당신은 Yes24 IT 모바일 베스트셀러 도서 추천 챗봇입니다. "
            "사용자의 질문에 대해 검색된 도서 정보를 바탕으로 친절하고 자연스러운 한국어로 답변하세요. "
            "도서 제목, 저자, 가격, 할인율 등의 정보를 활용하여 추천 이유를 설명하세요. "
            "마크다운 형식을 사용하여 가독 있게 답변하세요."
        )

        user_prompt = (
            f"사용자 질문: {query}\n\n"
            f"검색된 도서 목록:\n{context}\n\n"
            "위 도서 정보를 참고하여 사용자 질문에 답변해 주세요."
        )

        try:
            chat_response = self.groq_client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0.7,
                max_tokens=2048,
            )
            return chat_response.choices[0].message.content
        except Exception as e:
            return self._format_plain(query, context, results, error=str(e))

    def _format_plain(self, query, context, results, error=None):
        lines = [f"**질문:** {query}\n"]
        if error:
            lines.append(f"*LLM 응답 생성 실패 ({error}), 검색 결과만 표시합니다.*\n")
        lines.append("**검색된 도서:**\n")

        for i, (doc, meta, dist) in enumerate(zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0],
        ), 1):
            similarity = max(0, 1 - dist) * 100
            lines.append(f"**{i}. {meta['title']}**")
            lines.append(f"   - 저자: {meta['author']}")
            lines.append(f"   - 출판사: {meta['publisher']}")
            lines.append(f"   - 판매가: {meta['price']}원")
            lines.append(f"   - 할인율: {meta['discount']}%")
            lines.append(f"   - 출간일: {meta['pub_date']}")
            lines.append(f"   - 유사도: {similarity:.1f}%")
            if meta.get("link"):
                lines.append(f"   - [도서 링크]({meta['link']})")
            lines.append("")

        return "\n".join(lines)

    def get_recommendations(self, category=None, n=5):
        if category:
            results = self.search(category, n_results=n)
        else:
            results = self.collection.get(limit=n)
        return results
