import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { Archive, Box, Heart, Home, RotateCcw, Sparkles, Trophy, X } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Chocolate } from "@/app/components/Chocolate";
import { ChocolateData, getRandomChocolates } from "@/app/data/chocolates";

const RESULT_LABELS = [
  "Intacto",
  "Curiosidad",
  "Primera señal",
  "Conexión",
  "Interés real",
  "Pulso acelerado",
  "Sin retorno",
  "Vínculo fuerte",
  "Obsesión",
  "Energía desatada",
  "Caos espiritual",
  "Destino sellado",
  "Bankai del amor",
];

const BIRTHDAY_CREDITS = [
  {
    character: "Ichigo Kurosaki",
    message: "Kevin, disfruta tu día. Si algo intenta arruinarlo, tendrá que pasar primero por mí.",
  },
  {
    character: "Rukia Kuchiki",
    message: "Feliz cumpleaños, Kevin. He preparado un dibujo para celebrarlo. Su calidad es indiscutible.",
  },
  {
    character: "Orihime Inoue",
    message: "¡Kevin! Deseo que hoy comas algo delicioso y que recibas cinco vidas enteras de felicidad.",
  },
  {
    character: "Renji Abarai",
    message: "¡Otro año más fuerte, Kevin! Hoy se celebra a lo grande. Nada de quedarse sentado.",
  },
  {
    character: "Byakuya Kuchiki",
    message: "Kevin, has llegado dignamente hasta este día. Que el año venidero esté a la altura.",
  },
  {
    character: "Tōshirō Hitsugaya",
    message: "Feliz cumpleaños. Y no, Kevin, soplar las velas no cuenta como entrenamiento.",
  },
  {
    character: "Rangiku Matsumoto",
    message: "Kevin, hoy tienes permiso oficial para olvidar las responsabilidades. Yo ya empecé.",
  },
  {
    character: "Kisuke Urahara",
    message: "Feliz cumpleaños, Kevin. Este regalo no tiene efectos secundarios... probablemente.",
  },
  {
    character: "Yoruichi Shihōin",
    message: "Un año más rápido, más sabio y más fuerte. Intenta alcanzarme, cumpleañero.",
  },
  {
    character: "Kenpachi Zaraki",
    message: "¡Kevin! Haz que este nuevo año sea una batalla que merezca la pena recordar.",
  },
  {
    character: "Shunsui Kyōraku",
    message: "La vida pasa deprisa, Kevin. Hoy toca brindar, sonreír y dejar el trabajo para mañana.",
  },
  {
    character: "Sōsuke Aizen",
    message: "Feliz cumpleaños, Kevin. Desde el principio, esta celebración formaba parte de mi plan.",
  },
];

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "ink" | "paper" | "orange";
  icon?: React.ReactNode;
};

function ActionButton({
  children,
  onClick,
  variant = "ink",
  icon,
}: ActionButtonProps) {
  const variants = {
    ink: "bg-[#121212] text-[#f4f0e7] border-[#121212] hover:bg-[#282828]",
    paper: "bg-[#f4f0e7] text-[#121212] border-[#121212] hover:bg-white",
    orange: "bg-[#f05a24] text-white border-[#121212] hover:bg-[#d94714]",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 1, scale: 0.98 }}
      onClick={onClick}
      className={`group flex min-h-11 items-center justify-center gap-2 border-2 px-5 py-2.5 font-['Noto_Sans'] text-xs font-black uppercase tracking-[0.16em] shadow-[4px_4px_0_#121212] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f05a24] ${variants[variant]}`}
    >
      {icon}
      {children}
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </motion.button>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-7 w-7 border-[#f05a24] ${className}`}
    />
  );
}

export default function App() {
  const [chocolates, setChocolates] = useState<ChocolateData[]>([]);
  const [eatenIds, setEatenIds] = useState<number[]>([]);
  const [selected, setSelected] = useState<ChocolateData | null>(null);
  const [savedMessages, setSavedMessages] = useState<ChocolateData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [creditsFinished, setCreditsFinished] = useState(false);

  useEffect(() => {
    setChocolates(getRandomChocolates());
    const stored = window.localStorage.getItem("konpaku-saved-messages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChocolateData[];
        setSavedMessages(
          parsed.filter((item) => item.message && item.character),
        );
      } catch {
        window.localStorage.removeItem("konpaku-saved-messages");
      }
    }
  }, []);

  const openSeal = () => {
    setIsOpen(true);
    confetti({
      particleCount: 44,
      spread: 80,
      startVelocity: 22,
      colors: ["#f05a24", "#f4f0e7", "#121212"],
      origin: { y: 0.62 },
    });
  };

  const revealMessage = (chocolate: ChocolateData) => {
    if (eatenIds.includes(chocolate.id)) {
      toast("Este espíritu ya reveló su mensaje.", {
        icon: "◉",
        style: {
          background: "#121212",
          color: "#f4f0e7",
          border: "1px solid #f05a24",
        },
      });
      return;
    }
    setEatenIds((current) => [...current, chocolate.id]);
    setSelected(chocolate);
    confetti({
      particleCount: 24,
      spread: 55,
      startVelocity: 18,
      colors: ["#f05a24", "#f6b73c", "#ffffff"],
      origin: { y: 0.55 },
    });
  };

  const refill = () => {
    setIsOpen(false);
    setEatenIds([]);
    setSelected(null);
    window.setTimeout(() => setChocolates(getRandomChocolates()), 450);
  };

  const toggleSaved = () => {
    if (!selected) return;
    const alreadySaved = savedMessages.some(
      (item) => item.message === selected.message && item.character === selected.character,
    );
    const next = alreadySaved
      ? savedMessages.filter(
          (item) => item.message !== selected.message || item.character !== selected.character,
        )
      : [...savedMessages, selected];
    setSavedMessages(next);
    window.localStorage.setItem("konpaku-saved-messages", JSON.stringify(next));
    toast(alreadySaved ? "Mensaje eliminado de tus guardados." : "Mensaje guardado en tu archivo.", {
      icon: "🧡",
      style: {
        background: "#f4f0e7",
        color: "#121212",
        border: "2px solid #121212",
      },
    });
  };

  const resultLabel = RESULT_LABELS[Math.min(eatenIds.length, 12)];
  const selectedIsSaved = selected
    ? savedMessages.some(
        (item) => item.message === selected.message && item.character === selected.character,
      )
    : false;

  const returnToWelcome = () => {
    setShowSaved(false);
    setShowResults(false);
    setShowCredits(false);
    setCreditsFinished(false);
    setSelected(null);
    setShowGift(false);
  };

  const closeMessage = () => {
    setSelected(null);
  };

  const closeReading = () => {
    setShowResults(false);
  };

  const startCredits = () => {
    setShowResults(false);
    setCreditsFinished(false);
    window.setTimeout(() => setShowCredits(true), 250);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-[#f05a24] selection:text-white">
      <Toaster position="top-center" />

      <AnimatePresence>
        {!showGift && (
          <motion.section
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#121212] p-5 text-[#f4f0e7]"
          >
            <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(135deg,#fff_0,#fff_1px,transparent_1px,transparent_9px)]" />
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-[#f05a24]" />
            <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full border border-white/20" />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.65 }}
              className="relative w-full max-w-3xl border border-white/20 px-7 py-12 text-center md:px-16 md:py-16"
            >
              
              <p className="mt-5 font-['Noto_Serif_JP'] text-3xl font-black text-white/25">誕生日おめでとう</p>
              <h1 className="mt-1 font-['Grenze_Gotisch'] text-6xl font-black leading-[0.85] md:text-8xl">
                Feliz
                <span className="block text-[#f05a24]">cumpleaños</span>
              </h1>
              <div className="mx-auto my-8 h-px w-24 bg-white/30" />
              <p className="mx-auto max-w-xl font-['Noto_Sans'] text-base leading-7 text-white/75 md:text-lg">
                Que este nuevo año de vida te encuentre rodeado de personas que
                cuiden tu alma, aventuras que enciendan tu corazón y momentos
                tan especiales que quieras guardarlos para siempre.
              </p>
              <div className="mt-9 flex justify-center">
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGift(true)}
                  className="flex items-center gap-3 border-2 border-[#f05a24] bg-[#f05a24] px-7 py-4 font-['DM_Mono'] text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[6px_6px_0_#f4f0e7] transition-colors hover:bg-transparent"
                >
                  <Box size={18} /> Ver mi regalo <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Manga-paper ground */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.055] [background-image:repeating-linear-gradient(0deg,#111_0,#111_1px,transparent_1px,transparent_5px)]" />
        <div className="absolute -right-40 top-[-11rem] h-[35rem] w-[35rem] rounded-full border-[90px] border-[#121212]/[0.035]" />
        <div className="absolute bottom-[-20rem] left-[-12rem] h-[38rem] w-[38rem] rounded-full border-[1px] border-[#121212]/10" />
        <div className="absolute left-[7%] top-0 h-full w-px bg-[#121212]/10" />
        <div className="absolute right-[7%] top-0 h-full w-px bg-[#121212]/10" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-[1380px] items-center justify-between border-b border-[#121212]/25 px-5 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center bg-[#121212] text-sm font-black text-white">
            魂
          </div>
          <div>
            <p className="font-['DM_Mono'] text-[10px] font-medium uppercase tracking-[0.24em] text-[#6d6860]">
              Archivo de vínculos
            </p>
            <p className="font-['Noto_Sans'] text-xs font-black uppercase tracking-[0.12em]">
              Konpaku · 01
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em]">
          <button
            onClick={returnToWelcome}
            className="flex items-center gap-2 font-bold transition-colors hover:text-[#f05a24]"
            aria-label="Volver a la felicitación inicial"
          >
            <Home size={14} />
            <span className="hidden lg:inline">Inicio</span>
          </button>
          <button
            onClick={() => setShowSaved(true)}
            className="flex items-center gap-2 border-l border-[#121212]/20 pl-3 font-bold transition-colors hover:text-[#f05a24] md:border-r md:pr-4"
          >
            <Archive size={14} />
            <span className="hidden sm:inline">Guardados</span> ({savedMessages.length})
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <span className={`h-2 w-2 ${isOpen ? "bg-[#f05a24]" : "bg-[#121212]"}`} />
            {isOpen ? "Sello abierto" : "Sello estable"}
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-69px)] w-full max-w-[1380px] items-center gap-10 px-5 py-10 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-8">
        <section className="relative order-2 max-w-xl lg:order-1 lg:pb-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="bg-[#f05a24] px-3 py-1 font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Objeto espiritual
            </span>
            <span className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#6d6860]">
              Serie limitada / 12 piezas
            </span>
          </div>

          <h1 className="font-['Grenze_Gotisch'] text-[clamp(4.3rem,9vw,8.4rem)] font-black leading-[0.72] tracking-[-0.06em]">
            Caja de
            <span className="relative mt-3 block pl-[0.34em] text-[#f05a24]">
              almas
              <span
                aria-hidden="true"
                className="absolute -left-1 top-1/2 h-[2px] w-[0.25em] -rotate-12 bg-[#121212]"
              />
            </span>
          </h1>

          <p className="mt-8 max-w-md border-l-2 border-[#f05a24] pl-5 font-['Noto_Sans'] text-sm leading-7 text-[#4e4a44] md:text-base">
            Doce pequeños secretos, un solo vínculo. Rompe el sello, elige
            una pieza y descubre el mensaje que estaba esperando encontrarte.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {!isOpen ? (
              <ActionButton variant="orange" onClick={openSeal} icon={<Sparkles size={16} />}>
                Romper el sello
              </ActionButton>
            ) : (
              <>
                <ActionButton onClick={() => setShowResults(true)} icon={<Trophy size={15} />}>
                  Ver lectura
                </ActionButton>
                <ActionButton variant="paper" onClick={refill} icon={<RotateCcw size={15} />}>
                  Sellar de nuevo
                </ActionButton>
              </>
            )}
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 border-y border-[#121212]/30 py-4">
            <div>
              <p className="font-['Grenze_Gotisch'] text-3xl font-bold">{eatenIds.length}/12</p>
              <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#6d6860]">Revelados</p>
            </div>
            <div className="border-l border-[#121212]/20 pl-5">
              <p className="font-['Grenze_Gotisch'] text-3xl font-bold">{String(savedMessages.length).padStart(2, "0")}</p>
              <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#6d6860]">Guardados</p>
            </div>
            <div className="border-l border-[#121212]/20 pl-5">
              <p className="font-['Grenze_Gotisch'] text-3xl font-bold">∞</p>
              <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#6d6860]">Energía</p>
            </div>
          </div>
        </section>

        <section className="order-1 flex items-center justify-center lg:order-2">
          <div className="relative w-full max-w-[720px]">
            <p className="absolute -left-1 top-6 hidden -rotate-90 font-['DM_Mono'] text-[9px] uppercase tracking-[0.3em] text-[#6d6860] md:block">
              Contenedor · clase especial
            </p>
            <div className="relative mx-auto aspect-[1.15/1] w-[92%] max-w-[650px]">
              {/* Box base */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-[#171717] p-5 shadow-[18px_20px_0_rgba(18,18,18,0.12)] md:p-8"
              >
                <CornerMark className="-left-3 -top-3 border-l-4 border-t-4" />
                <CornerMark className="-right-3 -top-3 border-r-4 border-t-4" />
                <CornerMark className="-bottom-3 -left-3 border-b-4 border-l-4" />
                <CornerMark className="-bottom-3 -right-3 border-b-4 border-r-4" />
                <div className="relative h-full border border-white/15 bg-[#242424] p-4 md:p-7">
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#f4f0e7_0.7px,transparent_0.7px)] [background-size:11px_11px]" />
                  <div className="relative grid h-full grid-cols-4 grid-rows-3 place-items-center gap-2 md:gap-5">
                    {chocolates.map((chocolate, index) => (
                      <motion.div
                        key={chocolate.id}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                        transition={{ delay: 0.28 + index * 0.045, type: "spring", damping: 14 }}
                        className="relative h-full max-h-[105px] w-full max-w-[105px] p-1"
                      >
                        <span className="absolute left-0 top-0 font-['DM_Mono'] text-[7px] text-white/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Chocolate
                          type={chocolate.type}
                          isEaten={eatenIds.includes(chocolate.id)}
                          onClick={() => revealMessage(chocolate)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Lid */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.button
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ y: -500, rotate: -3, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    onClick={openSeal}
                    className="group absolute inset-[-8px] z-20 overflow-hidden border-2 border-[#121212] bg-[#f1ede4] text-left shadow-[18px_20px_0_rgba(18,18,18,0.25)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f05a24]"
                    aria-label="Abrir la caja sorpresa"
                  >
                    <div className="absolute inset-y-0 left-[19%] w-[15%] bg-[#f05a24]" />
                    <div className="absolute left-0 top-[58%] h-[14%] w-full bg-[#f05a24]" />
                    <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,#111_0,#111_1px,transparent_1px,transparent_7px)]" />
                    <div className="absolute right-[8%] top-[8%] text-right">
                      <p className="font-['DM_Mono'] text-[8px] font-bold uppercase tracking-[0.22em]">Objeto 0012</p>
                      <p className="font-['Noto_Serif_JP'] text-2xl font-black md:text-4xl">魂の贈り物</p>
                    </div>
                    <div className="absolute left-[8%] top-[10%] border-l-2 border-[#121212] pl-2 font-['DM_Mono'] text-[7px] uppercase leading-4 tracking-[0.15em]">
                      Precaución<br />energía emocional<br />no catalogada
                    </div>
                    <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#121212] bg-[#f1ede4] shadow-[0_0_0_9px_#f1ede4,0_0_0_11px_#121212] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 md:h-44 md:w-44">
                      <div className="text-center">
                        <Box className="mx-auto mb-1" size={28} strokeWidth={1.5} />
                        <p className="font-['Grenze_Gotisch'] text-2xl font-black leading-none md:text-4xl">Rompe</p>
                        <p className="font-['DM_Mono'] text-[8px] font-bold uppercase tracking-[0.2em]">el sello</p>
                      </div>
                    </div>
                    <p className="absolute bottom-[7%] right-[7%] max-w-[11rem] font-['Grenze_Gotisch'] text-xl font-bold leading-5 md:text-3xl md:leading-7">
                      Solo para quien se atreva a sentir.
                    </p>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <div className="mx-auto mt-5 flex w-[92%] items-center justify-between font-['DM_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#6d6860]">
              <span>{isOpen ? "Elige una pieza" : "Toca para abrir"}</span>
              <span>Tokyo // dimensión 04</span>
            </div>
          </div>
        </section>
      </div>

      {/* Message reveal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMessage}
            className="fixed inset-0 z-50 grid place-items-center bg-[#121212]/85 p-5 backdrop-blur-sm"
          >
            <motion.article
              initial={{ y: 40, scale: 0.94, rotate: -1 }}
              animate={{ y: 0, scale: 1, rotate: 0 }}
              exit={{ y: 20, scale: 0.96, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-xl border-2 border-[#121212] bg-[#f4f0e7] p-7 shadow-[12px_12px_0_#f05a24] md:p-12"
            >
              <button
                onClick={closeMessage}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-[#121212] transition-colors hover:bg-[#121212] hover:text-white"
                aria-label="Cerrar mensaje"
              >
                <X size={18} />
              </button>
              <p className="mb-8 font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.22em] text-[#f05a24]">
                Transmisión espiritual · {String(selected.id).padStart(2, "0")}
              </p>
              <div className="mb-8 h-px w-full bg-[#121212]/25">
                <span className="block h-[3px] w-20 -translate-y-px bg-[#121212]" />
              </div>
              <blockquote className="font-['Grenze_Gotisch'] text-3xl font-bold leading-tight md:text-5xl">
                “{selected.message}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f05a24]" />
                <p className="font-['DM_Mono'] text-[11px] font-bold uppercase tracking-[0.16em] text-[#f05a24]">
                  {selected.character}
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <ActionButton
                  variant={selectedIsSaved ? "orange" : "ink"}
                  onClick={toggleSaved}
                  icon={<Heart size={15} fill={selectedIsSaved ? "currentColor" : "none"} />}
                >
                  {selectedIsSaved ? "Mensaje guardado" : "Guardar mensaje"}
                </ActionButton>
                <ActionButton variant="paper" onClick={closeMessage}>
                  Elegir otro
                </ActionButton>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results p-[0px] */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReading}
            className="fixed inset-0 z-50 grid place-items-center bg-[#121212]/90 p-5"
          >
            <motion.article
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden bg-[#f05a24] p-2 shadow-[14px_14px_0_rgba(244,240,231,0.16)]"
            >
              <div className="border-2 border-[#121212] bg-[#f4f0e7] p-7 md:p-10">
                <p className="font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.25em]">Lectura del vínculo</p>
                <p className="mt-2 font-['Noto_Serif_JP'] text-5xl font-black">診断</p>
                <div className="my-8 border-y-2 border-[#121212] py-7 text-center">
                  <p className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#6d6860]">Nivel detectado</p>
                  <h2 className="mt-2 font-['Grenze_Gotisch'] text-5xl font-black leading-none text-[#f05a24] md:text-6xl">{resultLabel}</h2>
                  <p className="mt-3 font-['DM_Mono'] text-xs font-bold">{eatenIds.length} DE 12 MENSAJES REVELADOS</p>
                </div>
                <div>
                  <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#6d6860]">Último mensaje guardado</p>
                  <p className="mt-2 font-['Grenze_Gotisch'] text-2xl font-bold leading-tight">
                    {savedMessages.length
                      ? `“${savedMessages[savedMessages.length - 1].message}”`
                      : "Aún no has guardado ninguno."}
                  </p>
                  {savedMessages.length > 0 && (
                    <p className="mt-2 font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.14em] text-[#f05a24]">
                      {savedMessages[savedMessages.length - 1].character}
                    </p>
                  )}
                </div>
                <button
                  onClick={eatenIds.length === 12 ? startCredits : closeReading}
                  className="mt-8 flex w-full items-center justify-center gap-2 bg-[#121212] px-5 py-3 font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#f05a24]"
                >
                  {eatenIds.length === 12 ? (
                    <>
                      <Sparkles size={15} /> Ver créditos finales
                    </>
                  ) : (
                    <>
                      <X size={15} /> Cerrar lectura
                    </>
                  )}
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic birthday credits */}
      <AnimatePresence>
        {showCredits && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-hidden bg-[#070707] text-[#f4f0e7]"
          >
            <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_6px)]" />
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-[#070707] via-[#070707]/90 to-transparent px-5 pb-12 pt-5 md:px-10">
              <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.25em] text-white/45">
                Konpaku Pictures presenta
              </p>
              <div className="flex items-center gap-2">
                {!creditsFinished && (
                  <button
                    onClick={() => setCreditsFinished(true)}
                    className="hidden border border-white/20 px-3 py-2 font-['DM_Mono'] text-[8px] font-bold uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-white hover:text-white sm:block"
                  >
                    Saltar al final
                  </button>
                )}
                <button
                  onClick={returnToWelcome}
                  className="flex items-center gap-2 border border-white/30 px-4 py-2 font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.16em] transition-colors hover:border-[#f05a24] hover:bg-[#f05a24]"
                >
                  <Home size={13} /> Volver al inicio
                </button>
              </div>
            </div>

            {!creditsFinished && (
              <motion.div
                initial={{ y: "88vh" }}
                animate={{ y: "-100%" }}
                transition={{ duration: 48, ease: "linear" }}
                onAnimationComplete={() => setCreditsFinished(true)}
                className="relative mx-auto w-full max-w-3xl px-6 pb-[40vh] text-center"
              >
              <p className="font-['Noto_Serif_JP'] text-3xl font-black text-[#f05a24]">特別編</p>
              <p className="mt-3 font-['DM_Mono'] text-[10px] uppercase tracking-[0.35em] text-white/50">
                Un episodio especial
              </p>
              <h2 className="mt-7 font-['Grenze_Gotisch'] text-6xl font-black leading-[0.82] md:text-8xl">
                Feliz cumpleaños,
                <span className="mt-3 block text-[#f05a24]">Kevin</span>
              </h2>
              <p className="mx-auto mt-10 max-w-md font-['Noto_Sans'] text-sm leading-7 text-white/60">
                Mensajes transmitidos desde la Sociedad de Almas para celebrar
                al protagonista de este día.
              </p>

              <div className="mx-auto my-24 h-24 w-px bg-gradient-to-b from-transparent via-[#f05a24] to-transparent" />

              <div className="space-y-24">
                {BIRTHDAY_CREDITS.map((credit, index) => (
                  <article key={credit.character}>
                    <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.28em] text-[#f05a24]">
                      Mensaje {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-['Grenze_Gotisch'] text-4xl font-black md:text-5xl">
                      {credit.character}
                    </h3>
                    <p className="mx-auto mt-5 max-w-lg font-['Noto_Sans'] text-base leading-7 text-white/70 md:text-lg">
                      “{credit.message}”
                    </p>
                  </article>
                ))}
              </div>

              <div className="mx-auto my-24 h-24 w-px bg-gradient-to-b from-transparent via-[#f05a24] to-transparent" />
              <p className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.3em] text-white/45">
                Protagonista
              </p>
              <p className="mt-3 font-['Grenze_Gotisch'] text-7xl font-black text-[#f05a24] md:text-9xl">
                Kevin
              </p>
              <p className="mx-auto mt-8 max-w-lg font-['Grenze_Gotisch'] text-3xl font-bold leading-tight">
                Que tu nueva temporada esté llena de aventuras, personas
                inolvidables y motivos para sonreír.
              </p>
              <p className="mt-24 font-['Noto_Serif_JP'] text-4xl font-black">終</p>
              <p className="mt-3 font-['DM_Mono'] text-[9px] uppercase tracking-[0.3em] text-white/40">
                Fin · Feliz cumpleaños
              </p>
              </motion.div>
            )}

            <AnimatePresence>
              {creditsFinished && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10 grid place-items-center px-6 text-center"
                >
                  <div>
                    <p className="font-['Noto_Serif_JP'] text-5xl font-black text-[#f05a24]">終</p>
                    <p className="mt-5 font-['DM_Mono'] text-[9px] uppercase tracking-[0.3em] text-white/40">
                      Protagonista de este episodio
                    </p>
                    <h2 className="mt-2 font-['Grenze_Gotisch'] text-7xl font-black md:text-9xl">
                      Kevin
                    </h2>
                    <p className="mx-auto mt-6 max-w-lg font-['Grenze_Gotisch'] text-2xl font-bold leading-tight text-white/75 md:text-3xl">
                      Feliz cumpleaños. Que esta nueva temporada sea la mejor de todas.
                    </p>
                    <button
                      onClick={returnToWelcome}
                      className="mt-10 border-2 border-[#f05a24] bg-[#f05a24] px-7 py-3 font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.18em] shadow-[5px_5px_0_#f4f0e7] transition-colors hover:bg-transparent"
                    >
                      Volver al inicio
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070707] to-transparent" />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Saved messages archive */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSaved(false)}
            className="fixed inset-0 z-[70] flex justify-end bg-[#121212]/85 backdrop-blur-sm"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              onClick={(event) => event.stopPropagation()}
              className="flex h-full w-full max-w-xl flex-col bg-[#f4f0e7] shadow-2xl"
            >
              <div className="flex items-start justify-between border-b-2 border-[#121212] p-6 md:p-8">
                <div>
                  <p className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.22em] text-[#f05a24]">
                    Archivo personal
                  </p>
                  <h2 className="mt-1 font-['Grenze_Gotisch'] text-4xl font-black">Mensajes guardados</h2>
                </div>
                <button
                  onClick={() => setShowSaved(false)}
                  className="grid h-10 w-10 place-items-center border-2 border-[#121212] transition-colors hover:bg-[#121212] hover:text-white"
                  aria-label="Cerrar mensajes guardados"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {savedMessages.length === 0 ? (
                  <div className="grid h-full place-items-center text-center">
                    <div>
                      <Archive className="mx-auto mb-4 text-[#f05a24]" size={36} strokeWidth={1.5} />
                      <p className="font-['Grenze_Gotisch'] text-3xl font-bold">Tu archivo está vacío</p>
                      <p className="mx-auto mt-2 max-w-xs font-['Noto_Sans'] text-sm leading-6 text-[#6d6860]">
                        Abre la caja y guarda las frases que quieras conservar.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedMessages.map((item, index) => (
                      <article
                        key={`${item.character}-${item.message}`}
                        className="relative border-2 border-[#121212] bg-[#f8f5ee] p-5 shadow-[5px_5px_0_#ded8cd]"
                      >
                        <span className="font-['DM_Mono'] text-[9px] text-[#6d6860]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-3 font-['Grenze_Gotisch'] text-2xl font-bold leading-tight">
                          “{item.message}”
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <p className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.14em] text-[#f05a24]">
                            {item.character}
                          </p>
                          <button
                            onClick={() => {
                              const next = savedMessages.filter(
                                (saved) =>
                                  saved.message !== item.message ||
                                  saved.character !== item.character,
                              );
                              setSavedMessages(next);
                              window.localStorage.setItem(
                                "konpaku-saved-messages",
                                JSON.stringify(next),
                              );
                            }}
                            className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.12em] text-[#6d6860] underline underline-offset-4 hover:text-[#bb2b20]"
                          >
                            Eliminar
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
