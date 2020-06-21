import styled from 'styled-components';

import backgroundImg from './assets/background.png';

export const Header = styled.header`
  background-color: #000;

  padding: 24px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  svg {
    margin-right: 8px;
    margin-left: 15vw;
  }

  h1 {
    color: #eee;
  }
`;

export const Container = styled.div`
  width: 70vw;
  margin: 0 auto;

  padding-top: 32px;

  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
`;

export const FormContainer = styled.div`
  padding: 16px 32px 24px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: left;

  h2 {
    margin-top: 24px;
    margin-bottom: 8px;
  }

  h3 {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

export const ResultsTable = styled.div`
  margin-top: 24px;

  h3 {
    margin-top: 16px;
  }
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;
