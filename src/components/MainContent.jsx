import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-60 h-60"
      >
      </motion.div>

      <h1 className="text-3xl font-bold text-green-700">Learn Smarter. Play Harder.</h1>
      <p className="text-gray-600 max-w-md">
        Master your skills in a fun, gamified environment just like Duolingo — now with quizzes!
      </p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/quiz")}
        className="px-8 py-3 bg-green-500 text-white rounded-2xl font-semibold shadow-md hover:bg-green-600"
      >
        START
      </motion.button>
    </div>
  );
}
