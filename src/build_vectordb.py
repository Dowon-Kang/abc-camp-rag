import os
import pandas as pd
import chromadb


DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
CSV_PATH = os.path.join(DATA_DIR, "yes24_it_mobile_bestseller.csv")
VECTOR_PATH = os.path.join(DATA_DIR, "vectors.tsv")
DB_PATH = os.path.join(DATA_DIR, "chroma_db")
COLLECTION_NAME = "yes24_books"


def load_books():
    df = pd.read_csv(CSV_PATH, encoding="utf-8-sig")
    return df


def load_vectors():
    vectors = []
    with open(VECTOR_PATH, "r", encoding="utf-8") as f:
        for line in f:
            values = [float(x) for x in line.strip().split("\t")]
            vectors.append(values)
    return vectors


def build_documents(df):
    documents = []
    metadatas = []
    ids = []

    for idx, row in df.iterrows():
        title = str(row.get("제목", ""))
        author = str(row.get("저자", ""))
        publisher = str(row.get("출판사", ""))
        price = str(row.get("판매가", ""))
        discount = str(row.get("할인율", ""))
        pub_date = str(row.get("출간일", ""))
        link = str(row.get("링크", ""))

        doc_text = f"{title} | 저자: {author} | 출판사: {publisher} | 판매가: {price}원 | 할인율: {discount}% | 출간일: {pub_date}"

        documents.append(doc_text)
        metadatas.append({
            "title": title,
            "author": author,
            "publisher": publisher,
            "price": price,
            "discount": discount,
            "pub_date": pub_date,
            "link": link,
        })
        ids.append(f"book_{idx}")

    return documents, metadatas, ids


def build_vectordb():
    print("데이터 로딩 중...")
    df = load_books()
    print(f"총 {len(df)}권 도서 데이터 로드 완료")

    print("임베딩 벡터 로딩 중...")
    vectors = load_vectors()
    print(f"총 {len(vectors)}개 벡터 로드 완료")

    if len(df) != len(vectors):
        print(f"경고: 데이터({len(df)}건)와 벡터({len(vectors)}건) 수가 다릅니다.")
        min_len = min(len(df), len(vectors))
        df = df.iloc[:min_len]
        vectors = vectors[:min_len]

    print("문서 및 메타데이터 생성 중...")
    documents, metadatas, ids = build_documents(df)

    print("ChromaDB 구축 중...")
    client = chromadb.PersistentClient(path=DB_PATH)

    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass

    collection = client.create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"}
    )

    batch_size = 100
    for i in range(0, len(documents), batch_size):
        end = min(i + batch_size, len(documents))
        collection.add(
            documents=documents[i:end],
            embeddings=vectors[i:end],
            metadatas=metadatas[i:end],
            ids=ids[i:end],
        )
        print(f"  배치 {i // batch_size + 1} 완료 ({end}/{len(documents)})")

    print(f"벡터 데이터베이스 구축 완료! 총 {len(documents)}건 저장")
    print(f"저장 위치: {DB_PATH}")

    return collection


if __name__ == "__main__":
    build_vectordb()
