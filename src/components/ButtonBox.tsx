import styled from "styled-components";

const ButtonBoxStyles = styled.div`
  height: 350px;
  width: 350px;

  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  gap: 0.5rem;

  button:last-child {
    background: var(--green-600);
    border: solid var(--green-700);
    grid-column: 4 / 5;
    grid-row: 2 / -1;

    &:active {
      background-color: var(--green-700);
      border: solid var(--green-700);
    }
  }
`;

type ButtonBoxProps = {
  children: React.ReactNode;
};

export const ButtonBox = ({ children }: ButtonBoxProps) => {
  return <ButtonBoxStyles>{children}</ButtonBoxStyles>;
};
