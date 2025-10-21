import { motion } from "framer-motion";
import { selectMistakeCount } from "../store/quizSlice";
import { useSelector } from "react-redux";
import { selectXP } from "../store/quizSlice";

import {
  Trophy,
  Target,
  UserPlus,
  Flame,
  Gem,
  Heart,
  ShieldCheck,
  Lock,
  Bolt,
  PackageOpen,
} from "lucide-react";

export default function RightPanel() {
  const mistakes = useSelector(selectMistakeCount);
  const maxHearts = 3;
  const heartsLeft = Math.max(0, maxHearts - mistakes);
  const xp = useSelector(selectXP);
  const xpPercent = Math.min(100, (xp / 10) * 100);

  return (
    <div className="hidden lg:flex flex-col w-80 h-screen">
      <div className="flex items-center justify-center gap-6 py-4 bg-white flex-shrink-0 shadow-lg">
        <div className="flex items-center space-x-1">
          <Flame size={20} className="text-orange-500" />
          <span className="text-sm font-bold text-gray-700">5</span>
        </div>
        <div className="flex items-center space-x-1">
          <Gem size={20} className="text-[#1CB0F6]" />
          <span className="text-sm font-bold text-[#1CB0F6]">505</span>
        </div>
        <div className="flex items-center space-x-1">
          <Heart size={20} className="text-red-500 fill-red-500" />
          <span className="text-sm font-bold text-red-500">{heartsLeft}</span>
        </div>
      </div>

      <div className="flex-1 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
        <div className="pt-2 pb-6 pr-3 pl-3 flex flex-col gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-50 p-4 rounded-xl shadow-sm flex gap-3 items-start"
          >
            <div className="flex flex-col items-center justify-center">
              <PackageOpen className="text-green-600" />
              <Bolt size={14} className="text-green-600 mt-[-6px]" />
            </div>
            <div>
              <h3 className="font-semibold text-green-700">Words Learned</h3>
              <p className="text-sm text-gray-600">
                You've unlocked{" "}
                <span className="font-bold text-green-700">128 words</span> so
                far.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Keep going to reach 200!
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-50 p-4 rounded-xl shadow-sm flex gap-3 items-start"
          >
            <div className="flex flex-col items-center justify-center">
              <Target className="text-blue-600" />
              <Bolt size={14} className="text-blue-600 mt-[-6px]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-700">Daily Quest</h3>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-blue-700">Earn XP</span> by
                completing today’s challenge.
              </p>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-blue-200">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{xp} / 10</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-purple-50 p-4 rounded-xl shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <Trophy className="text-purple-600" />
              <h3 className="font-semibold text-purple-700">
                Top Badges Earned
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center gap-1 bg-white border border-purple-300 rounded-full px-3 py-1 text-xs font-semibold text-purple-700">
                <ShieldCheck size={14} /> Accuracy Ace
              </div>
              <div className="flex items-center gap-1 bg-white border border-purple-300 rounded-full px-3 py-1 text-xs font-semibold text-purple-700">
                <Flame size={14} /> 5-Day Streak
              </div>
              <div className="flex items-center gap-1 bg-white border border-purple-300 rounded-full px-3 py-1 text-xs font-semibold text-purple-700">
                <Gem size={14} /> XP Collector
              </div>
            </div>
          </motion.div>
        </div>
        <div className="px-6 py-1 text-[10px] text-gray-400 flex flex-wrap gap-2 justify-center border-t border-gray-100">
          <span className="hover:underline cursor-pointer">ABOUT</span>
          <span className="hover:underline cursor-pointer">BLOG</span>
          <span className="hover:underline cursor-pointer">STORE</span>
          <span className="hover:underline cursor-pointer">EFFICACY</span>
          <span className="hover:underline cursor-pointer">CAREERS</span>
          <div className="flex flex-wrap gap-2">
            <span className="hover:underline cursor-pointer">INVESTORS</span>
            <span className="hover:underline cursor-pointer">TERMS</span>
            <span className="hover:underline cursor-pointer">PRIVACY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
