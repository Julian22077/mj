"use client";

import { useMemo, useState } from "react";

type Stats = {
  fame: number;
  health: number;
  stress: number;
  money: number;
  happiness: number;
};

type Choice = {
  text: string;
  effect: Partial<Stats>;
  result: string;
};

type Scenario = {
  year: number;
  title: string;
  description: string;
  choices: Choice[];
};

const scenarios: Scenario[] = [
  {
    year: 1968,
    title: "Primeros pasos",
    description:
      "Eres un niño con muchísimo talento. Tu familia quiere que practiques música todos los días.",
    choices: [
      {
        text: "Practicar constantemente",
        effect: {
          fame: 5,
          stress: 5,
          happiness: -3,
        },
        result:
          "Tu talento comenzó a destacar rápidamente.",
      },
      {
        text: "Equilibrar música y niñez",
        effect: {
          happiness: 8,
          stress: -2,
        },
        result:
          "Disfrutaste más tu infancia mientras aprendías música.",
      },
    ],
  },

  {
    year: 1972,
    title: "Primer éxito",
    description:
      "Tu grupo empieza a ganar popularidad y aparecen oportunidades de viajar constantemente.",
    choices: [
      {
        text: "Aceptar todos los shows",
        effect: {
          fame: 10,
          money: 8,
          stress: 5,
          health: -2,
        },
        result:
          "La fama comenzó a crecer en todo el país.",
      },
      {
        text: "Limitar las presentaciones",
        effect: {
          happiness: 5,
          stress: -2,
        },
        result:
          "Tuviste más tiempo para descansar y disfrutar.",
      },
    ],
  },

  {
    year: 1979,
    title: "Nueva identidad artística",
    description:
      "Quieres cambiar tu estilo musical y experimentar como artista solista.",
    choices: [
      {
        text: "Innovar completamente",
        effect: {
          fame: 15,
          stress: 8,
        },
        result:
          "Tu sonido revolucionó la música pop.",
      },
      {
        text: "Mantener un estilo seguro",
        effect: {
          money: 5,
          stress: -2,
        },
        result:
          "Tu carrera siguió estable, aunque menos innovadora.",
      },
    ],
  },

  {
    year: 1983,
    title: "Explosión mundial",
    description:
      "Tu popularidad se dispara y las productoras quieren una gira gigantesca.",
    choices: [
      {
        text: "Aceptar la gira completa",
        effect: {
          fame: 20,
          money: 20,
          stress: 15,
          health: -10,
        },
        result:
          "Te convertiste en una superestrella mundial.",
      },
      {
        text: "Reducir conciertos",
        effect: {
          health: 8,
          stress: -5,
          fame: 5,
        },
        result:
          "Mantener equilibrio ayudó a tu bienestar.",
      },
    ],
  },

  {
    year: 1985,
    title: "Vida personal",
    description:
      "La fama hace difícil tener amistades reales y privacidad.",
    choices: [
      {
        text: "Aislarte del mundo",
        effect: {
          stress: 10,
          happiness: -10,
        },
        result:
          "La soledad empezó a afectar tu vida emocional.",
      },
      {
        text: "Buscar apoyo emocional",
        effect: {
          happiness: 10,
          stress: -5,
        },
        result:
          "Tener personas cercanas mejoró tu estabilidad.",
      },
    ],
  },

  {
    year: 1988,
    title: "Perfeccionismo extremo",
    description:
      "Quieres que cada videoclip y presentación sea perfecta.",
    choices: [
      {
        text: "Trabajar día y noche",
        effect: {
          fame: 10,
          stress: 15,
          health: -10,
        },
        result:
          "Tus producciones fueron históricas, pero agotadoras.",
      },
      {
        text: "Delegar parte del trabajo",
        effect: {
          stress: -5,
          health: 5,
        },
        result:
          "Aprendiste a manejar mejor la presión.",
      },
    ],
  },

  {
    year: 1992,
    title: "Nueva gira mundial",
    description:
      "Tus fans esperan conciertos enormes en múltiples países.",
    choices: [
      {
        text: "Hacer la gira completa",
        effect: {
          fame: 15,
          money: 15,
          stress: 15,
          health: -10,
        },
        result:
          "La gira fue un fenómeno mundial.",
      },
      {
        text: "Reducir fechas y descansar",
        effect: {
          health: 10,
          happiness: 5,
          fame: -3,
        },
        result:
          "Tu cuerpo logró recuperarse mejor.",
      },
    ],
  },

  {
    year: 1995,
    title: "Presión mediática",
    description:
      "Los medios analizan cada aspecto de tu vida personal.",
    choices: [
      {
        text: "Responder públicamente",
        effect: {
          stress: 10,
          fame: 5,
        },
        result:
          "La atención pública aumentó aún más.",
      },
      {
        text: "Alejarte de los medios",
        effect: {
          happiness: 5,
          stress: -10,
        },
        result:
          "La tranquilidad mejoró tu bienestar emocional.",
      },
    ],
  },

  {
    year: 2001,
    title: "Regreso musical",
    description:
      "Tienes la oportunidad de lanzar un nuevo gran proyecto.",
    choices: [
      {
        text: "Hacer un regreso masivo",
        effect: {
          fame: 15,
          money: 15,
          stress: 10,
        },
        result:
          "El regreso emocionó al mundo entero.",
      },
      {
        text: "Trabajar a un ritmo moderado",
        effect: {
          health: 8,
          happiness: 8,
          stress: -5,
        },
        result:
          "Encontraste un mejor balance personal.",
      },
    ],
  },

  {
    year: 2008,
    title: "Última gran decisión",
    description:
      "Te ofrecen una enorme serie de conciertos de regreso.",
    choices: [
      {
        text: "Aceptar todos los conciertos",
        effect: {
          fame: 20,
          money: 20,
          stress: 25,
          health: -20,
        },
        result:
          "La preparación fue extremadamente agotadora.",
      },
      {
        text: "Limitar el número de shows",
        effect: {
          health: 15,
          stress: -10,
          happiness: 10,
        },
        result:
          "Priorizaste tu bienestar y estabilidad.",
      },
    ],
  },
];

const initialStats: Stats = {
  fame: 10,
  health: 80,
  stress: 10,
  money: 10,
  happiness: 70,
};

export default function Page() {
  const [step, setStep] = useState(0);
  const [stats, setStats] = useState(initialStats);
  const [history, setHistory] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const currentScenario = scenarios[step];

  const ending = useMemo(() => {
    if (stats.health <= 20) {
      return "El exceso de presión y trabajo afectó gravemente tu vida.";
    }

    if (stats.happiness >= 80 && stats.health >= 60) {
      return "Lograste equilibrar fama, salud y felicidad.";
    }

    if (stats.fame >= 100) {
      return "Te convertiste en una leyenda mundial.";
    }

    if (stats.stress >= 90) {
      return "La presión mediática dominó gran parte de tu vida.";
    }

    return "Tu historia quedó marcada por decisiones difíciles.";
  }, [stats]);

  const handleChoice = (choice: Choice) => {
    const updatedStats = {
      fame: stats.fame + (choice.effect.fame || 0),
      health: stats.health + (choice.effect.health || 0),
      stress: stats.stress + (choice.effect.stress || 0),
      money: stats.money + (choice.effect.money || 0),
      happiness: stats.happiness + (choice.effect.happiness || 0),
    };

    setStats(updatedStats);

    setHistory((prev) => [
      ...prev,
      `${currentScenario.year}: ${choice.result}`,
    ]);

    if (step + 1 >= scenarios.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setStats(initialStats);
    setHistory([]);
    setFinished(false);
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            MJ Alternate Timeline
          </h1>

          <p className="text-zinc-400 mt-3 text-sm sm:text-base lg:text-lg max-w-2xl">
            Cada decisión cambia la historia de una superestrella.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8 sm:mb-10">
          <StatCard title="Fama" value={stats.fame} />
          <StatCard title="Salud" value={stats.health} />
          <StatCard title="Estrés" value={stats.stress} />
          <StatCard title="Dinero" value={stats.money} />
          <StatCard title="Felicidad" value={stats.happiness} />
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-2xl">
          {!finished ? (
            <>
              <div className="mb-8">
                <p className="text-zinc-500 text-xs sm:text-sm mb-2">
                  Año {currentScenario.year}
                </p>

                <h2 className="text-2xl sm:text-4xl font-bold mb-4 leading-tight">
                  {currentScenario.title}
                </h2>

                <p className="text-zinc-300 text-sm sm:text-lg leading-relaxed">
                  {currentScenario.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {currentScenario.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="
                      w-full
                      bg-white
                      text-black
                      p-4 sm:p-5
                      rounded-2xl
                      text-left
                      font-medium
                      text-sm sm:text-base
                      hover:scale-[1.01]
                      active:scale-[0.99]
                      transition-all
                    "
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Final de tu historia
              </h2>

              <p className="text-zinc-300 text-base sm:text-xl mb-8 sm:mb-10 leading-relaxed">
                {ending}
              </p>

              <div className="space-y-4 mb-8 sm:mb-10 max-h-[400px] overflow-y-auto pr-1">
                {history.map((event, index) => (
                  <div
                    key={index}
                    className="
                      bg-zinc-950
                      border
                      border-zinc-800
                      rounded-2xl
                      p-4
                      text-sm sm:text-base
                    "
                  >
                    {event}
                  </div>
                ))}
              </div>

              <button
                onClick={restart}
                className="
                  w-full sm:w-auto
                  bg-white
                  text-black
                  px-6 sm:px-8
                  py-4
                  rounded-2xl
                  font-bold
                  text-sm sm:text-base
                  hover:scale-105
                  active:scale-95
                  transition-all
                "
              >
                Reiniciar historia
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5">
      <p className="text-zinc-400 text-xs sm:text-sm mb-3">
        {title}
      </p>

      <div className="flex items-center gap-3">
        <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-500"
            style={{
              width: `${Math.max(0, Math.min(value, 100))}%`,
            }}
          />
        </div>

        <span className="font-bold text-sm sm:text-base min-w-[40px] text-right">
          {value}
        </span>
      </div>
    </div>
  );
}