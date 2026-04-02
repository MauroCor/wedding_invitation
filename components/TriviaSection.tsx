"use client";

import { useMemo, useState } from "react";

type TriviaQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: TriviaQuestion[] = [
  {
    question: "¿Dónde nos conocimos 💑?",
    options: [
      "Los 15 de Nabila",
      "Egreso de Mauro",
      "Redes sociales",
    ],
    correctIndex: 1,
  },
  {
    question: "En nuestro primer trekking ⛰️:",
    options: [
      "Cayó un diluvio y nos refugiamos",
      "Nos perdimos por estar charlando",
      "Ambas son correctas",
    ],
    correctIndex: 1,
  },
  {
    question: "¿Quién es Pupito 🤔?",
    options: [
      "Nuestro gato",
      "Un apodo de Mauro",
      "El clio de Nabi",
    ],
    correctIndex: 2,
  },
  {
    question: "Nuestros gatos se llaman 🐱:",
    options: [
      "Pupito y Samaria",
      "Lobito y Samanta",
      "Draco y Samira",
    ],
    correctIndex: 1,
  },
  {
    question: "¿Cómo le dicen a Mauro en la familia de Nabi? 😄",
    options: [
      "Abeja",
      'Bz Bzz',
      "Ambas son correctas",
    ],
    correctIndex: 2,
  },
];

export default function TriviaSection() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const current = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;

  const progressLabel = useMemo(
    () => `${Math.min(currentIndex + 1, total)} / ${total}`,
    [currentIndex, total]
  );
  const reviewProgressLabel = useMemo(
    () => `${Math.min(reviewIndex + 1, total)} / ${total}`,
    [reviewIndex, total]
  );

  const handleNext = () => {
    if (selectedIndex === null) return;

    const isCorrect = selectedIndex === current.correctIndex;
    const nextScore = isCorrect ? score + 1 : score;
    setScore(nextScore);
    setAnswers((prev) => [...prev, selectedIndex]);

    const isLast = currentIndex === total - 1;
    if (isLast) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
  };

  const handleFinalize = () => {
    setStarted(false);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setReviewMode(false);
    setReviewIndex(0);
  };

  const handleStartReview = () => {
    setReviewMode(true);
    setReviewIndex(0);
  };

  const reviewQuestion = QUESTIONS[reviewIndex];
  const markedOptionIndex = answers[reviewIndex];

  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/35 bg-white/85 px-5 py-5 text-center shadow-xl backdrop-blur-sm md:px-7 md:py-6">
      <div className="mx-auto mb-2 h-14 w-14 rounded-full bg-[#789966]/15 text-3xl leading-[56px]">
        🎉
      </div>
      <h3
        className="text-2xl font-semibold tracking-wide text-[#2C3E50] md:text-3xl"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        ¿Cuánto nos conocés?
      </h3>
      <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-[#2C3E50]/75 md:text-sm">
        Juguemos un poco
      </p>

      {!started ? (
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-4 inline-flex rounded-lg bg-[#789966] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#6d8a5b] md:text-base"
        >
          Iniciar trivia
        </button>
      ) : finished && reviewMode ? (
        <div className="mt-4 text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#2C3E50]/65">
            Revisión {reviewProgressLabel}
          </p>
          <p className="mb-3 text-base font-medium text-[#2C3E50] md:text-lg">
            {reviewQuestion.question}
          </p>

          <div className="space-y-2">
            {reviewQuestion.options.map((option, index) => {
              const isCorrect = index === reviewQuestion.correctIndex;
              const isMarked = index === markedOptionIndex;

              let optionClass =
                "border-[#2C3E50]/20 bg-white text-[#2C3E50]";
              if (isCorrect) {
                optionClass =
                  "border-emerald-500/60 bg-emerald-50 text-emerald-900";
              } else if (isMarked) {
                optionClass = "border-rose-500/50 bg-rose-50 text-rose-900";
              }

              return (
                <div
                  key={option}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm md:text-base ${optionClass}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{option}</span>
                    <span className="shrink-0 text-xs md:text-sm font-semibold">
                      {isCorrect ? "Correcta" : isMarked ? "Tu respuesta" : ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setReviewMode(false)}
              className="inline-flex rounded-lg border border-[#2C3E50]/30 bg-white px-4 py-2.5 text-sm font-medium text-[#2C3E50] transition-colors hover:bg-[#f4f6f4] md:text-base"
            >
              Volver al resultado
            </button>
            <button
              type="button"
              onClick={() =>
                setReviewIndex((prev) =>
                  prev < total - 1 ? prev + 1 : prev
                )
              }
              disabled={reviewIndex === total - 1}
              className="inline-flex rounded-lg bg-[#789966] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6d8a5b] disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : finished ? (
        <div className="mt-4">
          <p className="text-lg text-[#2C3E50]">
            Obtuviste <span className="font-semibold">{score}</span> de{" "}
            <span className="font-semibold">{total}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleStartReview}
              className="inline-flex rounded-lg bg-[#789966] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6d8a5b] md:text-base"
            >
              Ver respuestas
            </button>
            <button
              type="button"
              onClick={handleFinalize}
              className="inline-flex rounded-lg border border-[#2C3E50]/30 bg-white px-5 py-2.5 text-sm font-medium text-[#2C3E50] transition-colors hover:bg-[#f4f6f4] md:text-base"
            >
              Finalizar
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#2C3E50]/65">
            Pregunta {progressLabel}
          </p>
          <p className="mb-3 text-base font-medium text-[#2C3E50] md:text-lg">
            {current.question}
          </p>

          <div className="space-y-2">
            {current.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-all md:text-base ${
                    isSelected
                      ? "border-[#789966] bg-[#789966]/15 text-[#1e2b25]"
                      : "border-[#2C3E50]/20 bg-white text-[#2C3E50] hover:border-[#789966]/60"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedIndex === null}
              className="inline-flex rounded-lg bg-[#789966] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6d8a5b] disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
            >
              {currentIndex === total - 1 ? "Ver resultado" : "Siguiente"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
