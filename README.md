# Yes24 IT 모바일 베스트셀러 대시보드

예스24 IT 모바일 종합 베스트셀러 도서 데이터를 수집, 분석, 시각화하는 대시보드 프로젝트입니다.

## 주요 기능

### 1. 웹 스크래핑
- `scrape_yes24.py`: 예스24 IT 모바일 베스트셀러 전체 페이지 크롤링
- `yes24_scraper.py`: 추가 스크래핑 유틸리티
- 수집 항목: 순위, 도서명, 저자, 출판사, 출간일, 판매가, 정가, 할인율, 판매지수, 이미지

### 2. 데이터 분석 및 시각화 (Streamlit 대시보드)
- **개요 페이지**: 주요 지표 요약, 출판사 순위, 출간 트렌드, 가격 분포
- **가격 분석**: 가격 분포 히스토그램, 순위별 가격, 출판사별 가격 비교
- **출판사 분석**: 상위 출판사 순위, 평균 가격, 저자 키워드 분석
- **키워드 검색**: 제목/저자 검색, 고급 검색 (가격, 출판사, 할인율, 출간년도 필터)
- **전체 순위**: 순위별 도서 목록, CSV 다운로드
- **AI 챗봇**: 벡터 검색 기반 도서 질의응답 (Groq API 연동)

### 3. RAG (Retrieval-Augmented Generation)
- ChromaDB 벡터 데이터베이스 구축
- KLUE BERT 임베딩 모델 사용
- Groq API를 통한 AI 응답 생성

## 기술 스택

- **언어**: Python
- **웹 프레임워크**: Streamlit
- **데이터 수집**: requests, BeautifulSoup4
- **데이터 처리**: pandas
- **시각화**: plotly
- **벡터 DB**: ChromaDB
- **임베딩 모델**: klue/bert-base (Hugging Face Transformers)
- **AI API**: Groq (LLaMA)

## 설치 및 실행

### 1. 환경 설정
```bash
# 가상환경 생성
python -m venv .venv

# 가상환경 활성화 (Windows)
.venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수를 설정합니다:
```
GROQ_API_KEY=your_groq_api_key_here
```

### 3. 데이터 수집
```bash
python scrape_yes24.py
```

### 4. 벡터 DB 구축
```bash
python src/build_vectordb.py
```

### 5. 대시보드 실행
```bash
streamlit run src/app.py
```

## 프로젝트 구조

```
ABC-RAG/
├── .env                    # 환경 변수 (API 키)
├── .gitignore
├── requirements.txt        # Python 의존성
├── scrape_yes24.py         # 예스24 스크래핑 스크립트
├── yes24_scraper.py        # 추가 스크래핑 유틸리티
├── create_presentation.js  # 프레젠테이션 생성 스크립트
├── data/
│   ├── yes24_it_mobile_bestsellers.csv  # 수집된 데이터
│   ├── metadata.tsv        # 벡터 DB 메타데이터
│   └── vectors.tsv         # 벡터 데이터
├── src/
│   ├── app.py              # Streamlit 대시보드 메인
│   ├── chatbot.py          # AI 챗봇 모듈
│   ├── build_vectordb.py   # 벡터 DB 구축
│   ├── data_loader.py      # 데이터 로더
│   ├── create_excel_dashboard.py  # Excel 대시보드 생성
│   └── components/
│       └── charts.py       # 시각화 차트 컴포넌트
└── chroma_db/              # ChromaDB 저장소
```

## 사용 예시

1. 대시보드 접속 후 좌측 메뉴에서 원하는 페이지 선택
2. 가격, 출판사, 출간년도 등으로 필터링
3. 도서 검색 또는 AI 챗봇을 통한 자연어 질의

## 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
