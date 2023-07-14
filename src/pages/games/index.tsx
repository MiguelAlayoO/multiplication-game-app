import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ButtonBox } from "@/components/ButtonBox";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { buttonData } from "@/assets/data/data";

const Wrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3rem;
`;

// <----------------------------------- Select Name and Level ----------------------------------->
const WrapperWelcomePage = styled(Wrapper)`
  max-width: min-content;

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6rem;

  max-width: min-content;
`;

const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  text-align: center;
`;

type WelcomePageProps = {
  setName: (name: string) => void;
  startGame: (factor: number) => void;
};

const WelcomePage = ({ setName, startGame }: WelcomePageProps) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <WrapperWelcomePage>
      <h1>¿Cuál es tu nombre?</h1>
      <Input type="text" onChange={handleNameChange} />
      <h2>Elige el nivel</h2>
      <ContainerButtons>
        <WrapperButton>
          <Button
            text="Nivel 1"
            variant="primary"
            onClick={() => startGame(4)}
          ></Button>
          <span>Multiplicaciones del 0 hasta el 4</span>
        </WrapperButton>
        <WrapperButton>
          <Button
            text="Nivel 2"
            variant="primary"
            onClick={() => startGame(8)}
          ></Button>
          <span>Multiplicaciones del 0 hasta el 8</span>
        </WrapperButton>
        <WrapperButton>
          <Button
            text="Nivel 3"
            variant="primary"
            onClick={() => startGame(12)}
          ></Button>
          <span>Multiplicaciones del 0 hasta el 12</span>
        </WrapperButton>
      </ContainerButtons>
    </WrapperWelcomePage>
  );
};

// <----------------------------------- Game in Progress ----------------------------------->

const WrapperGamePage = styled(Wrapper)`
  gap: 4rem;

  h1 {
    font-size: 3.5rem;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
`;

const WrapperScore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const WrapperMultiplication = styled.div`
  width: 510px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WrapperFactors = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 10rem;
    font-weight: 900;
    padding: 0 1rem;

    display: block;
  }

  span:nth-child(2) {
    font-size: 8rem;
  }
`;

type GamePageProps = {
  score: number;
  setScore: (score: number) => void;
  factorLevel: number;
  finishGame: () => void;
};

const GamePage = ({
  score,
  setScore,
  factorLevel,
  finishGame,
}: GamePageProps) => {
  const [time, setTime] = useState<number>(90);
  // const [isApproved, setIsApproved] = useState<boolean>(false);
  const [firstFactor, setFirstFactor] = useState<number>(0);
  const [secondFactor, setSecondFactor] = useState<number>(0);
  const [response, setResponse] = useState<string>("");

  const lessClick = (textButton: string) => {
    response === "" && setResponse(textButton);
  };

  const pointClick = (textButton: string) => {
    !response.includes(".") && setResponse(response + textButton);
  };

  const backspaceClick = () => {
    setResponse(response.slice(0, -1));
  };

  const numberClick = (textButton: string) => {
    response === "0"
      ? setResponse(textButton)
      : response === "-0"
      ? setResponse(`-${textButton}`)
      : setResponse(response + textButton);
  };

  const enterClick = () => {
    if (response.trim()) {
      const product = firstFactor * secondFactor;
      const productResponse = Number(response);

      product === productResponse
        ? setScore(score + 5)
        : score - 2 < 0
        ? setScore(0)
        : setScore(score - 2);

      setResponse("");
    }
  };

  useEffect(() => {
    setFirstFactor(Math.floor(Math.random() * factorLevel));
    setSecondFactor(Math.floor(Math.random() * 12));
  }, [score, factorLevel]);

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      finishGame();
    }
  }, [time, finishGame]);

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleClickButton = (textButton: string) => {
    switch (textButton) {
      case "-":
        return lessClick(textButton);
      case ".":
        return pointClick(textButton);
      case "backspace":
        return backspaceClick();
      case "enter":
        return enterClick();
      default:
        return numberClick(textButton);
    }
  };

  return (
    <WrapperGamePage>
      <Container>
        <WrapperScore>
          <Image
            src={"/icons/star.png"}
            alt="Icon Score"
            width={50}
            height={50}
          ></Image>
          <h1>{score}</h1>
        </WrapperScore>
        <h1>{getTime(time)}</h1>
      </Container>
      <Container>
        <WrapperMultiplication>
          <WrapperFactors>
            <span>{firstFactor}</span>
            <span>x</span>
            <span>{secondFactor}</span>
          </WrapperFactors>
          <Input
            type="text"
            value={response.replace(/[^0-9.-]/g, "")}
            onChange={(e) => setResponse(e.target.value)}
          />
        </WrapperMultiplication>
        <ButtonBox>
          {buttonData.flat().map((button) => (
            <Button
              key={button.id}
              text={button.name}
              hasIcon={button.hasIcon}
              variant="numeric"
              onClick={() => handleClickButton(button.name)}
            />
          ))}
        </ButtonBox>
      </Container>
    </WrapperGamePage>
  );
};

// <----------------------------------- Scoring and Results ----------------------------------->

const WrapperResultPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 4rem;
    font-weight: bold;
  }
`;

const Score = styled.div`
  padding: 1.5rem 4rem;
  margin: 1rem 0;

  background-color: var(--amber-600);
  border-radius: 10rem;

  span {
    font-family: inherit;
    font-size: 5.5rem;
    font-weight: 800;
    letter-spacing: 0.5rem;
  }
`;

type ResultPageProps = {
  name: string;
  score: number;
  restartGame: () => void;
};

const ResultPage = ({ name, score, restartGame }: ResultPageProps) => {
  return (
    <Wrapper>
      <WrapperResultPage>
        <span>{name}</span>
        <span>obtuviste</span>
        <Score>
          <span>{`${score} puntos`}</span>
        </Score>
        <span>¡Eso fue increíble!</span>
      </WrapperResultPage>
      <Button
        text="¡Volvamos a jugar!"
        variant="secondary"
        onClick={restartGame}
      />
    </Wrapper>
  );
};

// <----------------------------------- Main ----------------------------------->

const MultiplicationGame = () => {
  const [page, setPage] = useState<string>("inicio");
  const [name, setName] = useState<string>("Genio Matemático");
  const [factorLevel, setFactorLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleStartGame = (factor: number) => {
    setFactorLevel(factor);
    setPage("juego");
  };

  const handleFinishGame = () => {
    setPage("resultado");
  };

  const handleRestartGame = () => {
    setPage("inicio");
    setName("Genio Matemático");
    setFactorLevel(0);
    setScore(0);
  };

  switch (page) {
    case "inicio":
      return <WelcomePage setName={setName} startGame={handleStartGame} />;
    case "juego":
      return (
        <GamePage
          score={score}
          setScore={setScore}
          factorLevel={factorLevel}
          finishGame={handleFinishGame}
        />
      );
    case "resultado":
      return (
        <ResultPage name={name} score={score} restartGame={handleRestartGame} />
      );
    default:
      return <div>No hay nada XD</div>;
  }
};

export default MultiplicationGame;
