import React, { InputHTMLAttributes } from 'react';

import { StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ name, type, ...rest }) => (
  <>
    <StyledInput type={type} name={name} {...rest} />
  </>
);

export default Input;
