import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classType: 'info' | 'delete' | 'run';
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest} >{children}</Container>
);

export default Button;
