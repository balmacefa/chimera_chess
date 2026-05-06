import React from 'react';

type AnimationState = 'idle' | 'ataque' | 'muerte' | 'victoria';

interface SpriteAnimationProps {
  state: AnimationState;
}

export default function SpriteAnimation({ state }: SpriteAnimationProps) {
  // These configurations define how to read the placeholder spritesheet.
  // The placeholder image is a 256x256 image with 4 rows (states) and 4 columns (frames).
  // Each frame is 64x64.
  const stateConfig: Record<string, { rowOffset: number; frames: number; speed: string; fillMode?: string }> = {
    idle: { rowOffset: 0, frames: 4, speed: '1s' },
    ataque: { rowOffset: -64, frames: 4, speed: '0.6s' },
    muerte: { rowOffset: -128, frames: 4, speed: '1.5s', fillMode: 'forwards' }, // stay dead
    victoria: { rowOffset: -192, frames: 4, speed: '0.8s' }
  };

  const config = stateConfig[state];

  // A tiny 256x256 placeholder spritesheet encoded in base64.
  // It has colored blocks with frame numbers to prove the CSS steps() animation works.
  const placeholderSpritesheetBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+CiAgPCEtLSBJZGxlIChBcm1hcy9Fc2N1ZG8gLSBBbWJlciIgLS0+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZDU5MDRmIi8+PHRleHQgeD0iMzIiIHk9IjM2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+STE8L3RleHQ+CiAgPHJlY3QgeD0iNjQiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI2I0NTMwNiIvPjx0ZXh0IHg9Ijk2IiB5PSIzNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkkyPC90ZXh0PgogIDxyZWN0IHg9IjEyOCIgeT0iMCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOTI0MDA0Ii8+PHRleHQgeD0iMTYwIiB5PSIzNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkkzPC90ZXh0PgogIDxyZWN0IHg9IjE5MiIgeT0iMCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjYjQ1MzA2Ii8+PHRleHQgeD0iMjI0IiB5PSIzNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkk0PC90ZXh0PgoKICA8IS0tIEF0YXF1ZSAoUmVkKSAtLT4KICA8cmVjdCB4PSIwIiB5PSI2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZmM4MTgxIi8+PHRleHQgeD0iMzIiIHk9IjEwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkExPC90ZXh0PgogIDxyZWN0IHg9IjY0IiB5PSI2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZTUzZTNlIi8+PHRleHQgeD0iOTYiIHk9IjEwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkEyPC90ZXh0PgogIDxyZWN0IHg9IjEyOCIgeT0iNjQiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI2M1MzAzMCIvPjx0ZXh0IHg9IjE2MCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QTM8L3RleHQ+CiAgPHJlY3QgeD0iMTkyIiB5PSI2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOTIzMjI4Ii8+PHRleHQgeD0iMjI0IiB5PSIxMDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BNDwvdGV4dD4KCgogIDwhLS0gTXVlcnRlIChHcmF5KSAtLT4KICA8cmVjdCB4PSIwIiB5PSIxMjgiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI2EwYWVjMCIvPjx0ZXh0IHg9IjMyIiB5PSIxNjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NMTwvdGV4dD4KICA8cmVjdCB4PSI2NCIgeT0iMTI4IiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiM3MTgwOTYiLz48dGV4dCB4PSI5NiIgeT0iMTY0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TTI8L3RleHQ+CiAgPHJlY3QgeD0iMTI4IiB5PSIxMjgiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iIzRhNTU2OCIvPjx0ZXh0IHg9IjE2MCIgeT0iMTY0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TTM8L3RleHQ+CiAgPHJlY3QgeD0iMTkyIiB5PSIxMjgiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iIzJkMzc0OCIvPjx0ZXh0IHg9IjIyNCIgeT0iMTY0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TTQ8L3RleHQ+CgogIDwhLS0gVmljdG9yaWEgKEdvbGQpIC0tPgogIDxyZWN0IHg9IjAiIHk9IjE5MiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZmFkMDJjIi8+PHRleHQgeD0iMzIiIHk9IjIyOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlYxPC90ZXh0PgogIDxyZWN0IHg9IjY0IiB5PSIxOTIiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI2Q2OWUxOCIvPjx0ZXh0IHg9Ijk2IiB5PSIyMjgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WMjwvdGV4dD4KICA8cmVjdCB4PSIxMjgiIHk9IjE5MiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjYjc3OTFmIi8+PHRleHQgeD0iMTYwIiB5PSIyMjgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WMzwvdGV4dD4KICA8cmVjdCB4PSIxOTIiIHk9IjE5MiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOTc1YTE2Ii8+PHRleHQgeD0iMjI0IiB5PSIyMjgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WNDwvdGV4dD4KPC9zdmc+";

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-md bg-neutral-800 shadow-inner">
      <style>{`
        @keyframes playSprite-${state} {
          100% { background-position: -256px ${config.rowOffset}px; }
        }
        .sprite-${state} {
          width: 64px;
          height: 64px;
          background-image: url('${placeholderSpritesheetBase64}');
          background-repeat: no-repeat;
          background-position: 0px ${config.rowOffset}px;
          animation: playSprite-${state} ${config.speed} steps(${config.frames}) ${config.fillMode === 'forwards' ? 'forwards' : 'infinite'};
        }
      `}</style>
      <div className={`sprite-${state}`} title={`Sprite: ${state}`} />
    </div>
  );
}
