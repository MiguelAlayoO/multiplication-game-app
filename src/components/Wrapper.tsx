import { styled } from "styled-components";

const WrapperStyle = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  max-width: min-content;
`;

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <WrapperStyle>{children}</WrapperStyle>;
};

export default Wrapper;
