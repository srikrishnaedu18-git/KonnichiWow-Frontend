
import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import ReviewAnswers from "./ReviewAnswers";
import { useDispatch } from "react-redux";
import { saveAnswer, resetAnswers } from "../store/quizSlice";
import { X } from "lucide-react";

export default function Quizcard({ onBack, questions }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [card, setCard] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [finishFocus, setFinishFocus] = useState(0);

  const dispatch = useDispatch();
  const currentQuestion = questions[current];

  const handleNext = () => {
    if (!selected) return;
    if (selected === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    dispatch(
      saveAnswer({
        questionIndex: current,
        selected,
        correct: currentQuestion.answer,
      })
    );

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected("");
      setFocusedIndex(0);
    } else {
      setCard(1);
      setFinishFocus(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (card === 0) {
        const maxIndex = selected
          ? currentQuestion.options.length
          : currentQuestion.options.length - 1;

        if (e.key === "ArrowDown") {
          setFocusedIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter") {
          if (focusedIndex < currentQuestion.options.length) {
            const chosen = currentQuestion.options[focusedIndex];
            if (selected === "") {
              setProgressCount((prev) =>
                prev + 1 <= questions.length ? prev + 1 : prev
              );
            }
            setSelected(chosen);
          } else if (
            focusedIndex === currentQuestion.options.length &&
            selected
          ) {
            handleNext();
          }
        } else if (e.key === "ArrowRight" && selected) {
          handleNext();
        }
      } else if (card === 1) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          setFinishFocus((prev) => (prev === 0 ? 1 : 0));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          setFinishFocus((prev) => (prev === 1 ? 0 : 1));
        } else if (e.key === "Enter") {
          if (finishFocus === 0) {
            setCurrent(0);
            setScore(0);
            setSelected("");
            setCard(0);
            setProgressCount(0);
            dispatch(resetAnswers());
          } else {
            setCard(2);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    focusedIndex,
    selected,
    currentQuestion,
    card,
    questions.length,
    finishFocus,
  ]);

  return (
    <div className="flex flex-col flex-1 px-6 py-3">
      <div className="w-full h-full bg-white shadow-lg rounded-2xl p-8 flex flex-col relative">
        <button
          onClick={onBack}
          className="absolute top-4.5 left-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close Quiz"
        >
          <X size={26} />
        </button>

        {card === 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <ProgressBar current={progressCount} total={questions.length} />
              <div className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block -mt-6">
                Question {current + 1} of {questions.length}
              </div>
            </div>

            <p className="text-2xl font-bold text-gray-800 mb-6 text-left">
              {currentQuestion.question}
            </p>

            <div className="w-full grid grid-cols-2 gap-4 place-items-center">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (selected !== "") return;
                    setProgressCount((prev) =>
                      prev + 1 <= questions.length ? prev + 1 : prev
                    );
                    setSelected(opt);
                  }}
                  className={`border rounded-lg px-4 py-3 text-left transition duration-200 w-full max-w-xs
                    ${
                      opt === selected && selected === currentQuestion.answer
                        ? "bg-[#26ECB4] text-black"
                        : opt !== selected &&
                          opt === currentQuestion.answer &&
                          selected !== ""
                        ? "bg-[#26ECB4] text-black"
                        : opt === selected && selected !== currentQuestion.answer
                        ? "bg-[#EC265F] text-black"
                        : "hover:bg-gray-100 bg-white text-black"
                    }
                    ${focusedIndex === idx ? "ring-2 ring-blue-400" : ""}
                  `}
                >
                  {opt}
                </button>
              ))}
              <div
                className={`col-span-2 mt-3 bg-[#26ECB4] border border-[#26ECB4] text-black rounded-lg px-4 py-2 transition-all duration-300
                  ${selected === "" ? "blur-sm opacity-60 pointer-events-none" : ""}
                `}
                style={{ maxWidth: "28rem" }}
              >
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                  focusedIndex === currentQuestion.options.length
                    ? "ring-2 ring-blue-400"
                    : ""
                } ${
                  selected
                    ? "bg-[#2646EC] hover:brightness-105"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {current === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : card === 1 ? (
          <div className="flex flex-col justify-center items-center w-full h-full text-center">
            <h2 className="text-3xl font-bold mb-6">Quiz Completed 🎉</h2>
            <p className="text-xl mb-4">
              Your Score: <span className="font-semibold">{score}</span> / {questions.length}
            </p>

            {score === questions.length ? (
              <div className="flex flex-col items-center mb-6">
                <div className="text-5xl">🛡️</div>
                <h3 className="text-lg font-semibold text-green-700 mt-2">Conqueror Badge</h3>
                <p className="text-sm text-gray-700">
                  You answered every question correctly. Outstanding mastery!
                </p>
              </div>
            ) : score === questions.length - 1 ? (
              <div className="flex flex-col items-center mb-6">
                <div className="text-5xl">🎯</div>
                <h3 className="text-lg font-semibold text-blue-700 mt-2">Ace Badge</h3>
                <p className="text-sm text-gray-700">
                  Just one miss! You're nearly perfect.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center mb-6">
                <div className="text-5xl">💡</div>
                <h3 className="text-lg font-semibold text-yellow-700 mt-2">Learner Badge</h3>
                <p className="text-sm text-gray-700">
                  Great effort! Reattempt the quiz to earn the Ace or Conqueror badge.
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setCurrent(0);
                  setScore(0);
                  setSelected("");
                  setCard(0);
                  setProgressCount(0);
                  dispatch(resetAnswers());
                }}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition duration-200 ${
                  finishFocus === 0 ? "ring-2 ring-blue-400" : ""
                } bg-green-600 hover:bg-green-700`}
              >
                Restart
              </button>

                            <button
                onClick={() => setCard(2)}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition duration-200 ${
                  finishFocus === 1 ? "ring-2 ring-blue-400" : ""
                } bg-blue-600 hover:bg-blue-700`}
              >
                Review
              </button>
            </div>
          </div>
        ) : (
          <ReviewAnswers />
        )}
      </div>
    </div>
  );
}
