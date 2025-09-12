// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // start animation
      animate={{ opacity: 1, y: 0 }}    // enter
      exit={{ opacity: 0, y: -20 }}     // exit
      transition={{ duration: 0.4 }}    // speed
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
