import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { ButtonBox } from "@/components/ButtonBox";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { buttonData } from "@/assets/data/data";

const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3rem;

  @media screen and (min-width: 480px) {
    margin-top: 4rem;
  }
`;

// <----------------------------------- Select Name and Level ----------------------------------->
const WrapperWelcomePage = styled(Wrapper)`
  padding: 0 2rem;

  h1 {
    font-size: 2rem;
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
  }

  @media screen and (min-width: 480px) {
    max-width: min-content;
    padding: 0;

    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 2rem;
    }
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media screen and (min-width: 480px) {
    flex-direction: row;
    gap: 6rem;

    max-width: min-content;
  }
`;

const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  span {
    text-align: center;
    font-size: 0.8rem;
    width: 40%;
  }

  button {
    span {
      font-size: inherit;
      width: inherit;
    }
  }

  @media screen and (min-width: 480px) {
    flex-direction: column;
    gap: 1.5rem;

    span {
      font-size: 1rem;
      width: 100%;
    }

    button {
      span {
        font-size: inherit;
      }
    }
  }
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
  gap: 3rem;

  h1 {
    font-size: 3rem;
  }

  @media screen and (min-width: 480px) {
    gap: 4rem;

    h1 {
      font-size: 3.5rem;
    }
  }
`;

const ContainerHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContainerGame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media screen and (min-width: 960px) {
    flex-direction: row;
  }
`;

const WrapperScore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const WrapperMultiplication = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 480px) {
    width: 450px;
  }

  @media screen and (min-width: 960px) {
    width: 510px;
  }
`;

const WrapperFactors = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 5.5rem;
    font-weight: 900;
    padding: 0 1rem;

    display: block;
  }

  span:nth-child(2) {
    font-size: 4rem;
  }

  @media screen and (min-width: 480px) {
    span {
      font-size: 8.5rem;
    }

    span:nth-child(2) {
      font-size: 6.5rem;
    }
  }

  @media screen and (min-width: 960px) {
    span {
      font-size: 10rem;
    }

    span:nth-child(2) {
      font-size: 8rem;
    }
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
  const [firstFactor, setFirstFactor] = useState<number>(0);
  const [secondFactor, setSecondFactor] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const inputNameRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    setFirstFactor(Math.floor(Math.random() * factorLevel));
    setSecondFactor(Math.floor(Math.random() * 12));
  }, [factorLevel]);

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const generateQuestion = () => {
    setFirstFactor(Math.floor(Math.random() * factorLevel));
    setSecondFactor(Math.floor(Math.random() * 12));

    setAnswer("");
  };

  const checkAnswer = () => {
    if (answer.trim()) {
      const product = firstFactor * secondFactor;
      const productAnswer = Number(answer);

      product === productAnswer
        ? setScore(score + 5)
        : score - 2 < 0
        ? setScore(0)
        : setScore(score - 2);

      generateQuestion();
    }
  };

  const lessClick = (textButton: string) => {
    answer === "" && setAnswer(textButton);
  };

  const pointClick = (textButton: string) => {
    !answer.includes(".") && setAnswer(answer + textButton);
  };

  const backspaceClick = () => {
    setAnswer(answer.slice(0, -1));
  };

  const numberClick = (textButton: string) => {
    answer === "0"
      ? setAnswer(textButton)
      : answer === "-0"
      ? setAnswer(`-${textButton}`)
      : setAnswer(answer + textButton);
  };

  const enterClick = () => {
    checkAnswer();
    inputNameRef.current?.focus();
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      enterClick();
    }
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
      <ContainerHead>
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
      </ContainerHead>
      <ContainerGame>
        <WrapperMultiplication>
          <WrapperFactors>
            <span>{firstFactor}</span>
            <span>x</span>
            <span>{secondFactor}</span>
          </WrapperFactors>
          <Input
            type="text"
            ref={inputNameRef}
            value={answer.replace(/[^0-9.-]/g, "")}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleEnterKeyPress}
          />
        </WrapperMultiplication>
        <ButtonBox>
          {buttonData.flat().map((button) => (
            <Button
              key={button.id}
              text={button.name}
              hasIcon={button.hasIcon}
              icon={button.icon}
              variant="numeric"
              onClick={() => handleClickButton(button.name)}
            />
          ))}
        </ButtonBox>
      </ContainerGame>
    </WrapperGamePage>
  );
};

// <----------------------------------- Scoring and Results ----------------------------------->

const WrapperResultPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  span {
    font-size: 3rem;
    font-weight: bold;
  }

  @media screen and (min-width: 480px) {
    margin-top: 4rem;
    span {
      font-size: 4rem;
    }
  }
`;

const Score = styled.div`
  max-width: min-content;
  padding: 1.5rem 3rem;
  margin: 1rem 0;

  background-color: var(--amber-600);
  border-radius: 10rem;

  span {
    font-family: inherit;
    font-size: 3.5rem;
    font-weight: 800;
  }

  @media screen and (min-width: 480px) {
    max-width: fit-content;
    padding: 1.5rem 3rem;
    margin: 1rem 0;

    span {
      font-size: 5.5rem;
    }
  }

  @media screen and (min-width: 960px) {
    padding: 1.5rem 4rem;
    margin: 1rem 0;

    span {
      font-size: 5.5rem;
      letter-spacing: 0.5rem;
    }
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
