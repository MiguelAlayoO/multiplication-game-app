import styled, { css } from "styled-components";
import { BiBookReader } from "react-icons/bi";

const ButtonStyles = styled.button<{
  $variant?: "primary" | "secondary" | "numeric";
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;
  font-family: inherit;
  color: var(--white);

  background-color: var(--amber-600);
  border: solid var(--amber-700);
  border-radius: 5rem;
  box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 3px 9px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.75);

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: var(--amber-700);
    border: solid var(--amber-700);
    box-shadow: none;
  }

  ${({ $variant }) =>
    $variant === "primary" &&
    css`
      padding: 0.7rem 1.25rem;
      font-weight: 700;
    `}

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      padding: 0.7rem 1.25rem;

      background-color: var(--red-700);
      border: solid var(--red-700);

      font-weight: 700;

      &:active {
        background-color: var(--red-600);
        border: solid var(--red-600);
        box-shadow: none;
      }
    `}

    ${({ $variant }) =>
    $variant === "numeric" &&
    css`
      font-size: 2.5rem;
      font-weight: 900;

      @media screen and (min-width: 480px) {
        font-size: 3.5rem;
      }
      @media screen and (min-width: 960px) {
        font-size: 2.5rem;
      }
    `}
`;

type ButtonProps = {
  text?: string;
  hasIcon?: boolean;
  icon?: JSX.Element;
  variant?: "primary" | "secondary" | "numeric";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  text,
  hasIcon = false,
  icon = <BiBookReader />,
  variant = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyles type="button" $variant={variant} onClick={onClick}>
      {hasIcon ? icon : <span>{text}</span>}
    </ButtonStyles>
  );
};
