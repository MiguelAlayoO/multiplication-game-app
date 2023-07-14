import styled from "styled-components";

const ImageBg = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;

  background-image: url("/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const ColorBg = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  
  background: radial-gradient(
    circle,
    var(--indigo-400) 0%,
    var(--indigo-600) 50%,
    var(--indigo-700) 100%
  );
`;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ColorBg>
      <ImageBg>{children}</ImageBg>
    </ColorBg>
  );
};

export default Layout;
