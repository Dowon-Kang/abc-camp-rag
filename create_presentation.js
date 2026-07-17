const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Nordic Modern Color Palette
const COLORS = {
  darkNavy: "2C3E50",
  offWhite: "F8F9FA",
  softBlue: "5B8FA8",
  sageGreen: "7BAE7F",
  warmGray: "95A5A6",
  lightGray: "ECF0F1",
  white: "FFFFFF",
  charcoal: "34495E",
  paleBlue: "D6EAF8",
  paleGreen: "D5E8D4",
  accent: "3498DB",
  darkText: "2C3E50",
  lightText: "7F8C8D",
};

// Icon rendering helpers
function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function main() {
  // Import icons
  const { FaBook, FaChartLine, FaUsers, FaLightbulb, FaBullseye, FaRocket, FaCalendarAlt, FaMoneyBillWave, FaQuestionCircle, FaCheckCircle, FaStar, FaPencilAlt, FaSearch, FaCogs, FaLayerGroup } = require("react-icons/fa");

  // Pre-render icons
  const iconBook = await iconToBase64Png(FaBook, "#" + COLORS.softBlue, 256);
  const iconChart = await iconToBase64Png(FaChartLine, "#" + COLORS.sageGreen, 256);
  const iconUsers = await iconToBase64Png(FaUsers, "#" + COLORS.softBlue, 256);
  const iconLightbulb = await iconToBase64Png(FaLightbulb, "#" + COLORS.sageGreen, 256);
  const iconBullseye = await iconToBase64Png(FaBullseye, "#" + COLORS.softBlue, 256);
  const iconRocket = await iconToBase64Png(FaRocket, "#" + COLORS.sageGreen, 256);
  const iconCalendar = await iconToBase64Png(FaCalendarAlt, "#" + COLORS.softBlue, 256);
  const iconMoney = await iconToBase64Png(FaMoneyBillWave, "#" + COLORS.sageGreen, 256);
  const iconQuestion = await iconToBase64Png(FaQuestionCircle, "#" + COLORS.softBlue, 256);
  const iconCheck = await iconToBase64Png(FaCheckCircle, "#" + COLORS.sageGreen, 256);
  const iconStar = await iconToBase64Png(FaStar, "#" + COLORS.softBlue, 256);
  const iconPencil = await iconToBase64Png(FaPencilAlt, "#" + COLORS.sageGreen, 256);
  const iconSearch = await iconToBase64Png(FaSearch, "#" + COLORS.softBlue, 256);
  const iconCogs = await iconToBase64Png(FaCogs, "#" + COLORS.sageGreen, 256);
  const iconLayers = await iconToBase64Png(FaLayerGroup, "#" + COLORS.softBlue, 256);

  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "ABC-RAG";
  pres.title = "AI 도서 기획 프로젝트";

  // Helper: add page number
  function addPageNumber(slide, num) {
    slide.addText(`${num} / 15`, {
      x: 8.8, y: 5.15, w: 1, h: 0.35,
      fontSize: 9, color: COLORS.lightText, align: "right",
      fontFace: "Calibri",
    });
  }

  // Helper: add bottom accent line
  function addBottomAccent(slide) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.45, w: 10, h: 0.175,
      fill: { color: COLORS.softBlue },
    });
  }

  // Helper: slide with notes
  function createSlide(notes) {
    let slide = pres.addSlide();
    slide.addNotes(notes);
    return slide;
  }

  // ============================================
  // SLIDE 1: Title Slide
  // ============================================
  let slide1 = createSlide(
    "안녕하세요. 오늘 발표할 주제는 'AI 도서 기획 프로젝트'입니다. 예스24 IT 모바일 베스트셀러 데이터를 분석하여, 새로운 AI 도서를 어떻게 기획할 것인지에 대한 전략을 공유하겠습니다. 약 1분간 이 슬라이드를 설명드리겠습니다."
  );
  slide1.background = { color: COLORS.darkNavy };

  // Decorative circle
  slide1.addShape(pres.shapes.OVAL, {
    x: 7.5, y: -1.5, w: 4, h: 4,
    fill: { color: COLORS.softBlue, transparency: 80 },
  });
  slide1.addShape(pres.shapes.OVAL, {
    x: 8.2, y: 3, w: 3, h: 3,
    fill: { color: COLORS.sageGreen, transparency: 85 },
  });

  slide1.addText("AI 도서 기획 프로젝트", {
    x: 0.8, y: 1.2, w: 7, h: 1.2,
    fontSize: 40, fontFace: "Georgia", color: COLORS.white,
    bold: true, margin: 0,
  });
  slide1.addText("예스24 베스트셀러 데이터 기반 전략", {
    x: 0.8, y: 2.5, w: 7, h: 0.6,
    fontSize: 18, fontFace: "Calibri", color: COLORS.lightGray,
    margin: 0,
  });
  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.3, w: 1.5, h: 0.04,
    fill: { color: COLORS.sageGreen },
  });
  slide1.addText("ABC-RAG | 2026.07", {
    x: 0.8, y: 3.6, w: 4, h: 0.4,
    fontSize: 12, fontFace: "Calibri", color: COLORS.warmGray,
    margin: 0,
  });

  // ============================================
  // SLIDE 2: 프로젝트 개요
  // ============================================
  let slide2 = createSlide(
    "다음은 프로젝트 개요입니다. 우리 프로젝트는 예스24 IT 모바일 베스트셀러 1000여 권의 데이터를 분석하여, 시장에서 성공할 수 있는 AI 도서를 기획하는 것이 목표입니다. 데이터 기반 의사결정을 통해 출판 리스크를 최소화하고, 독자가 실제로 원하는 콘텐츠를 제공하고자 합니다."
  );
  slide2.background = { color: COLORS.offWhite };
  addPageNumber(slide2, 2);
  addBottomAccent(slide2);

  slide2.addText("프로젝트 개요", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  // Info cards
  const overviewItems = [
    { icon: iconSearch, title: "데이터 수집", desc: "예스24 IT 모바일\n베스트셀러 1,000+권" },
    { icon: iconChart, title: "분석 목표", desc: "시장 트렌드 및\n성공 요인 도출" },
    { icon: iconBook, title: "도서 기획", desc: "데이터 기반\n신규 도서 기획" },
    { icon: iconRocket, title: "출판 전략", desc: "마케팅 및\n판매 전략 수립" },
  ];

  overviewItems.forEach((item, i) => {
    const x = 0.8 + i * 2.25;
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.5, w: 2, h: 3,
      fill: { color: COLORS.white },
      shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.08 },
    });
    slide2.addImage({ data: item.icon, x: x + 0.7, y: 1.8, w: 0.6, h: 0.6 });
    slide2.addText(item.title, {
      x: x + 0.2, y: 2.6, w: 1.6, h: 0.5,
      fontSize: 14, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, align: "center", margin: 0,
    });
    slide2.addText(item.desc, {
      x: x + 0.2, y: 3.1, w: 1.6, h: 1,
      fontSize: 11, fontFace: "Calibri", color: COLORS.lightText,
      align: "center", margin: 0,
    });
  });

  // ============================================
  // SLIDE 3: 시장 동향
  // ============================================
  let slide3 = createSlide(
    "IT 도서 시장의 주요 동향을 살펴보겠습니다. AI 관련 도서가 전체 IT 베스트셀러의 상당 부분을 차지하고 있으며, 특히 Claude, ChatGPT, Gemini 같은 실용적 AI 도구 활용서가 인기를 끌고 있습니다. 바이브 코딩과 같은 새로운 코딩 패러다임도 주목받고 있습니다."
  );
  slide3.background = { color: COLORS.offWhite };
  addPageNumber(slide3, 3);
  addBottomAccent(slide3);

  slide3.addText("시장 동향", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  // Chart - AI book market share
  slide3.addChart(pres.charts.PIE, [{
    name: "도서 유형",
    labels: ["AI 활용서", "코딩/개발", "에듀테크", "기타 IT"],
    values: [45, 25, 20, 10],
  }], {
    x: 0.5, y: 1.4, w: 4.5, h: 3.5,
    showPercent: true,
    showTitle: false,
    showLegend: true,
    legendPos: "b",
    chartColors: [COLORS.softBlue, COLORS.sageGreen, COLORS.warmGray, COLORS.lightGray],
    dataLabelColor: COLORS.darkNavy,
    dataLabelFontSize: 11,
  });

  // Trend highlights
  const trends = [
    "AI 활용서 전체 베스트셀러 45% 점유",
    "클로드 코드 관련 도서 급증",
    "바이브 코딩 트렌드 부상",
    "교육 분야 AI 활용 수요 확대",
  ];

  trends.forEach((trend, i) => {
    slide3.addImage({ data: iconCheck, x: 5.3, y: 1.6 + i * 0.7, w: 0.3, h: 0.3 });
    slide3.addText(trend, {
      x: 5.8, y: 1.55 + i * 0.7, w: 3.8, h: 0.4,
      fontSize: 13, fontFace: "Calibri", color: COLORS.darkText,
      margin: 0,
    });
  });

  // ============================================
  // SLIDE 4: 베스트셀러 분석
  // ============================================
  let slide4 = createSlide(
    "상위 10개 베스트셀러를 분석하면 공통적인 특징이 보입니다. 첫째, 실습 중심의 구성이 중요합니다. 둘째, 최신 AI 도구를 다뤄야 합니다. 셋째, 초보자도 따라할 수 있는 난이도가 필요합니다. 이 분석 결과는 우리 도서 기획의 핵심 기준이 됩니다."
  );
  slide4.background = { color: COLORS.offWhite };
  addPageNumber(slide4, 4);
  addBottomAccent(slide4);

  slide4.addText("베스트셀러 TOP 10 분석", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  // Top books table
  const topBooks = [
    ["순위", "도서명", "출판사", "가격"],
    ["1", "바로바로 클로드 with 코워크", "골든래빗", "25,200원"],
    ["2", "혼자 공부하는 바이브 코딩", "한빛미디어", "27,000원"],
    ["3", "뚝딱 바로 써먹는 AI 3대장", "안경다리BOOKS", "19,800원"],
    ["4", "제미나이 완전 미친 활용법 81제", "골든래빗", "21,600원"],
    ["5", "요즘 교사를 위한 에듀테크 5대장", "앤써북", "17,820원"],
  ];

  slide4.addTable(topBooks, {
    x: 0.5, y: 1.3, w: 9,
    border: { pt: 0.5, color: COLORS.lightGray },
    colW: [0.8, 4.5, 2, 1.7],
    fontSize: 11,
    fontFace: "Calibri",
    color: COLORS.darkText,
    rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45],
    autoPage: false,
    headerRow: true,
  });

  // Insight box
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.2, w: 9, h: 0.8,
    fill: { color: COLORS.paleBlue },
  });
  slide4.addText("핵심 인사이트: 실습 중심 + 최신 도구 + 초보자 친화적 구성이 성공 공식", {
    x: 0.8, y: 4.3, w: 8.4, h: 0.6,
    fontSize: 13, fontFace: "Calibri", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  // ============================================
  // SLIDE 5: 타겟 독자
  // ============================================
  let slide5 = createSlide(
    "타겟 독자를 세 가지 페르소나로 정의했습니다. 첫째, AI를 처음 접하는 직장인. 둘째, 교육 현장에서 AI를 활용하고 싶은 교사. 셋째, 코딩을 배우고 싶은 초보 개발자. 이 세 그룹을 모두 만족시키는 도서를 기획하겠습니다."
  );
  slide5.background = { color: COLORS.offWhite };
  addPageNumber(slide5, 5);
  addBottomAccent(slide5);

  slide5.addText("타겟 독자", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  const personas = [
    {
      icon: iconUsers,
      title: "직장인 AI 활용자",
      desc: "업무 효율을 높이고 싶은\n20-40대 직장인",
      color: COLORS.softBlue,
    },
    {
      icon: iconLightbulb,
      title: "교육 현장 교사",
      desc: "AI 도구로 수업과 생활을\n혁신하고 싶은 교사",
      color: COLORS.sageGreen,
    },
    {
      icon: iconCogs,
      title: "초보 개발자",
      desc: "바이브 코딩으로 빠르게\n서비스를 만들고 싶은 개발자",
      color: COLORS.warmGray,
    },
  ];

  personas.forEach((p, i) => {
    const x = 0.8 + i * 3;
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.6, h: 3.2,
      fill: { color: COLORS.white },
      shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.08 },
    });
    // Color accent top bar
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.6, h: 0.08,
      fill: { color: p.color },
    });
    slide5.addImage({ data: p.icon, x: x + 0.9, y: 1.8, w: 0.7, h: 0.7 });
    slide5.addText(p.title, {
      x: x + 0.2, y: 2.7, w: 2.2, h: 0.5,
      fontSize: 15, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, align: "center", margin: 0,
    });
    slide5.addText(p.desc, {
      x: x + 0.2, y: 3.2, w: 2.2, h: 1,
      fontSize: 11, fontFace: "Calibri", color: COLORS.lightText,
      align: "center", margin: 0,
    });
  });

  // ============================================
  // SLIDE 6: 도서 컨셉
  // ============================================
  let slide6 = createSlide(
    "도서 컨셉은 '바이브 코딩과 AI 에이전틱 코딩을 하나의 책으로'입니다. 현재 시장에서는 각각의 도구별로 책이 따로 나오고 있는데, 여러 AI 도구를 한 권으로 통합하여 비교하고 실습할 수 있는 책이 없습니다. 이것이 바로 우리 도서의 차별화 포인트입니다."
  );
  slide6.background = { color: COLORS.darkNavy };
  addPageNumber(slide6, 6);

  slide6.addText("도서 컨셉", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.white,
    bold: true, margin: 0,
  });

  slide6.addText("AI 코딩 올인원 가이드", {
    x: 0.8, y: 1.5, w: 8, h: 1,
    fontSize: 44, fontFace: "Georgia", color: COLORS.white,
    bold: true, margin: 0,
  });

  slide6.addText("Claude + ChatGPT + Gemini를 아우르는\n실전 바이브 코딩 완성서", {
    x: 0.8, y: 2.6, w: 8, h: 0.8,
    fontSize: 18, fontFace: "Calibri", color: COLORS.lightGray,
    margin: 0,
  });

  // Key features
  const features = [
    "3대 AI 도구 비교 실습",
    "바이브 코딩 A to Z",
    "실전 프로젝트 10개",
  ];

  features.forEach((f, i) => {
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: 0.8 + i * 2.8, y: 3.8, w: 2.5, h: 0.6,
      fill: { color: COLORS.softBlue, transparency: 70 },
    });
    slide6.addText(f, {
      x: 0.8 + i * 2.8, y: 3.8, w: 2.5, h: 0.6,
      fontSize: 13, fontFace: "Calibri", color: COLORS.white,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
  });

  // Decorative
  slide6.addShape(pres.shapes.OVAL, {
    x: -1, y: 3.5, w: 3, h: 3,
    fill: { color: COLORS.softBlue, transparency: 85 },
  });

  // ============================================
  // SLIDE 7: 핵심 주제
  // ============================================
  let slide7 = createSlide(
    "핵심 주제로 다룰 내용을 정리했습니다. AI 코딩 도구 비교, 바이브 코딩 실습, 에이전틱 코딩 개념, 실전 프로젝트 구현 등 총 4개의 핵심 파트로 구성됩니다. 각 파트는 이론과 실습이 균형을 이루도록 설계했습니다."
  );
  slide7.background = { color: COLORS.offWhite };
  addPageNumber(slide7, 7);
  addBottomAccent(slide7);

  slide7.addText("핵심 주제", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  const topics = [
    { num: "01", title: "AI 코딩 도구 비교", desc: "Claude, ChatGPT, Gemini\n장단점 및 활용법" },
    { num: "02", title: "바이브 코딩 실습", desc: "自然語言로 코드 생성\n실전 웹앱 만들기" },
    { num: "03", title: "에이전틱 코딩", desc: "AI 에이전트 활용\n자동화 개발 워크플로우" },
    { num: "04", title: "실전 프로젝트", desc: "10개 프로젝트\n포트폴리오 완성" },
  ];

  topics.forEach((t, i) => {
    const y = 1.4 + i * 0.95;
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: y, w: 8.4, h: 0.8,
      fill: { color: i % 2 === 0 ? COLORS.white : COLORS.paleGreen },
    });
    slide7.addText(t.num, {
      x: 1, y: y + 0.1, w: 0.6, h: 0.6,
      fontSize: 24, fontFace: "Georgia", color: COLORS.softBlue,
      bold: true, margin: 0,
    });
    slide7.addText(t.title, {
      x: 1.8, y: y + 0.1, w: 2.5, h: 0.6,
      fontSize: 15, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, margin: 0,
    });
    slide7.addText(t.desc, {
      x: 4.5, y: y + 0.1, w: 4.5, h: 0.6,
      fontSize: 12, fontFace: "Calibri", color: COLORS.lightText,
      margin: 0,
    });
  });

  // ============================================
  // SLIDE 8: 차별화 전략
  // ============================================
  let slide8 = createSlide(
    "기존 도서와의 차별화 전략입니다. 첫째, 멀티 도구 통합: 하나의 책에서 여러 AI 도구를 비교하며 배울 수 있습니다. 둘째, 실전 프로젝트 중심: 이론보다 실제 만들어보는 것에 집중합니다. 셋째, 최신 트렌드 반영: 2026년 최신 AI 도구와 기능을 다룹니다."
  );
  slide8.background = { color: COLORS.offWhite };
  addPageNumber(slide8, 8);
  addBottomAccent(slide8);

  slide8.addText("차별화 전략", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  const strategies = [
    {
      icon: iconLayers,
      title: "멀티 도구 통합",
      desc: "Claude, ChatGPT, Gemini를\n하나의 책에서 비교 학습",
      bgColor: COLORS.paleBlue,
    },
    {
      icon: iconRocket,
      title: "실전 프로젝트 중심",
      desc: "이론 30% + 실습 70%\n10개 완성 프로젝트 수록",
      bgColor: COLORS.paleGreen,
    },
    {
      icon: iconStar,
      title: "2026년 최신 트렌드",
      desc: "바이브 코딩, 에이전틱 코딩\nAI 에이전트 활용법",
      bgColor: COLORS.paleBlue,
    },
  ];

  strategies.forEach((s, i) => {
    const x = 0.8 + i * 3;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.6, h: 3.2,
      fill: { color: s.bgColor },
    });
    slide8.addImage({ data: s.icon, x: x + 0.9, y: 1.7, w: 0.7, h: 0.7 });
    slide8.addText(s.title, {
      x: x + 0.2, y: 2.6, w: 2.2, h: 0.5,
      fontSize: 15, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, align: "center", margin: 0,
    });
    slide8.addText(s.desc, {
      x: x + 0.2, y: 3.1, w: 2.2, h: 1,
      fontSize: 11, fontFace: "Calibri", color: COLORS.lightText,
      align: "center", margin: 0,
    });
  });

  // ============================================
  // SLIDE 9: 목차 구성
  // ============================================
  let slide9 = createSlide(
    "목차를 소개하겠습니다. 총 5개의 파트로 구성되며, 각 파트는 이론에서 실습으로 자연스럽게 진행됩니다. 초보자도 쉽게 따라할 수 있도록 단계별로 난이도를 높여가는 구조입니다."
  );
  slide9.background = { color: COLORS.offWhite };
  addPageNumber(slide9, 9);
  addBottomAccent(slide9);

  slide9.addText("목차 구성", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  const chapters = [
    { part: "Part 1", title: "AI 코딩 입문", pages: "1-5장", color: COLORS.softBlue },
    { part: "Part 2", title: "도구별 실습", pages: "6-10장", color: COLORS.sageGreen },
    { part: "Part 3", title: "바이브 코딩 마스터", pages: "11-15장", color: COLORS.warmGray },
    { part: "Part 4", title: "에이전틱 코딩", pages: "16-20장", color: COLORS.softBlue },
    { part: "Part 5", title: "실전 프로젝트", pages: "21-25장", color: COLORS.sageGreen },
  ];

  chapters.forEach((ch, i) => {
    const y = 1.4 + i * 0.75;
    // Left color bar
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: y, w: 0.08, h: 0.6,
      fill: { color: ch.color },
    });
    slide9.addText(ch.part, {
      x: 1.1, y: y + 0.05, w: 1.2, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: COLORS.lightText,
      margin: 0,
    });
    slide9.addText(ch.title, {
      x: 2.3, y: y + 0.05, w: 4, h: 0.5,
      fontSize: 15, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, margin: 0,
    });
    slide9.addText(ch.pages, {
      x: 7.5, y: y + 0.05, w: 2, h: 0.5,
      fontSize: 12, fontFace: "Calibri", color: COLORS.lightText,
      align: "right", margin: 0,
    });
  });

  // ============================================
  // SLIDE 10: 저자 후보
  // ============================================
  let slide10 = createSlide(
    "저자 후보를 검토 중입니다. AI 도서 베스트셀러 저자들의 공통 특징을 분석한 결과, 실무 경험이 풍부하고 기술 블로그나 SNS로 활발히 소통하는 저자가 성공할 확률이 높습니다. 내부 전문가와 외부 협력자를 모두 고려하고 있습니다."
  );
  slide10.background = { color: COLORS.offWhite };
  addPageNumber(slide10, 10);
  addBottomAccent(slide10);

  slide10.addText("저자 후보", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  const authorCriteria = [
    { label: "실무 경력", value: "5년 이상" },
    { label: "출간 경험", value: "최소 1권 이상" },
    { label: "온라인 영향력", value: "블로그/SNS 활발" },
    { label: "강의 경험", value: "온/오프라인 강의" },
  ];

  authorCriteria.forEach((c, i) => {
    const y = 1.4 + i * 0.65;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: y, w: 8.4, h: 0.5,
      fill: { color: i % 2 === 0 ? COLORS.white : COLORS.paleGreen },
    });
    slide10.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: y, w: 8.4, h: 0.5,
      fill: { color: i % 2 === 0 ? COLORS.white : COLORS.paleGreen },
    });
    slide10.addText(c.label, {
      x: 1.2, y: y + 0.05, w: 3, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, margin: 0,
    });
    slide10.addText(c.value, {
      x: 5, y: y + 0.05, w: 4, h: 0.4,
      fontSize: 13, fontFace: "Calibri", color: COLORS.lightText,
      margin: 0,
    });
  });

  // Author candidates
  slide10.addText("후보 풀", {
    x: 0.8, y: 4.1, w: 2, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });
  slide10.addText("AI 전문가 3명 + 실무자 2명 + 교육 전문가 1명", {
    x: 2.8, y: 4.1, w: 6, h: 0.4,
    fontSize: 12, fontFace: "Calibri", color: COLORS.lightText,
    margin: 0,
  });

  // ============================================
  // SLIDE 11: 마케팅 전략
  // ============================================
  let slide11 = createSlide(
    "마케팅 전략은 온라인 중심으로 수립했습니다. AI 관련 커뮤니티와 SNS를 활용한 바이럴 마케팅, 유튜브 채널 협업, 예스24/교보문코 프로모션 등을 계획하고 있습니다. 또한 저자의 온라인 영향력을 최대한 활용할 예정입니다."
  );
  slide11.background = { color: COLORS.offWhite };
  addPageNumber(slide11, 11);
  addBottomAccent(slide11);

  slide11.addText("마케팅 전략", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  const marketing = [
    {
      icon: iconSearch,
      title: "온라인 바이럴",
      desc: "AI 커뮤니티, SNS\n챕터 미리보기 캠페인",
      items: ["블로그 리뷰단", "트위터/X 캠페인", "디스코드 커뮤니티"],
    },
    {
      icon: iconUsers,
      title: "파트너십",
      desc: "유튜브, 강의 플랫폼\n크리에이터 협업",
      items: ["유튜버 리뷰", "인프런/패스트캠퍼스", "企業 교육 제안"],
    },
    {
      icon: iconChart,
      title: "판매 채널",
      desc: "예스24, 교보문코\n프리미엄 마케팅",
      items: ["예스24 리뷰 이벤트", "교보문코 MD 추천", "전자책 병행 출간"],
    },
  ];

  marketing.forEach((m, i) => {
    const x = 0.8 + i * 3;
    slide11.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.6, h: 3.2,
      fill: { color: COLORS.white },
      shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.08 },
    });
    slide11.addImage({ data: m.icon, x: x + 0.9, y: 1.7, w: 0.6, h: 0.6 });
    slide11.addText(m.title, {
      x: x + 0.2, y: 2.5, w: 2.2, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, align: "center", margin: 0,
    });
    slide11.addText(m.desc, {
      x: x + 0.2, y: 2.9, w: 2.2, h: 0.6,
      fontSize: 11, fontFace: "Calibri", color: COLORS.lightText,
      align: "center", margin: 0,
    });
    m.items.forEach((item, j) => {
      slide11.addImage({ data: iconCheck, x: x + 0.3, y: 3.6 + j * 0.35, w: 0.2, h: 0.2 });
      slide11.addText(item, {
        x: x + 0.6, y: 3.55 + j * 0.35, w: 2, h: 0.3,
        fontSize: 10, fontFace: "Calibri", color: COLORS.darkText,
        margin: 0,
      });
    });
  });

  // ============================================
  // SLIDE 12: 예상 판매량
  // ============================================
  let slide12 = createSlide(
    "예상 판매량을 전망하겠습니다. 유사 도서의 판매 데이터와 시장 규모를 고려할 때, 출간 후 6개월 내 5,000권 이상의 판매가 가능할 것으로 예상합니다. 특히 출시 초반의 마케팅 집중 기간에 전체 판매의 40%가 발생할 것으로 보입니다."
  );
  slide12.background = { color: COLORS.offWhite };
  addPageNumber(slide12, 12);
  addBottomAccent(slide12);

  slide12.addText("예상 판매량", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  // Sales forecast chart
  slide12.addChart(pres.charts.BAR, [{
    name: "월별 예상 판매량",
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    values: [1500, 1200, 800, 600, 500, 400],
  }], {
    x: 0.5, y: 1.3, w: 5.5, h: 3.5,
    barDir: "col",
    showTitle: false,
    showLegend: false,
    chartColors: [COLORS.softBlue],
    chartArea: { fill: { color: COLORS.white }, roundedCorners: true },
    catAxisLabelColor: COLORS.lightText,
    valAxisLabelColor: COLORS.lightText,
    valGridLine: { color: COLORS.lightGray, size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: COLORS.darkNavy,
    dataLabelFontSize: 10,
  });

  // Key stats
  const stats = [
    { num: "5,000+", label: "예상 총 판매량" },
    { num: "1,500", label: "출간 첫 달" },
    { num: "40%", label: "초반 집중 비율" },
  ];

  stats.forEach((s, i) => {
    const y = 1.5 + i * 1.1;
    slide12.addText(s.num, {
      x: 6.5, y: y, w: 3, h: 0.6,
      fontSize: 32, fontFace: "Georgia", color: COLORS.softBlue,
      bold: true, margin: 0,
    });
    slide12.addText(s.label, {
      x: 6.5, y: y + 0.55, w: 3, h: 0.3,
      fontSize: 11, fontFace: "Calibri", color: COLORS.lightText,
      margin: 0,
    });
  });

  // ============================================
  // SLIDE 13: 제작 일정
  // ============================================
  let slide13 = createSlide(
    "제작 일정을 공유하겠습니다. 기획 2개월, 집필 4개월, 편집 2개월, 프로모션 1개월 등 총 9개월의 일정으로 진행됩니다. 특히 집필 기간 중간에 중간 검수를 통해 품질을 관리하겠습니다."
  );
  slide13.background = { color: COLORS.offWhite };
  addPageNumber(slide13, 13);
  addBottomAccent(slide13);

  slide13.addText("제작 일정", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  // Timeline
  const timeline = [
    { phase: "기획", period: "9-10월", duration: "2개월", color: COLORS.softBlue, w: 2.2 },
    { phase: "집필", period: "11월-2월", duration: "4개월", color: COLORS.sageGreen, w: 4.4 },
    { phase: "편집", period: "3-4월", duration: "2개월", color: COLORS.warmGray, w: 2.2 },
    { phase: "프로모션", period: "5월", duration: "1개월", color: COLORS.softBlue, w: 1.1 },
  ];

  let xAccum = 0.8;
  timeline.forEach((t, i) => {
    slide13.addShape(pres.shapes.RECTANGLE, {
      x: xAccum, y: 1.6, w: t.w, h: 0.8,
      fill: { color: t.color },
    });
    slide13.addText(t.phase, {
      x: xAccum + 0.1, y: 1.65, w: t.w - 0.2, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: COLORS.white,
      bold: true, margin: 0,
    });
    slide13.addText(t.period, {
      x: xAccum + 0.1, y: 2.0, w: t.w - 0.2, h: 0.3,
      fontSize: 10, fontFace: "Calibri", color: COLORS.white,
      margin: 0,
    });
    xAccum += t.w + 0.15;
  });

  // Milestones
  slide13.addText("주요 마일스톤", {
    x: 0.8, y: 2.8, w: 3, h: 0.4,
    fontSize: 16, fontFace: "Calibri", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  const milestones = [
    "10월: 기획 확정 및 저자 계약",
    "12월: 1차 원고 중간 검수",
    "2월: 원고 완성",
    "4월: 교정/교양 완료",
    "5월: 출간 및 마케팅 시작",
  ];

  milestones.forEach((m, i) => {
    slide13.addImage({ data: iconCheck, x: 0.8, y: 3.3 + i * 0.4, w: 0.22, h: 0.22 });
    slide13.addText(m, {
      x: 1.2, y: 3.25 + i * 0.4, w: 5, h: 0.35,
      fontSize: 12, fontFace: "Calibri", color: COLORS.darkText,
      margin: 0,
    });
  });

  // ============================================
  // SLIDE 14: 예산 계획
  // ============================================
  let slide14 = createSlide(
    "예산 계획을 설명드리겠습니다. 총 예산은 약 2,500만 원으로, 저자 인건비가 가장 큰 비중을 차지합니다. 마케팅 예산은 전체의 20%를 배정하여 출간 초기 반응을 극대화하겠습니다."
  );
  slide14.background = { color: COLORS.offWhite };
  addPageNumber(slide14, 14);
  addBottomAccent(slide14);

  slide14.addText("예산 계획", {
    x: 0.8, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: "Georgia", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  // Budget pie chart
  slide14.addChart(pres.charts.DOUGHNUT, [{
    name: "예산 배분",
    labels: ["저자 인건비", "편집/교정", "디자인/인쇄", "마케팅", "기타"],
    values: [35, 15, 15, 25, 10],
  }], {
    x: 0.3, y: 1.3, w: 4.5, h: 3.5,
    showPercent: true,
    showTitle: false,
    showLegend: true,
    legendPos: "b",
    chartColors: [COLORS.softBlue, COLORS.sageGreen, COLORS.warmGray, COLORS.accent, COLORS.lightGray],
    dataLabelColor: COLORS.darkNavy,
    dataLabelFontSize: 10,
  });

  // Budget details
  const budgetItems = [
    { item: "저자 인건비", amount: "875만원", pct: "35%" },
    { item: "편집/교정", amount: "375만원", pct: "15%" },
    { item: "디자인/인쇄", amount: "375만원", pct: "15%" },
    { item: "마케팅", amount: "625만원", pct: "25%" },
    { item: "기타", amount: "250만원", pct: "10%" },
  ];

  slide14.addText("상세 내역", {
    x: 5.3, y: 1.4, w: 4, h: 0.4,
    fontSize: 16, fontFace: "Calibri", color: COLORS.darkNavy,
    bold: true, margin: 0,
  });

  budgetItems.forEach((b, i) => {
    const y = 2 + i * 0.55;
    slide14.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: y, w: 4.2, h: 0.45,
      fill: { color: i % 2 === 0 ? COLORS.white : COLORS.paleBlue },
    });
    slide14.addText(b.item, {
      x: 5.5, y: y + 0.05, w: 2, h: 0.35,
      fontSize: 12, fontFace: "Calibri", color: COLORS.darkText,
      margin: 0,
    });
    slide14.addText(b.amount, {
      x: 7.5, y: y + 0.05, w: 1.2, h: 0.35,
      fontSize: 12, fontFace: "Calibri", color: COLORS.darkNavy,
      bold: true, align: "right", margin: 0,
    });
    slide14.addText(b.pct, {
      x: 8.8, y: y + 0.05, w: 0.7, h: 0.35,
      fontSize: 11, fontFace: "Calibri", color: COLORS.lightText,
      align: "right", margin: 0,
    });
  });

  // ============================================
  // SLIDE 15: Q&A / 다음 단계
  // ============================================
  let slide15 = createSlide(
    "마지막으로 다음 단계를 정리하겠습니다. 오늘 논의된 내용을 바탕으로 기획안을 확정하고, 저자 선정을 진행하겠습니다. 추가 질문이나 의견이 있으시면 지금 말씀해 주세요. 감사합니다."
  );
  slide15.background = { color: COLORS.darkNavy };

  // Decorative circles
  slide15.addShape(pres.shapes.OVAL, {
    x: -1.5, y: -1.5, w: 4, h: 4,
    fill: { color: COLORS.softBlue, transparency: 80 },
  });
  slide15.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 3, w: 3.5, h: 3.5,
    fill: { color: COLORS.sageGreen, transparency: 85 },
  });

  slide15.addText("Q&A", {
    x: 0.8, y: 0.8, w: 8, h: 1.2,
    fontSize: 56, fontFace: "Georgia", color: COLORS.white,
    bold: true, margin: 0,
  });

  slide15.addText("다음 단계", {
    x: 0.8, y: 2.2, w: 8, h: 0.6,
    fontSize: 20, fontFace: "Calibri", color: COLORS.lightGray,
    margin: 0,
  });

  const nextSteps = [
    "기획안 확정 및 내부 승인",
    "저자 선정 및 계약",
    "상세 목차 및 집필 계획 수립",
    "마케팅 사전 준비",
  ];

  nextSteps.forEach((step, i) => {
    slide15.addImage({ data: iconCheck, x: 0.8, y: 3 + i * 0.5, w: 0.25, h: 0.25 });
    slide15.addText(step, {
      x: 1.3, y: 2.95 + i * 0.5, w: 6, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: COLORS.white,
      margin: 0,
    });
  });

  slide15.addText("감사합니다", {
    x: 0.8, y: 4.8, w: 3, h: 0.5,
    fontSize: 16, fontFace: "Georgia", color: COLORS.warmGray,
    italic: true, margin: 0,
  });

  // Save
  await pres.writeFile({ fileName: "E:/ABC-RAG/AI_도서_기획_프로젝트.pptx" });
  console.log("PPTX created successfully!");
}

main().catch(console.error);
