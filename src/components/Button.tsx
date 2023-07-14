import styled, { css } from "styled-components";
import Image from "next/image";
import { MouseEventHandler } from "react";

const ButtonStyles = styled.button<{
  $variant?: "primary" | "secondary" | "numeric";
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: inherit;
  color: var(--white);

  background-color: var(--amber-600);
  border: solid var(--amber-700);
  border-radius: 3rem;
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
      font-size: 1.5rem;
      font-weight: 700;
    `}

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      padding: 0.7rem 1.25rem;

      background-color: var(--red-700);
      border: solid var(--red-700);

      font-size: 1.5rem;
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
    `}
`;

type ButtonProps = {
  text?: string;
  hasIcon?: boolean;
  variant?: "primary" | "secondary" | "numeric";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Button = ({
  text = "default",
  hasIcon = false,
  variant,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyles onClick={onClick} $variant={variant}>
      {hasIcon ? (
        <Image
          src={`/icons/${text}.png`}
          alt="Icon Button"
          width={60}
          height={60}
        ></Image>
      ) : (
        <span>{text}</span>
      )}
    </ButtonStyles>
  );
};
