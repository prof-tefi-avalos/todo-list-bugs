// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>
);
