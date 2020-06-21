import React from 'react';

import { Container, ToastText } from './styles';

interface ToastProps {
  message: string;
  type: 'positive' | 'negative';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <Container type={type} >
    <ToastText>{message}</ToastText>
  </Container>
);

export default Toast;
