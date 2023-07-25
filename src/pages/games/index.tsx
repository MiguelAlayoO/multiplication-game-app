import styled from "styled-components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ConfettiExplosion from "react-confetti-explosion";
import useSound from "use-sound";
import { ButtonBox } from "@/components/ButtonBox";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Overview } from "@/components/Overview";

import { useWindowsSize } from "@/hooks/UseWindowsSize";
import { buttonData } from "@/assets/data/buttons";
import { soundData } from "@/assets/data/sounds";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
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

const ContainerEnterName = styled(Container)`
  animation: appear 1s ease-in-out reverse;
  @keyframes appear {
    to {
      transform: scale(0.5);
    }
  }
`;

const ContainerSelectLevel = styled(Container)`
  animation: appear 1s 1s ease-in-out reverse backwards;
  @keyframes appear {
    to {
      transform: scale(0.5);
      opacity: 0;
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
  const windowSize = useWindowsSize();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <WrapperWelcomePage>
      <ContainerEnterName>
        <h1>¿Cuál es tu nombre?</h1>
        <Input
          type="text"
          onChange={handleNameChange}
          autoFocus={windowSize.width > 768}
        />
      </ContainerEnterName>
      <ContainerSelectLevel>
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
      </ContainerSelectLevel>
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

  animation: appear 0.2s ease-out reverse;
  @keyframes appear {
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }

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
  countCorrectAnswer: number;
  setCountCorrectAnswer: (countCorrectAnswer: number) => void;
  countIncorrectAnswer: number;
  setCountIncorrectAnswer: (countIncorrectAnswer: number) => void;
  factorLevel: number;
  finishGame: () => void;
};

const GamePage = ({
  score,
  setScore,
  countCorrectAnswer,
  setCountCorrectAnswer,
  countIncorrectAnswer,
  setCountIncorrectAnswer,
  factorLevel,
  finishGame,
}: GamePageProps) => {
  const [time, setTime] = useState<number>(120);
  const [firstFactor, setFirstFactor] = useState<number>(0);
  const [secondFactor, setSecondFactor] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const windowSize = useWindowsSize();
  const inputNameRef = useRef<HTMLInputElement>(null);

  const [playTimer, { stop: stopTimer, sound: soundTimer }] = useSound(
    soundData.timer
  );
  const [playCorrect] = useSound(soundData.correct, { interrupt: true });
  const [playIncorrect] = useSound(soundData.incorrect, { interrupt: true });

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      time === 10 && !soundTimer.playing() && playTimer();

      return () => clearInterval(interval);
    } else {
      stopTimer();
      finishGame();
    }

  }, [time, finishGame, soundTimer, playTimer, stopTimer]);

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

      if (product === productAnswer) {
        setScore(score + 5);
        playCorrect();
        setCountCorrectAnswer(countCorrectAnswer + 1);
      } else {
        const newScore = score - 2 < 0 ? 0 : score - 2;
        setScore(newScore);
        playIncorrect();
        setCountIncorrectAnswer(countIncorrectAnswer + 1);
      }

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
            readOnly={windowSize.width <= 768}
            autoFocus={true}
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

const WrapperResultPage = styled(Wrapper)`
  margin-top: 3rem;
  gap: 0.5rem;
  text-align: center;
`;

const SpanWord = styled.span`
  font-size: 1.5rem;
  font-weight: bold;

  animation: appear 0.2s ease-out reverse backwards;
  @keyframes appear {
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }
`;

const Name = styled(SpanWord)`
  max-width: min-content;
  font-size: 2.5rem;

  animation-delay: 0.5s;

  @media screen and (min-width: 480px) {
    font-size: 3rem;
  }
`;

const WordObtain = styled(SpanWord)`
  animation-delay: 1.5s;
`;

const WordIncredible = styled(SpanWord)`
  animation-delay: 5.3s;
`;

const WrapperConfetti = styled.div`
  position: absolute;
`;

const WrapperOverview = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  place-items: center;
  place-content: center;
  gap: 2rem;
  margin: 1rem 0 1.5rem 0;

  div:first-child {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }

  animation: appear 0.2s 4.8s ease-out reverse backwards;
  @keyframes appear {
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  @media screen and (min-width: 480px) {
    grid-template: repeat(1, 1fr) / repeat(3, 1fr);
    gap: 3.5rem;
    div:first-child {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
  }
`;

const Score = styled.span`
  max-width: min-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 3rem;
  margin: 1rem 0;

  background-color: var(--amber-600);
  border-radius: 10rem;

  font-size: 3rem;
  font-weight: 800;

  &::after {
    content: "pts";
  }

  animation: appear 0.2s 3.6s ease-out reverse backwards,
    roll 1.5s 3.8s ease-in-out infinite alternate-reverse;
  @keyframes appear {
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  @keyframes roll {
    to {
      transform: scaleX(1.05);
    }
  }

  @media screen and (min-width: 480px) {
    max-width: fit-content;
    font-size: 4rem;
    padding: 1rem 3.5rem;
    &::after {
      content: "puntos";
    }
  }
`;

const WrapperBtn = styled.div`
  padding-top: 1rem;

  animation: appear 1s 6.5s ease-in-out reverse backwards;
  @keyframes appear {
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }
`;

type ResultPageProps = {
  name: string;
  score: number;
  countCorrectAnswer: number;
  countIncorrectAnswer: number;
  playBackground: () => void;
  stopBackground: () => void;
  restartGame: () => void;
};

const ResultPage = ({
  name,
  score,
  countCorrectAnswer,
  countIncorrectAnswer,
  playBackground,
  stopBackground,
  restartGame,
}: ResultPageProps) => {
  const [isExploding, setIsExploding] = useState(false);
  const [playCelebration, { stop: stopCelebration }] = useSound(
    soundData.celebration,
    { preload: true }
  );

  useEffect(() => {
    stopBackground();
    playCelebration();

    setTimeout(() => {
      setIsExploding(true);
    }, 3745);

    return () => {
      stopCelebration();
      playBackground();
    };
  }, [playBackground, stopBackground, playCelebration, stopCelebration]);

  return (
    <WrapperResultPage>
      <Name>{name}</Name>
      <WordObtain>obtuviste</WordObtain>
      {isExploding && (
        <WrapperConfetti>
          <ConfettiExplosion
            particleCount={200}
            colors={["#FFB546", "#0af7ff", "#014AB9"]}
          />
        </WrapperConfetti>
      )}
      <Score>{score}</Score>
      <WrapperOverview>
        <Overview
          text="Resolviste"
          number={countCorrectAnswer + countIncorrectAnswer}
          variant="total"
        />
        <Overview
          text="Acertaste"
          number={countCorrectAnswer}
          variant="correct"
        />
        <Overview
          text="Erraste"
          number={countIncorrectAnswer}
          variant="incorrect"
        />
      </WrapperOverview>
      <WordIncredible>¡Eso fue increíble!</WordIncredible>
      <WrapperBtn>
        <Button
          text="¡Volvamos a jugar!"
          variant="secondary"
          onClick={restartGame}
        />
      </WrapperBtn>
    </WrapperResultPage>
  );
};

// <----------------------------------- Main ----------------------------------->

const MultiplicationGame = () => {
  const [page, setPage] = useState<string>("inicio");
  const [name, setName] = useState<string>("Genio Matemático");
  const [factorLevel, setFactorLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState<number>(0);
  const [countIncorrectAnswer, setCountIncorrectAnswer] = useState<number>(0);

  const [playBackground, { stop: stopBackground }] = useSound(
    soundData.background,
    {
      volume: 0.6,
      interrupt: true,
      loop: true,
      preload: true,
    }
  );

  useEffect(() => {
    playBackground();

    return () => {
      stopBackground();
    };
  }, [playBackground, stopBackground]);

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
    setCountCorrectAnswer(0);
    setCountIncorrectAnswer(0);
  };

  switch (page) {
    case "inicio":
      return <WelcomePage setName={setName} startGame={handleStartGame} />;
    case "juego":
      return (
        <GamePage
          score={score}
          setScore={setScore}
          countCorrectAnswer={countCorrectAnswer}
          setCountCorrectAnswer={setCountCorrectAnswer}
          countIncorrectAnswer={countIncorrectAnswer}
          setCountIncorrectAnswer={setCountIncorrectAnswer}
          factorLevel={factorLevel}
          finishGame={handleFinishGame}
        />
      );
    case "resultado":
      return (
        <ResultPage
          name={name}
          score={score}
          countCorrectAnswer={countCorrectAnswer}
          countIncorrectAnswer={countIncorrectAnswer}
          playBackground={playBackground}
          stopBackground={stopBackground}
          restartGame={handleRestartGame}
        />
      );
    default:
      return <div>No hay nada XD</div>;
  }
};

export default MultiplicationGame;
