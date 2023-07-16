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
`;

type InputProps = {
  type: string;
  value?: string | number;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const Input = ({
  type,
  value,
  ref,
  onChange,
  onKeyDown,
}: InputProps) => {
  return (
    <InputStyles
      placeholder=""
      type={type}
      value={value}
      ref={ref}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
};
