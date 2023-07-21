import { forwardRef } from "react";
import styled from "styled-components";

const InputStyles = styled.input`
  width: 100%;
  padding: 0.5rem 2rem;

  border: solid var(--white);
  border-radius: 4rem;

  font-family: inherit;
  font-weight: 600;
  font-size: 3rem;
  color: var(--indigo-400);
  text-align: center;

  &:focus {
    outline: none;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  animation: roll 1.5s ease-in-out infinite alternate-reverse;
  @keyframes roll {
    to {
      transform: scaleX(1.05);
    }
  }
`;

type InputProps = {
  type: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  autoFocus?: boolean;
};

export const Input = forwardRef(
  (
    {
      type,
      value,
      onChange,
      onKeyDown,
      onClick,
      readOnly = false,
      autoFocus = false,
    }: InputProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <InputStyles
        placeholder=""
        type={type}
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
        readOnly={readOnly}
        autoFocus={autoFocus}
      />
    );
  }
);

Input.displayName = "Input";
