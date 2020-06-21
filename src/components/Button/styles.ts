import styled, { css } from 'styled-components';

interface ButtonProps {
  classType: 'info' | 'delete' | 'run';
}

const ButtonColorVariations = {
  info: css`
    background-color: #222266;
  `,
  delete: css`
    background-color: #662222;
  `,
  run: css`
    background-color: #226622;
  `,
}

export const Container = styled.button<ButtonProps>`
  width: 100%;

  padding: 8px 16px;
  margin-top: 16px;
  border-radius: 4px;

  ${props => ButtonColorVariations[props.classType]}

  color: #ddd;

  &:hover {
    transition: 400ms;
    opacity: 0.9;
  }
`;
