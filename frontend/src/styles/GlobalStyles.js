import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: ${({ theme }) => theme.bodyBg};
    color: ${({ theme }) => theme.textColor};
    transition: all 0.3s ease;
  }
  button {
    cursor: pointer;
    background: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
`;

export default GlobalStyles;
