import React, { useEffect, useState } from "react";
import { Fireworks } from "fireworks-js";
import { useSearchParams } from "react-router-dom";

export const Celebration = () => {
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
          min: 48, // Even more centered launch points
          max: 52,
        },
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 2, // Much longer delay between launches
          max: 4, // Occasional longer delays
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
        acceleration: 1.01, // Even gentler acceleration
        friction: 0.97,
        gravity: 1.5,
        particles: 60, // More particles per explosion for better impact
        traceLength: 3,
        flickering: 25,
        opacity: 0.8, // Higher opacity for better visibility
        explosion: 10, // Larger explosions since they're less frequent
        intensity: 2, // Drastically reduced intensity
        traceSpeed: 8,
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
          max: 1, // Only one mouse-triggered firework at a time
        },
        sound: {
          enabled: true,
          files: ["/sounds/explosion0.mp3", "/sounds/explosion1.mp3"],
          volume: { min: 4, max: 8 },
        },
      });
      fireworks.start();
      return () => fireworks.stop();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 to-black overflow-hidden">
      {/* Fireworks container - now positioned absolutely with full viewport dimensions */}
      <div className="absolute inset-0">
        <canvas id="fireworks-example" className="w-full h-full" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center w-full h-full pt-20 px-4">
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
    </div>
  );
};
