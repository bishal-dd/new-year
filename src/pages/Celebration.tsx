import React, { useEffect, useState } from "react";
import { Fireworks } from "fireworks-js";
import { useSearchParams } from "react-router-dom";

export const Celebration: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showMessage, setShowMessage] = useState(false);
  const name = searchParams.get("name");
  const message = searchParams.get("message");
  const handleUserInteraction = () => {
    setShowMessage(true);
  };
  useEffect(() => {
    const container = document.querySelector("#fireworks-example");
    if (container) {
      const fireworks = new Fireworks(container, {
        rocketsPoint: {
          min: 10,
          max: 20,
        },
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 0.015,
          max: 0.03,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3,
          },
          trace: {
            min: 1,
            max: 2,
          },
        },
        lineStyle: "round",
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 20,
        traceLength: 3,
        flickering: 50,
        opacity: 0.5,
        explosion: 5,
        intensity: 20,
        traceSpeed: 10,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
        mouse: {
          click: true,
          move: false,
          max: 0,
        },
        boundaries: {
          x: 50,
          y: 50,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        sound: {
          enabled: true,
          files: ["/sounds/explosion0.mp3", "/sounds/explosion1.mp3"],
          volume: { min: 4, max: 8 },
        },
      });

      fireworks.start();

      // Cleanup fireworks on component unmount
      return () => {
        fireworks.stop();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black relative overflow-hidden flex flex-col items-center ">
      {/* Fireworks Canvas */}

      {/* Celebration Content */}
      <div className="relative z-10 flex flex-col items-center text-center  w-full h-full mt-20 px-4">
        <div>
          <h1 className="text-6xl font-bold text-white mb-8 animate-bounce">
            Happy New Year!
          </h1>
          {!showMessage ? (
            <button
              onClick={handleUserInteraction}
              className="px-4 py-2 bg-yellow-500 text-white animate-pulse rounded-lg z-20"
            >
              Show Message
            </button>
          ) : (
            (name || message) && (
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-lg">
                {name && (
                  <p className="text-xl text-yellow-400 mb-4 font-bold">
                    {name}
                  </p>
                )}
                {message && (
                  <p className="text-white text-lg leading-relaxed">
                    {message}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div className="relative flex flex-col items-center w-full h-full  px-4">
        <div id="fireworks-example"></div>
      </div>
    </div>
  );
};

export default Celebration;
