import styled from "styled-components";

const ButtonBoxStyles = styled.div`
  height: 310px;
  width: 310px;

  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  place-items: center;
  gap: 0.5rem;

  button:last-child {
    background: var(--green-600);
    border: solid var(--green-600);
    grid-column: 4 / 5;
    grid-row: 2 / -1;

    &:active {
      background-color: var(--green-700);
      border: solid var(--green-700);
    }
  }

  animation: appear 0.2s 0.5s ease-out reverse backwards;
  @keyframes appear {
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  @media screen and (min-width: 480px) {
    height: 450px;
    width: 450px;
  }

  @media screen and (min-width: 960px) {
    height: 350px;
    width: 350px;
  }
`;

type ButtonBoxProps = {
  children: React.ReactNode;
};

export const ButtonBox = ({ children }: ButtonBoxProps) => {
  return <ButtonBoxStyles>{children}</ButtonBoxStyles>;
};
