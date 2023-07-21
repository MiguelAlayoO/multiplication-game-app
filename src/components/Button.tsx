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
  border: solid var(--amber-600);
  border-radius: 5rem;
  box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 3px 9px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.75);
  transition: background,border,box-shadow,padding,font-weight 0.03s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: var(--amber-700);
    border: solid var(--amber-700);
    box-shadow: none;
  }

  animation: float 1.5s ease-in-out infinite alternate-reverse;
  @keyframes float {
    to {
      transform: translateY(8px);
    }
  }

  ${({ $variant }) =>
    $variant === "primary" &&
    css`
      padding: 0.7rem 1.25rem;
      font-weight: 700;

      &:active {
        padding: 0.6rem 1.1rem;
        font-size: 1.4rem;
      }
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
        padding: 0.6rem 1.1rem;
        font-size: 1.4rem;
      }
    `}

    ${({ $variant }) =>
    $variant === "numeric" &&
    css`
      width: 100%;
      height: 100%;
      font-size: 2.5rem;
      font-weight: 900;

      &:active {
        width: 90%;
        height: 90%;
        font-size: 2rem;
      }

      @media screen and (min-width: 480px) {
        font-size: 3.5rem;
        &:active {
          font-size: 3rem;
        }
      }
      @media screen and (min-width: 960px) {
        font-size: 2.5rem;
        &:active {
          font-size: 2rem;
        }
      }
    `}
`;

type ButtonProps = {
  text?: string;
  hasIcon?: boolean;
  icon?: JSX.Element;
  variant: "primary" | "secondary" | "numeric";
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
