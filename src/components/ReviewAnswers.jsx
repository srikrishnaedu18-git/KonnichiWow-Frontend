import { questions } from "../data/question";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAnswers } from "../store/quizSlice";

export default function ReviewAnswers() {
  const [current1, setCurrent] = useState(0);
  const [focusedButton, setFocusedButton] = useState(0); 
  const answers = useSelector((state) => state.quiz.answers);
  const dispatch = useDispatch();

  const currentQuestion = questions[current1];
  const selectedAnswer = answers.find(
    (ans) => ans.questionIndex === current1
  )?.selected;

  const handleNext = () => {
    if (current1 < questions.length - 1) {
      setCurrent(current1 + 1);
    }
  };

  const handleRestart = () => {
    dispatch(resetAnswers());
    window.location.reload(); 
  };

  const handleFinish = () => {
    window.location.href = "/";   
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (current1 === questions.length - 1) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          setFocusedButton((prev) => (prev === 0 ? 1 : 0));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          setFocusedButton((prev) => (prev === 1 ? 0 : 1));
        } else if (e.key === "Enter") {
          if (focusedButton === 0) handleRestart();
          else handleFinish();
        }
      } else {
        if (e.key === "Enter" || e.key === "ArrowRight") {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedButton, current1]);

  return (
    <div className="w-full h-full flex flex-col px-6 py-4">
      <h2 className="text-lg font-bold text-black px-2 py-2 rounded-md mb-6 -mt-10 w-fit">
        Reviewing Question {current1 + 1} of {questions.length}
      </h2>

      <p className="text-2xl font-bold text-gray-800 mb-6 text-left">
        {currentQuestion.question}
      </p>

      <div className="w-full grid grid-cols-2 gap-4 place-items-center">
        {currentQuestion.options.map((opt, idx) => (
          <button
            key={idx}
            disabled
            className={`border rounded-lg px-4 py-3 text-left transition w-full max-w-xs ${
              opt === currentQuestion.answer
                ? "text-white bg-[#26ECB4]"
                : opt === selectedAnswer
                ? "text-white bg-[#EC265F]"
                : "bg-white text-black"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="col-span-2 mt-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg px-4 py-2 w-full max-w-[28rem] mx-auto">
        <strong>Explanation:</strong> {currentQuestion.explanation}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        {current1 < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg font-semibold text-white transition duration-200 bg-blue-600 hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <>
            <button
              onClick={handleRestart}
              className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-200 ${
                focusedButton === 0 ? "ring-2 ring-blue-400" : ""
              } bg-green-600 hover:bg-green-700`}
            >
              Restart Quiz
            </button>

            <button
              onClick={handleFinish}
              className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-200 ${
                focusedButton === 1 ? "ring-2 ring-blue-400" : ""
              } bg-gray-700 hover:bg-gray-800`}
            >
              Finish & Exit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
