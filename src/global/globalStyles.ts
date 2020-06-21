import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  };
  body {
    background: #fff;
    color: #111;
    -webkit-font-smoothing: antialiased;
  };
  body, input, button {
    font-family: 'Ubuntu', serif;
    font-size: 16px;
  };
  button {
    cursor: pointer;
    box-shadow: 0px 0px 0px;
    border: 0;
  };
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  };
`;
