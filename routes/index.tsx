import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import cakeImg from "@/assets/cake.png";
import giftboxImg from "@/assets/giftbox.png";
import giftopenImg from "@/assets/giftopen.png";
import lightsImg from "@/assets/lights.jpg";
import moonImg from "@/assets/moon.png";
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Step =
  | "landing"
  | "cake"
  | "gift"
  | "card"
  | "album"
  | "message"
  | "thanks";

function Index() {
  const [step, setStep] = useState<Step>("landing");

  return (
    <div className="night-bg relative min-h-screen w-full overflow-hidden text-gold-soft">
      <Sparkles />
      <AnimatePresence mode="wait">
        {step === "landing" && <Landing key="landing" next={() => setStep("cake")} />}
        {step === "cake" && <CakeScene key="cake" next={() => setStep("gift")} />}
        {step === "gift" && <GiftScene key="gift" next={() => setStep("card")} />}
        {step === "card" && <CardScene key="card" next={() => setStep("album")} />}
        {step === "album" && <AlbumScene key="album" next={() => setStep("message")} />}
        {step === "message" && <MessageScene key="message" next={() => setStep("thanks")} />}
        {step === "thanks" && <ThanksScene key="thanks" restart={() => setStep("landing")} />}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Ambient sparkles ---------------- */

function Sparkles() {
  const dots = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {dots.map((_, i) => {
        const size = Math.random() * 3 + 1;
        return (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-[#f2dfa4]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: size,
              height: size,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: "0 0 6px rgba(232,197,106,0.8)",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- Reusable UI ---------------- */

function SceneWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-16"
    >
      {children}
    </motion.section>
  );
}

function GoldButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="font-sans-ui group relative overflow-hidden rounded-full border border-[#e8c56a]/60 px-8 py-3 text-sm tracking-[0.25em] text-gold transition hover:border-[#e8c56a] hover:shadow-[0_0_30px_rgba(232,197,106,0.35)]"
    >
      <span className="relative z-10 uppercase">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#e8c56a]/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}

/* ---------------- 1. Landing ---------------- */

function Landing({ next }: { next: () => void }) {
  return (
    <SceneWrap>
      <motion.img
        src={moonImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-4 top-8 h-40 w-40 opacity-70 mix-blend-screen sm:h-56 sm:w-56"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 1.6 }}
      />
      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif-display text-xs uppercase tracking-[0.4em] text-gold-soft/70"
        >
          A little surprise
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2 }}
          className="mt-8 font-serif-display text-5xl font-light leading-tight text-gold-soft sm:text-6xl"
        >
          Happy
          <br />
          <span className="italic">Birthday</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="font-script gold-gradient mt-4 text-7xl leading-none sm:text-8xl"
        >
          Rohini
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-6 flex items-center gap-3 text-gold"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e8c56a]" />
          <span>♡</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#e8c56a]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 1 }}
          className="mt-6 max-w-xs font-serif-display text-lg leading-relaxed text-gold-soft/80"
        >
          Someone special deserves a special day. Wishing you a day as beautiful as you are.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-10"
        >
          <GoldButton onClick={next}>Tap to Begin ✧</GoldButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6, y: [0, 8, 0] }}
          transition={{ delay: 3.4, duration: 2, repeat: Infinity }}
          className="mt-14 text-gold-soft/60"
        >
          ↓
        </motion.div>
      </div>
    </SceneWrap>
  );
}

/* ---------------- 2. Cake with candle to blow ---------------- */

function CakeScene({ next }: { next: () => void }) {
  const [blown, setBlown] = useState(false);
  const [listening, setListening] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // Auto-advance after blowing
  useEffect(() => {
    if (blown) {
      const t = setTimeout(next, 2200);
      return () => clearTimeout(t);
    }
  }, [blown, next]);

  const startMic = async () => {
    if (listening || blown) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      setListening(true);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        const avg = sum / data.length;
        if (avg > 55) {
          setBlown(true);
          stream.getTracks().forEach((t) => t.stop());
          ctx.close();
          return;
        }
        requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // permission denied — fallback tap-to-blow will still work
    }
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <SceneWrap>
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif-display text-xs uppercase tracking-[0.4em] text-gold-soft/70"
        >
          Make a Wish
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-script gold-gradient mt-3 text-5xl"
        >
          Blow the candle
        </motion.h2>

        <div className="relative mt-8 flex h-[420px] w-full items-end justify-center">
          {/* Ambient glow */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: blown ? 0 : [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 260,
              height: 260,
              background:
                "radial-gradient(circle, rgba(255,190,90,0.35) 0%, transparent 65%)",
              filter: "blur(10px)",
            }}
          />

          <img
            src={cakeImg}
            alt="Chocolate birthday cake"
            width={1024}
            height={1024}
            className="relative z-10 h-[360px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />

          {/* Flame overlay */}
          <AnimatePresence>
            {!blown && (
              <motion.div
                key="flame"
                exit={{ opacity: 0, scale: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute left-1/2 top-[10%] z-20 -translate-x-1/2"
              >
                <div className="flicker relative h-10 w-4">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 60%, #fff2b3 0%, #ffb347 40%, #ff7a1a 70%, transparent 100%)",
                      filter: "blur(1px)",
                      boxShadow:
                        "0 -6px 24px 6px rgba(255,180,80,0.7), 0 0 60px 20px rgba(255,140,40,0.25)",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smoke after blown */}
          <AnimatePresence>
            {blown && (
              <motion.div
                key="smoke"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.7, 0], y: -80 }}
                transition={{ duration: 2 }}
                className="absolute left-1/2 top-[22%] z-20 -translate-x-1/2 text-3xl text-gold-soft/50"
              >
                ˚༄
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {!blown ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <p className="font-serif-display text-base italic text-gold-soft/80">
                {listening ? "Listening… blow softly ✧" : "Blow into the mic — or tap the candle"}
              </p>
              <div className="flex gap-3">
                {!listening && (
                  <GoldButton onClick={startMic}>Use Mic to Blow</GoldButton>
                )}
                <GoldButton onClick={() => setBlown(true)}>Tap the Candle</GoldButton>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="wished"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-script gold-gradient mt-6 text-4xl"
            >
              Wish granted ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SceneWrap>
  );
}

/* ---------------- 3. Gift box appears ---------------- */

function GiftScene({ next }: { next: () => void }) {
  const [shaking, setShaking] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (shaking && !opened) {
      const t = setTimeout(() => setOpened(true), 800);
      return () => clearTimeout(t);
    }
  }, [shaking, opened]);

  useEffect(() => {
    if (opened) {
      const t = setTimeout(next, 2800);
      return () => clearTimeout(t);
    }
  }, [opened, next]);

  return (
    <SceneWrap>
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif-display text-xs uppercase tracking-[0.4em] text-gold-soft/70"
        >
          A Special Surprise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-script gold-gradient mt-3 text-5xl"
        >
          Just for you
        </motion.h2>

        <div className="relative mt-10 flex h-[380px] w-full items-center justify-center">
          <motion.div
            aria-hidden
            className="absolute inset-0 m-auto rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, rgba(232,197,106,0.4) 0%, transparent 65%)",
              filter: "blur(20px)",
            }}
          />

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.button
                key="closed"
                onClick={() => !shaking && setShaking(true)}
                initial={{ opacity: 0, scale: 0.4, y: 40 }}
                animate={
                  shaking
                    ? {
                        opacity: 1,
                        scale: [1, 1.05, 1.05, 1.05, 1.05],
                        x: [0, -12, 12, -10, 10, -8, 8, -4, 4, 0],
                        rotate: [0, -6, 6, -5, 5, -4, 4, -2, 2, 0],
                        y: 0,
                      }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                exit={{ opacity: 0, scale: 1.15 }}
                transition={
                  shaking
                    ? { duration: 0.8, ease: "easeInOut" }
                    : { type: "spring", stiffness: 120, damping: 14, duration: 1.2 }
                }
                whileHover={!shaking ? { scale: 1.05, rotate: -2 } : undefined}
                whileTap={!shaking ? { scale: 0.95 } : undefined}
                className={`relative z-10 cursor-pointer ${shaking ? "" : "drift"}`}
              >
                <img
                  src={giftboxImg}
                  alt="Elegant black gift box with gold ribbon"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-[320px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                />
              </motion.button>
            ) : (
              <motion.img
                key="opened"
                src={giftopenImg}
                alt="Gift box opening with golden sparks"
                width={1024}
                height={1024}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1.08, y: -6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative z-10 h-[360px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                loading="lazy"
              />
            )}
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 font-serif-display italic text-gold-soft/80"
        >
          {opened ? "Opening…" : shaking ? "Shaking…" : "Tap the gift box"}
        </motion.p>
      </div>
    </SceneWrap>
  );
}

/* ---------------- 4. Gift card with wishes ---------------- */

function CardScene({ next }: { next: () => void }) {
  return (
    <SceneWrap>
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif-display text-xs uppercase tracking-[0.4em] text-gold-soft/70"
        >
          A Little Note
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-script gold-gradient mt-3 text-5xl"
        >
          For you ♡
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, rotateX: -80, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative mt-10 w-full max-w-sm"
          style={{ perspective: 1200 }}
        >
          <div
            className="relative rounded-[6px] border border-[#e8c56a]/40 p-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={{
              background:
                "linear-gradient(160deg, rgba(20,10,4,0.95) 0%, rgba(35,20,8,0.95) 100%)",
            }}
          >
            {/* corner flourishes */}
            <span className="absolute left-3 top-3 text-gold/70">✦</span>
            <span className="absolute right-3 top-3 text-gold/70">✦</span>
            <span className="absolute bottom-3 left-3 text-gold/70">✦</span>
            <span className="absolute bottom-3 right-3 text-gold/70">✦</span>

            <p className="font-script gold-gradient text-center text-4xl">
              Happy Birthday
            </p>
            <p className="font-script gold-gradient mt-1 text-center text-3xl">
              Rohini
            </p>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-gold/60">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e8c56a]/70" />
              <span>♡</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#e8c56a]/70" />
            </div>

            <p className="mt-6 font-serif-display text-[17px] leading-relaxed text-gold-soft/90">
              May this year bring you endless happiness, beautiful moments, good
              health, and all the success your heart deserves. You are amazing
              just the way you are — keep believing in yourself and chasing your
              dreams. The best is yet to come.
            </p>
            <p className="mt-5 text-right font-script text-2xl text-gold">
              — with love
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-10"
        >
          <GoldButton onClick={next}>Next ✧</GoldButton>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

/* ---------------- 5. Photo album ---------------- */

function AlbumScene({ next }: { next: () => void }) {
  const photos = [
    { src: photo1, rot: -6, top: "0%", left: "8%" },
    { src: photo2, rot: 5, top: "6%", left: "52%" },
    { src: photo3, rot: -3, top: "42%", left: "4%" },
    { src: photo4, rot: 7, top: "48%", left: "48%" },
  ];

  return (
    <SceneWrap>
      <img
        src={lightsImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full object-cover opacity-70 mix-blend-screen"
        loading="lazy"
      />
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif-display text-xs uppercase tracking-[0.4em] text-gold-soft/70"
        >
          Some Beautiful
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-script gold-gradient mt-3 text-5xl"
        >
          Memories
        </motion.h2>

        <div className="relative mt-10 h-[560px] w-full max-w-sm">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotate: p.rot, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.25,
                duration: 0.9,
                type: "spring",
                stiffness: 90,
                damping: 14,
              }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
              className="absolute w-40 cursor-pointer"
              style={{ top: p.top, left: p.left }}
            >
              <div
                className="rounded-[2px] bg-[#f8ecd0] p-2 pb-8 shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                style={{
                  filter: "sepia(0.05)",
                }}
              >
                <img
                  src={p.src}
                  alt=""
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
              </div>
              {/* washi tape */}
              <span
                className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-[-4deg] rounded-sm"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(232,197,106,0.6), rgba(232,197,106,0.35))",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
            </motion.div>
          ))}
          {/* floral flourish */}
          <div className="absolute bottom-0 right-0 text-4xl text-gold/40">❦</div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-4 font-serif-display italic text-gold-soft/80"
        >
          Every moment with you is one I treasure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8"
        >
          <GoldButton onClick={next}>Continue ✧</GoldButton>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

/* ---------------- 6. Final message ---------------- */

function MessageScene({ next }: { next: () => void }) {
  return (
    <SceneWrap>
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif-display text-xs uppercase tracking-[0.4em] text-gold-soft/70"
        >
          You Deserve
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-script gold-gradient mt-3 text-5xl leading-tight"
        >
          All the happiness
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.5, duration: 1 },
            scale: { delay: 0.5, duration: 1 },
            y: { duration: 4, repeat: Infinity },
          }}
          className="relative mt-10"
        >
          <div className="text-8xl text-gold drop-shadow-[0_0_25px_rgba(232,197,106,0.5)]">
            ♡
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 font-serif-display text-lg leading-relaxed text-gold-soft/90"
        >
          Have a wonderful day and a fantastic year ahead. Keep smiling always.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="font-script gold-gradient mt-6 text-4xl"
        >
          Happy Birthday Rohini ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-10"
        >
          <GoldButton onClick={next}>Continue ✧</GoldButton>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

/* ---------------- 7. Thank you ---------------- */

function ThanksScene({ restart }: { restart: () => void }) {
  return (
    <SceneWrap>
      <Confetti />
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-script gold-gradient text-7xl"
        >
          Thank You!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-3xl text-gold"
        >
          ♡
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-6 font-serif-display text-lg text-gold-soft/90"
        >
          For being a part of my life.
          <br />
          You mean the world to me.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="rounded-full border border-[#e8c56a]/60 px-6 py-2 text-sm tracking-widest text-gold">
            Made with ♡
          </div>
          <button
            onClick={restart}
            className="font-sans-ui mt-4 text-xs uppercase tracking-[0.3em] text-gold-soft/60 hover:text-gold"
          >
            ↺ Watch again
          </button>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

function Confetti() {
  const bits = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const dur = 3 + Math.random() * 3;
        const size = 4 + Math.random() * 6;
        const colors = ["#e8c56a", "#f2dfa4", "#b8862f", "#ffd580"];
        const bg = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute -bottom-6 rounded-sm"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 1.6,
              background: bg,
              animation: `float-up ${dur}s linear ${delay}s infinite`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
