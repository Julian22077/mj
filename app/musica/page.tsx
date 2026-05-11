"use client";

import YouTube from "react-youtube";
import { useRef, useState } from "react";

const songs = [
  // MUY conocidas
  {
    title: "Billie Jean",
    videoId: "Zi_XLOBDo_Y",
    start: 42,
    options: [
      "Thriller",
      "Billie Jean",
      "Beat It",
      "Bad",
    ],
  },

  {
    title: "Beat It",
    videoId: "oRdxUFDoQe0",
    start: 30,
    options: [
      "Dangerous",
      "Beat It",
      "Smooth Criminal",
      "Black Or White",
    ],
  },

  {
    title: "Thriller",
    videoId: "sOnqjkJTMaA",
    start: 52,
    options: [
      "Ghosts",
      "Thriller",
      "Blood On The Dance Floor",
      "Bad",
    ],
  },

  {
    title: "Smooth Criminal",
    videoId: "h_D3VFfhvs4",
    start: 25,
    options: [
      "Dangerous",
      "Jam",
      "Smooth Criminal",
      "Remember The Time",
    ],
  },

  // Conocidas
  {
    title: "Black Or White",
    videoId: "F2AitTPI5U0",
    start: 40,
    options: [
      "Black Or White",
      "Beat It",
      "Earth Song",
      "Scream",
    ],
  },

  {
    title: "Remember The Time",
    videoId: "LeiFF0gvqcc",
    start: 34,
    options: [
      "Remember The Time",
      "Human Nature",
      "Liberian Girl",
      "Heal The World",
    ],
  },

  {
    title: "Man In The Mirror",
    videoId: "PivWY9wn5ps",
    start: 58,
    options: [
      "You Rock My World",
      "Man In The Mirror",
      "Butterflies",
      "Stranger In Moscow",
    ],
  },

  {
    title: "Bad",
    videoId: "dsUXAEzaC3Q",
    start: 45,
    options: [
      "Bad",
      "Dangerous",
      "Ghosts",
      "Dirty Diana",
    ],
  },

  // Medio conocidas
  {
    title: "Dirty Diana",
    videoId: "yUi_S6YWjZw",
    start: 38,
    options: [
      "Dirty Diana",
      "Beat It",
      "Give In To Me",
      "Who Is It",
    ],
  },

  {
    title: "Who Is It",
    videoId: "PfrV_6yWbEg",
    start: 50,
    options: [
      "Who Is It",
      "In The Closet",
      "Jam",
      "Morphine",
    ],
  },

  {
    title: "Jam",
    videoId: "JbHI1yI1Ndk",
    start: 44,
    options: [
      "Dangerous",
      "Jam",
      "Scream",
      "2 Bad",
    ],
  },

  {
    title: "You Rock My World",
    videoId: "1-7ABIM2qjU",
    start: 35,
    options: [
      "Butterflies",
      "You Rock My World",
      "Heaven Can Wait",
      "Break Of Dawn",
    ],
  },

  // Poco conocidas
  {
    title: "Stranger In Moscow",
    videoId: "pEEMi2j6lYE",
    start: 40,
    options: [
      "Earth Song",
      "Stranger In Moscow",
      "Childhood",
      "Smile",
    ],
  },

  {
    title: "Morphine",
    videoId: "K_G5DLYRz6M",
    start: 28,
    options: [
      "Ghosts",
      "Morphine",
      "Is It Scary",
      "2 Bad",
    ],
  },

  {
    title: "Ghosts",
    videoId: "Xh9Cp4rd7mI",
    start: 60,
    options: [
      "Ghosts",
      "Thriller",
      "Blood On The Dance Floor",
      "Dangerous",
    ],
  },

  {
    title: "Butterflies",
    videoId: "Y-9NafEKg_Q",
    start: 36,
    options: [
      "Butterflies",
      "Break Of Dawn",
      "Speechless",
      "Human Nature",
    ],
  },

  {
    title: "Heaven Can Wait",
    videoId: "TDVlDUAIz5k",
    start: 48,
    options: [
      "You Are Not Alone",
      "Heaven Can Wait",
      "Butterflies",
      "Speechless",
    ],
  },

  {
    title: "Break Of Dawn",
    videoId: "Yu61cMofR8c",
    start: 50,
    options: [
      "Break Of Dawn",
      "Heaven Can Wait",
      "Butterflies",
      "Whatever Happens",
    ],
  },
];

export default function Page() {
  const [currentSong, setCurrentSong] =
    useState(0);

  const [result, setResult] =
    useState("");

  const [score, setScore] =
    useState(0);

  const playerRef = useRef<any>(null);

  const song = songs[currentSong];

  const playSnippet = () => {
    if (!playerRef.current) return;

    playerRef.current.seekTo(song.start);

    playerRef.current.playVideo();

    setTimeout(() => {
      playerRef.current.pauseVideo();
    }, 6000);
  };

  const checkAnswer = (answer: string) => {
    if (answer === song.title) {
      setResult("CORRECT!");

      setScore((prev) => prev + 1);

      setTimeout(() => {
        const next =
          (currentSong + 1) %
          songs.length;

        setCurrentSong(next);

        setResult("");
      }, 1500);
    } else {
      setResult("WRONG SONG");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />

      {/* Header */}
      <section className="relative z-10 px-4 pt-10 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4">
          GUESS THE MJ SONG
        </h1>

        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-lg">
          Escucha el fragmento y adivina
          la canción correcta.
        </p>

        <div className="mt-6 text-xl sm:text-2xl font-black">
          SCORE: {score}
        </div>
      </section>

      {/* Youtube hidden */}
      <div className="opacity-0 absolute pointer-events-none">
        <YouTube
          videoId={song.videoId}
          opts={{
            width: "0",
            height: "0",
            playerVars: {
              autoplay: 0,
            },
          }}
          onReady={(event) => {
            playerRef.current =
              event.target;
          }}
        />
      </div>

      {/* Play Button */}
      <section className="relative z-10 mt-16 sm:mt-20 flex justify-center px-4">
        <button
          onClick={playSnippet}
          className="
            w-40
            h-40
            sm:w-52
            sm:h-52
            rounded-full
            bg-white
            text-black
            text-2xl
            sm:text-4xl
            font-black
            hover:scale-105
            active:scale-95
            transition
            shadow-[0_0_80px_rgba(255,255,255,0.25)]
          "
        >
          PLAY
        </button>
      </section>

      {/* Answers */}
      <section className="relative z-10 mt-16 px-4 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {song.options.map((option) => (
            <button
              key={option}
              onClick={() =>
                checkAnswer(option)
              }
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-3xl
                p-5
                sm:p-7
                text-lg
                sm:text-2xl
                font-black
                hover:border-white
                hover:scale-[1.02]
                active:scale-[0.98]
                transition
              "
            >
              {option}
            </button>
          ))}
        </div>

        {/* Result */}
        {result && (
          <div
            className={`
              mt-10
              text-center
              text-3xl
              sm:text-5xl
              font-black

              ${
                result === "CORRECT!"
                  ? "text-green-400"
                  : "text-red-400"
              }
            `}
          >
            {result}
          </div>
        )}

        {/* Song counter */}
        <div className="mt-12 text-center text-zinc-500 text-sm sm:text-base">
          Song {currentSong + 1} /{" "}
          {songs.length}
        </div>
      </section>
    </main>
  );
}