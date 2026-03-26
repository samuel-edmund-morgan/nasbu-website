"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  year: string;
  text: string;
  detail: string;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: "1994",
    text: "Заснування Інституту підготовки кадрів СБУ",
    detail:
      "Створення спеціалізованого навчального закладу для підготовки висококваліфікованих кадрів Служби безпеки незалежної України. Початок формування власної школи безпекової освіти.",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop&q=80",
  },
  {
    year: "2001",
    text: "Реорганізація в Національну академію СБУ",
    detail:
      "Інститут отримав статус Національної академії — визнання найвищого рівня підготовки фахівців у сфері національної безпеки. Розширення спектру спеціальностей.",
    image:
      "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=600&h=400&fit=crop&q=80",
  },
  {
    year: "2010",
    text: "Акредитація за IV рівнем",
    detail:
      "Академія підтвердила найвищий рівень акредитації, що дає право готувати магістрів, докторів філософії та докторів наук. Запровадження нових освітніх стандартів.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80",
  },
  {
    year: "2015",
    text: "Нові спеціальності з кібербезпеки",
    detail:
      "У відповідь на сучасні виклики запроваджено підготовку фахівців з кібербезпеки та інформаційного захисту. Створено спеціалізовані лабораторії та кіберполігон.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&q=80",
  },
  {
    year: "2022",
    text: "Модернізація за стандартами НАТО",
    detail:
      "Повна модернізація навчальних програм відповідно до стандартів Північноатлантичного альянсу. Інтеграція найкращих практик підготовки кадрів безпекового сектору.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&q=80",
  },
  {
    year: "2025",
    text: "Науково-дослідний центр кіберзахисту",
    detail:
      "Відкриття сучасного науково-дослідного центру, оснащеного передовим обладнанням для досліджень у сфері кіберзахисту та штучного інтелекту.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&q=80",
  },
];

export default function HistoryBookshelf() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  const handleHover = (index: number) => {
    if (!isMobile) setActiveIndex(index);
  };

  const handleLeave = () => {
    if (!isMobile) setActiveIndex(null);
  };

  const collapsedW = isMobile ? 56 : 80;
  const expandedW = isMobile ? 320 : 540;
  const cardH = isMobile ? 340 : 420;

  return (
    <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 md:gap-3 justify-center min-w-max mx-auto">
        {milestones.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={item.year}
              className="relative cursor-pointer select-none flex-shrink-0"
              onHoverStart={() => handleHover(index)}
              onHoverEnd={handleLeave}
              onClick={() => handleClick(index)}
              animate={{ width: isActive ? expandedW : collapsedW }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              style={{ height: cardH }}
            >
              {/* Card */}
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                animate={{
                  boxShadow: isActive
                    ? "0 25px 60px -12px rgba(30,58,138,0.4)"
                    : "0 4px 14px -2px rgba(30,58,138,0.12)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* BG image */}
                <img
                  src={item.image}
                  alt={item.text}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(10,22,51,0.92) 35%, rgba(30,58,138,0.45) 100%)"
                      : "linear-gradient(to top, rgba(10,22,51,0.96) 15%, rgba(30,58,138,0.88) 100%)",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* ── Collapsed ── */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                    >
                      <div className="w-7 h-[2px] rounded-full bg-amber-400/70" />
                      <span
                        className="text-white font-black text-xl md:text-2xl tracking-[0.18em]"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "mixed",
                        }}
                      >
                        {item.year}
                      </span>
                      <div className="w-5 h-[2px] rounded-full bg-white/20" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Expanded ── */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 flex flex-col"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.06 }}
                    >
                      {/* Top photo strip */}
                      <motion.div
                        className="relative h-[45%] overflow-hidden"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        <img
                          src={item.image}
                          alt={item.text}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-950/95" />

                        {/* Year floating badge */}
                        <motion.div
                          className="absolute top-4 left-5 md:left-6"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.35 }}
                        >
                          <div className="bg-amber-400 text-primary-950 font-black text-2xl md:text-3xl px-4 py-1.5 rounded-lg shadow-lg shadow-amber-400/30">
                            {item.year}
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Bottom content */}
                      <div className="flex-1 flex flex-col px-5 md:px-7 pb-5 md:pb-6 pt-2">
                        <motion.h3
                          className="text-white font-bold text-base md:text-xl leading-snug mb-2 md:mb-3"
                          initial={{ y: 14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.18, duration: 0.35 }}
                        >
                          {item.text}
                        </motion.h3>

                        <motion.p
                          className="text-blue-100/70 text-xs md:text-sm leading-relaxed flex-1"
                          initial={{ y: 14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.24, duration: 0.35 }}
                        >
                          {item.detail}
                        </motion.p>

                        {/* Bottom accent line */}
                        <motion.div
                          className="mt-3 md:mt-4 h-[3px] rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: 0.3,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                          style={{ transformOrigin: "left" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Side edge highlights */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-r from-white/8 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
