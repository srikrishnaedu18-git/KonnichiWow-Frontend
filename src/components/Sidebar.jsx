import { motion } from "framer-motion";
import {
  Home,
  Trophy,
  ShoppingBag,
  User,
  MoreHorizontal,
  Target,
  BookText,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/jw_logo.png";

const items = [
  { icon: <BookText />, label: "LEARN", link: "/" },
  { icon: <Trophy />, label: "LEADERBOARDS" },
  { icon: <Target />, label: "QUESTS" },
  { icon: <ShoppingBag />, label: "SHOP" },
  { icon: <User />, label: "PROFILE" },
  { icon: <MoreHorizontal />, label: "MORE" },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col justify-between w-30 bg-white shadow-lg border-r border-gray-200 h-200">
      <div className="flex flex-col items-center py-6 gap-8">
        <img
        src={logo}
        alt="JW Logo"
        className="w-20 h-16"
      />
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-green-600"
          >
            {item.link ? (
              <Link to={item.link}>{item.icon}</Link>
            ) : (
              <div>{item.icon}</div>
            )}
            <span className="text-xs mt-1">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
