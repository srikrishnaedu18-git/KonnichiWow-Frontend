import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import { ArrowLeft, BookText } from "lucide-react";
import mascot1 from "../assets/right.png";
import mascot2 from "../assets/left.png";
import jwLogo from "../assets/jw_logo.png";
import Quizcard from "../components/Quizcard";
import { questions } from "../data/question";
import { leviQuestions } from "../data/leviQuestions";

export default function HomePage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [leviQuiz, setLeviQuiz] = useState(false);

  return (
    <div className="relative -ml-20 mr-40 w-screen h-screen overflow-hidden bg-[#F6F7FB] text-gray-800 ">
      <div className="fixed top-0 left-0 h-screen w-30 z-10 bg-white shadow-md">
        <Sidebar jwLogo={jwLogo} />
      </div>

      <div className="fixed top-0 right-0 h-screen w-80 z-10 bg-white shadow-md">
        <RightPanel />
      </div>

      <div className="ml-52 w-200 mr-100 h-screen overflow-y-scroll">
        <div className="px-4 py-6">
          <div className="relative w-full max-w-4xl mx-auto space-y-20">
            {showQuiz ? (
              <Quizcard onBack={() => setShowQuiz(false)} questions={questions} />
            ) : leviQuiz ? (
              <Quizcard onBack={() => setLeviQuiz(false)} questions={leviQuestions} />
            ) : (
              <>
                <div className="w-full bg-gradient-to-r from-[#7E5BEF] via-[#3A3A8C] to-black text-white font-bold px-8 py-6 rounded-2xl shadow-md flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ArrowLeft size={24} className="text-white" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm uppercase opacity-90">Section 1, Unit 1</span>
                      <span className="text-xl font-extrabold">Gojo Satoru’s Cursed Intern Interview</span>
                    </div>
                  </div>
                  <button className="flex items-center bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border border-white rounded-xl px-4 py-2 text-xs uppercase font-extrabold transition">
                    <BookText size={16} className="mr-1" />
                    Guidebook
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowQuiz(true)}
                    className="bg-[#152f6d] hover:bg-[#10317d] text-white font-bold px-10 py-6 ml-40 rounded-full shadow-md text-lg"
                  >
                    Ikuzo
                  </motion.button>
                  <motion.img
                    src={mascot1}
                    alt="Gojo Mascot"
                    className="w-72 mr-40"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <div className="w-full bg-gradient-to-r from-[#F9D976] to-[#4B3621] text-white font-bold px-8 py-6 rounded-2xl shadow-md flex items-center justify-between mt-20">
                  <div className="flex items-center space-x-4">
                    <ArrowLeft size={24} className="text-white" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm uppercase opacity-90">Section 2, Unit 1</span>
                      <span className="text-xl font-extrabold">Levi Ackerman’s Elite Intern Drill</span>
                    </div>
                  </div>
                  <button className="flex items-center bg-[#BFA76F] hover:bg-[#A68C5D] text-white border border-white rounded-xl px-4 py-2 text-xs uppercase font-extrabold transition">
                    <BookText size={16} className="mr-1" />
                    Guidebook
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <motion.img
                    src={mascot2}
                    alt="Levi Mascot"
                    className="w-72 ml-40"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLeviQuiz(true)}
                    className="bg-[#4B3621] hover:bg-[#3A2B1C] text-white font-bold px-10 py-6 mr-40 rounded-full shadow-md text-lg"
                  >
                    Tatakae
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

