"use client";

import YouTube from "react-youtube";
import { useRef, useState } from "react";

const moves = [
  {
    title: "The Moonwalk",
    videoId: "xpN3GRFKb4w",
    start: 218,
    description: "El paso más icónico: deslizarse hacia atrás mientras parece caminar hacia adelante.",
    options: [
      "The Moonwalk",
      "The Robot",
      "The Cabbage Patch",
      "The Glide",
    ],
  },
  {
    title: "The Toe Stand",
    videoId: "xpN3GRFKb4w",
    start: 222,
    description: "Subirse en puntas de pie y quedar suspendido con perfecto equilibrio.",
    options: [
      "The Heel Pop",
      "The Freeze",
      "The Toe Stand",
      "The Tippy Toe",
    ],
  },
  {
    title: "The Crotch Grab",
    videoId: "xpN3GRFKb4w",
    start: 21,
    description: "Un movimiento de cadera acompañado del gesto con la mano que se convirtió en sello personal.",
    options: [
      "The Hip Thrust",
      "The Crotch Grab",
      "The Pelvic Lock",
      "The Smooth Move",
    ],
  },
  {
    title: "The Hat Tip",
    videoId: "xpN3GRFKb4w",
    start: 2,
    description: "Inclinar el sombrero fedora sobre los ojos con un solo dedo, lento y dramático.",
    options: [
      "The Fedora Dip",
      "The Shadow Play",
      "The Brim Touch",
      "The Hat Tip",
    ],
  },
  {
    title: "The Spin",
    videoId: "xpN3GRFKb4w",
    start: 213,
    description: "Giro de 360° perfectamente ejecutado, terminando en una pose congelada.",
    options: [
      "The Twirl",
      "The Spin",
      "The Pirouette",
      "The Whip Turn",
    ],
  },
  {
    title: "The Shoulder Pop",
    videoId: "xpN3GRFKb4w",
    start: 30,
    description: "Movimiento de hombros alternados con un ritmo preciso y staccato.",
    options: [
      "The Shoulder Roll",
      "The Body Wave",
      "The Shoulder Pop",
      "The Chest Lock",
    ],
  },
  {
    title: "The Kick-Ball-Change",
    videoId: "xpN3GRFKb4w",
    start: 228,
    description: "Secuencia de patada-apoyo-cambio de peso que conecta los pasos de la coreografía.",
    options: [
      "The Step Touch",
      "The Kick-Ball-Change",
      "The Shuffle",
      "The Footwork",
    ],
  },
  {
    title: "The Glove Shimmer",
    videoId: "xpN3GRFKb4w",
    start: 247,
    description: "Elevar lentamente la mano enguantada hacia la luz, dejando brillar el guante blanco.",
    options: [
      "The Glove Shimmer",
      "The Hand Wave",
      "The White Glove",
      "The Sparkle Move",
    ],
  },
  {
    title: "The Lean",
    videoId: "xpN3GRFKb4w",
    start: 264,
    description: "Inclinarse hacia adelante en un ángulo imposible desafiando la gravedad.",
    options: [
      "The Tilt",
      "The Gravity Defier",
      "The Lean",
      "The Forward Tip",
    ],
  },
  {
    title: "The Final Pose",
    videoId: "xpN3GRFKb4w",
    start: 288,
    description: "Extiende un brazo al cielo, inclina el sombrero, y se congela completamente mientras el público enloquece.",
    options: [
      "The Victory Stance",
      "The Final Pose",
      "The Power Freeze",
      "The Showstopper",
    ],
  },
];


export default function Page() {
  const [currentMove, setCurrentMove] = useState(0);
  const [result, setResult] = useState<"correct" | "wrong" | "">("");
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const playerRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const move = moves[currentMove];

  const playSnippet = () => {
    if (!playerRef.current || isPlaying) return;
    playerRef.current.seekTo(move.start);
    playerRef.current.playVideo();
    setIsPlaying(true);
    setHasPlayed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    }, 5000);
  };

  const checkAnswer = (answer: string) => {
    if (answered) return;
    setAnswered(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    playerRef.current?.pauseVideo();
    setIsPlaying(false);

    if (answer === move.title) {
      setResult("correct");
      setScore((prev) => prev + 1);
    } else {
      setResult("wrong");
    }

    setTimeout(() => {
      const next = currentMove + 1;
      if (next >= moves.length) {
        setGameOver(true);
      } else {
        setCurrentMove(next);
        setResult("");
        setAnswered(false);
      }
    }, 1800);
  };

  const restart = () => {
    setCurrentMove(0);
    setScore(0);
    setResult("");
    setAnswered(false);
    setGameOver(false);
    setIsPlaying(false);
    setHasPlayed(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f0ece4",
        fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,220,100,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Scanlines */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.4,
        }}
      />

      {/* Single YouTube player — always mounted, visibility toggled via CSS */}

      {gameOver ? (
        /* GAME OVER SCREEN */
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "clamp(3rem,12vw,8rem)", lineHeight: 1, letterSpacing: "0.05em", color: "#f0ece4" }}>
            FIN
          </div>
          <div
            style={{
              fontSize: "clamp(3rem,12vw,8rem)",
              lineHeight: 1,
              letterSpacing: "0.05em",
              color: "#ffd700",
              textShadow: "0 0 40px rgba(255,215,0,0.5)",
            }}
          >
            DEL JUEGO
          </div>
          <div
            style={{
              margin: "2rem 0",
              fontSize: "clamp(1.2rem,4vw,2rem)",
              letterSpacing: "0.2em",
              color: "#888",
            }}
          >
            PUNTUACION FINAL
          </div>
          <div
            style={{
              fontSize: "clamp(4rem,16vw,10rem)",
              lineHeight: 1,
              color: score === moves.length ? "#ffd700" : "#f0ece4",
              textShadow: score === moves.length ? "0 0 60px rgba(255,215,0,0.6)" : "none",
            }}
          >
            {score}
            <span style={{ fontSize: "0.4em", color: "#555" }}>/{moves.length}</span>
          </div>
          {score === moves.length && (
            <div style={{ margin: "1rem 0", fontSize: "clamp(1rem,3vw,1.5rem)", color: "#ffd700", letterSpacing: "0.15em" }}>
              ★ PERFECTO — ERES EL REY DEL POP ★
            </div>
          )}
          <button
            onClick={restart}
            style={{
              marginTop: "2.5rem",
              padding: "1rem 3rem",
              fontSize: "clamp(1.2rem,3vw,1.8rem)",
              letterSpacing: "0.2em",
              background: "transparent",
              color: "#f0ece4",
              border: "2px solid #f0ece4",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "#f0ece4";
              (e.target as HTMLButtonElement).style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "transparent";
              (e.target as HTMLButtonElement).style.color = "#f0ece4";
            }}
          >
            JUGAR DE NUEVO
          </button>
        </div>
      ) : (
        /* MAIN GAME */
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1100px", margin: "0 auto", padding: "1.5rem 1.5rem 3rem" }}>

          {/* Header */}
          <header style={{ textAlign: "center", paddingTop: "1rem" }}>
            <div style={{ fontSize: "clamp(0.6rem,1.2vw,0.8rem)", letterSpacing: "0.4em", color: "#555", marginBottom: "0.3rem" }}>
              MOTOWN 25 · 1983
            </div>
            <h1
              style={{
                fontSize: "clamp(1.8rem,6vw,4rem)",
                lineHeight: 1,
                letterSpacing: "0.06em",
                margin: 0,
                color: "#f0ece4",
              }}
            >
              BILLIE JEAN
            </h1>
            <div
              style={{
                fontSize: "clamp(0.85rem,2.5vw,1.4rem)",
                letterSpacing: "0.3em",
                color: "#ffd700",
                marginTop: "0.2rem",
              }}
            >
              DANCE QUIZ
            </div>

            {/* Score bar */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.2rem",
              }}
            >
              <div style={{ fontSize: "clamp(0.65rem,1.5vw,0.9rem)", letterSpacing: "0.3em", color: "#555" }}>
                MOVE {currentMove + 1}/{moves.length}
              </div>
              <div style={{ width: "140px", height: "2px", background: "#1a1a1a", borderRadius: "2px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(currentMove / moves.length) * 100}%`,
                    background: "#ffd700",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div style={{ fontSize: "clamp(0.65rem,1.5vw,0.9rem)", letterSpacing: "0.3em", color: "#ffd700" }}>
                {score} PTS
              </div>
            </div>
          </header>

          {/* Main content: video left, controls right */}
          <div
            style={{
              marginTop: "1.5rem",
              display: "grid",
              gridTemplateColumns: hasPlayed ? "1fr 1fr" : "1fr",
              gap: "1.5rem",
              alignItems: "start",
            }}
          >
            {/* LEFT — Video (always mounted, hidden before first play) + Play button */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                {/* Hint text */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "clamp(0.75rem,1.5vw,0.95rem)",
                  letterSpacing: "0.06em",
                  color: "#555",
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  maxWidth: "480px",
                }}
              >
                {move.description}
              </div>
              {/* Video container — always in DOM, just invisible before first play */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#0d0d0d",
                  border: "1px solid #1e1e1e",
                  borderRadius: "4px",
                  overflow: "hidden",
                  visibility: hasPlayed ? "visible" : "hidden",
                  height: hasPlayed ? "auto" : "0px",
                  position: "relative",
                }}
              >
                <YouTube
                  videoId={move.videoId}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0 },
                  }}
                  style={{ width: "100%", height: "100%", display: "block" }}
                  onReady={(e) => { playerRef.current = e.target; }}
                />
                
              </div>

              {/* texto de bienvenida*/}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "clamp(0.75rem,1.5vw,0.95rem)",
                  letterSpacing: "0.06em",
                  color: "#555",
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  maxWidth: "480px",
                }}
              >
                Presione el botón para continuar
              </div>

              {/* Play button */}
              <button
                onClick={playSnippet}
                disabled={isPlaying}
                style={{
                  padding: "0.85rem 2.5rem",
                  borderRadius: "2px",
                  background: isPlaying ? "#1a1a1a" : "#f0ece4",
                  color: isPlaying ? "#555" : "#0a0a0a",
                  fontSize: "clamp(0.9rem,2vw,1.2rem)",
                  letterSpacing: "0.25em",
                  border: isPlaying ? "1px solid #2a2a2a" : "none",
                  cursor: isPlaying ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  boxShadow: isPlaying ? "none" : "0 0 40px rgba(240,236,228,0.12)",
                  fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                  width: "100%",
                  maxWidth: "280px",
                }}
              >
                {isPlaying ? "▶ PLAYING..." : hasPlayed ? "▶ REPLAY" : "▶ PLAY"}
              </button>
            </div>

            {/* RIGHT — Options + result (only visible after first play) */}
            {hasPlayed && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div
                  style={{
                    fontSize: "clamp(0.6rem,1.2vw,0.75rem)",
                    letterSpacing: "0.35em",
                    color: "#444",
                    marginBottom: "0.25rem",
                  }}
                >
                  ¿CUÁL ES ESTE PASO?
                </div>

                {move.options.map((option, i) => {
                  const letters = ["A", "B", "C", "D"];
                  const isCorrect = answered && option === move.title;

                  return (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      disabled={answered}
                      style={{
                        padding: "clamp(0.75rem,2vw,1.1rem) clamp(1rem,2.5vw,1.5rem)",
                        background: isCorrect ? "rgba(255,215,0,0.08)" : "#111",
                        border: isCorrect ? "1px solid #ffd700" : "1px solid #1e1e1e",
                        color: isCorrect ? "#ffd700" : "#f0ece4",
                        fontSize: "clamp(0.8rem,1.8vw,1.05rem)",
                        letterSpacing: "0.1em",
                        textAlign: "left",
                        cursor: answered ? "default" : "pointer",
                        transition: "all 0.15s",
                        opacity: answered && !isCorrect ? 0.3 : 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.9rem",
                        fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                        borderRadius: "2px",
                      }}
                      onMouseEnter={(e) => {
                        if (!answered) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "#f0ece4";
                          (e.currentTarget as HTMLButtonElement).style.background = "#181818";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!answered) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "#1e1e1e";
                          (e.currentTarget as HTMLButtonElement).style.background = "#111";
                        }
                      }}
                    >
                      <span style={{ fontSize: "0.7em", color: isCorrect ? "#ffd700" : "#333", minWidth: "1.4em", letterSpacing: "0.1em" }}>
                        {letters[i]}
                      </span>
                      {option}
                    </button>
                  );
                })}

                {/* Result feedback */}
                {result && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "clamp(1.2rem,4vw,2.5rem)",
                      letterSpacing: "0.15em",
                      color: result === "correct" ? "#ffd700" : "#cc3333",
                      textShadow: result === "correct" ? "0 0 30px rgba(255,215,0,0.4)" : "0 0 30px rgba(204,51,51,0.4)",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    {result === "correct" ? "★ CORRECTO" : "✕ INCORRECTO"}
                    <div style={{ fontSize: "0.35em", color: "#555", letterSpacing: "0.25em", marginTop: "0.3em" }}>
                      {result === "wrong" ? `ERA: ${move.title.toUpperCase()}` : move.title.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        button:focus { outline: none; }
      `}</style>
    </main>
  );
}