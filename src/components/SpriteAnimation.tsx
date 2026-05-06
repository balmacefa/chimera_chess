import React from 'react';

type AnimationState = 'idle' | 'ataque' | 'muerte' | 'victoria';

interface SpriteAnimationProps {
  state: AnimationState;
}

export default function SpriteAnimation({ state }: SpriteAnimationProps) {
  // Configuración de los estados de la animación.
  // En un caso real, estas clases apuntarían a un spritesheet usando
  // background-image y una animación CSS steps()
  const stateConfig = {
    idle: {
      bgClass: 'bg-amber-600/20',
      borderClass: 'border-amber-600/50',
      icon: '🛡️', // Placeholder
    },
    ataque: {
      bgClass: 'bg-red-600/20',
      borderClass: 'border-red-600/50',
      icon: '⚔️', // Placeholder
    },
    muerte: {
      bgClass: 'bg-neutral-600/20',
      borderClass: 'border-neutral-600/50',
      icon: '☠️', // Placeholder
    },
    victoria: {
      bgClass: 'bg-yellow-500/20',
      borderClass: 'border-yellow-500/50',
      icon: '🏆', // Placeholder
    }
  };

  const config = stateConfig[state];

  return (
    <div
      className={`w-24 h-24 rounded-md border-2 flex items-center justify-center text-4xl shadow-inner ${config.bgClass} ${config.borderClass}`}
      title={`Sprite para estado: ${state}`}
    >
      {/*
        NOTA: Para implementar el spritesheet real, se reemplazaría este div/contenido
        con algo como:
        <div className={`sprite-sheet state-${state}`}></div>
        Donde el CSS tendría algo como:
        .sprite-sheet {
          width: 64px; height: 64px;
          background-image: url('/assets/spritesheet.png');
        }
        .state-idle {
          animation: play-idle 1s steps(4) infinite;
          background-position: 0 0;
        }
        @keyframes play-idle {
          100% { background-position: -256px 0; }
        }
      */}
      <span className="animate-pulse">{config.icon}</span>
    </div>
  );
}
