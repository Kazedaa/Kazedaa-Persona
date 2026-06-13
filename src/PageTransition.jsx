import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { playSelectSound } from "./utils/audio.js";

function CombinedTransition() {
  const horizontalPanels = [
    { color: "#0d0d0d", top: "-12vh", left: "-18vw", width: "60vw", delay: 0 },
    { color: "#ffffff", top: "24vh", left: "-10vw", width: "50vw", delay: 0.05 },
    { color: "#ffffff", top: "58vh", left: "-14vw", width: "55vw", delay: 0.1 },
  ];

  const verticalStripes = [
    { color: "#0d0d0d", left: "72vw", width: "24vw", delay: 0 },
    { color: "#d92323", left: "80vw", width: "14vw", delay: 0.06 },
    { color: "#ffffff", left: "88vw", width: "8vw", delay: 0.12 },
  ];

  return (
    <>
      {horizontalPanels.map((panel, i) => (
        <motion.div
          key={`h-${i}`}
          style={{
            position: "fixed",
            top: panel.top,
            left: panel.left,
            width: panel.width,
            height: "26vh",
            background: panel.color,
            zIndex: 999 - i,
            clipPath: "polygon(0 0, 100% 0, calc(100% - 120px) 100%, 0 100%)",
            transform: "rotate(-18deg)",
            transformOrigin: "left center",
            pointerEvents: "none",
          }}
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: [-500, 20, 0], opacity: [1, 1, 0] }}
          transition={{
            duration: 0.52,
            delay: panel.delay,
            times: [0, 0.68, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      {verticalStripes.map((stripe, i) => (
        <motion.div
          key={`v-${i}`}
          style={{
            position: "fixed",
            top: "-6vh",
            left: stripe.left,
            width: stripe.width,
            height: "112vh",
            background: stripe.color,
            zIndex: 996 - i,
            transform: "skewX(-16deg)",
            transformOrigin: "top",
            pointerEvents: "none",
          }}
          initial={{ y: -1200, opacity: 1 }}
          animate={{ y: [-1200, 0, 0, 1200] }}
          transition={{
            duration: 0.56,
            delay: stripe.delay,
            times: [0, 0.42, 0.58, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </>
  );
}

export default function PageTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    playSelectSound();
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} style={{ position: "relative" }}>
          <CombinedTransition />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.18 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
