import { createGlobalStyle } from "styled-components";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
   @font-face {
    font-family: 'yg-jalnan';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  body {
    font-family: 'NanumSquareNeo', sans-serif;
  }
`;

const LoadFont = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return null;
};

export { GlobalStyle, LoadFont };
