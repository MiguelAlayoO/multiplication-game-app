import styled, { css } from "styled-components";

const OverviewStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.5rem;
  font-weight: bold;
`;

const Number = styled.span<{
  $variant?: "total" | "correct" | "incorrect";
}>`
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100%;

  background-color: var(--dark);
  box-shadow: inset 0px -12px 12px -5px var(--white);
  -webkit-box-shadow: inset 0px -12px 12px -5px var(--white);

  animation: float 1.5s ease-in-out infinite alternate-reverse;
  @keyframes float {
    to {
      transform: translateY(8px);
    }
  }
  
  ${({ $variant }) =>
    $variant === "total" &&
    css`
      background-color: var(--indigo-300);
      box-shadow: inset 0px -12px 12px -5px var(--indigo-500);
      -webkit-box-shadow: inset 0px -12px 12px -5px var(--indigo-500);
    `}
  ${({ $variant }) =>
    $variant === "correct" &&
    css`
      background-color: var(--green-600);
      box-shadow: inset 0px -12px 12px -5px var(--green-800);
      -webkit-box-shadow: inset 0px -12px 12px -5px var(--green-800);
    `}
  ${({ $variant }) =>
    $variant === "incorrect" &&
    css`
      background-color: var(--red-600);
      box-shadow: inset 0px -12px 12px -5px var(--red-800);
      -webkit-box-shadow: inset 0px -12px 12px -5px var(--red-800);
    `}
`;

type OverviewProps = {
  text?: string;
  number: number;
  variant?: "total" | "correct" | "incorrect";
};

export const Overview = ({
  text = "Overview text",
  number,
  variant,
}: OverviewProps) => {
  return (
    <OverviewStyles>
      <span>{text}</span>
      <Number $variant={variant}>{number}</Number>
    </OverviewStyles>
  );
};
