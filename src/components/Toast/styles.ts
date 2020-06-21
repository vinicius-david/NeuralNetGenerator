import styled, { css } from 'styled-components';

interface ContainerProps {
  type: 'positive' | 'negative';
}

const ContainerColorVariations = {
  positive: css`
    background-color: #226622;
  `,
  negative: css`
    background-color: #662222;
  `,
}

export const Container = styled.div<ContainerProps>`
  width: 260px;
  height: 80px;

  margin-top: 16px;
  margin-right: 16px;

  ${props => ContainerColorVariations[props.type]}

  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToastText = styled.h3`
  color: #eee;
  font-size: 16px;
`;
