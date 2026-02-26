import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function GameRoom() {
  const { roomId } = useParams();
  const [board, setBoard] = useState(Array(8).fill(Array(8).fill(null)));

  // Mock data for initial visualization
  const moves = [
    { id: 1, white: "e4", black: "e5" },
    { id: 2, white: "Nf3", black: "Nc6" },
    { id: 3, white: "Bb5", black: "a6" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-8rem)]">
      {/* Main Board Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-surface-dark border border-border-dark rounded-2xl p-4 lg:p-8 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

        {/* Top Player Info (Opponent) */}
        <div className="w-full max-w-[600px] flex justify-between items-center mb-4 text-text-muted">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-border-dark flex items-center justify-center text-white font-bold text-lg">
              OP
            </div>
            <div>
              <div className="text-white font-semibold">Opponent</div>
              <div className="text-xs">Rating: 1500</div>
            </div>
          </div>
          <div className="bg-surface-dark border border-border-dark px-4 py-2 rounded-lg font-mono text-xl text-white">
            10:00
          </div>
        </div>

        {/* Chess Board */}
        <div className="aspect-square w-full max-w-[600px] bg-border-dark border-8 border-border-dark rounded-lg shadow-xl grid grid-cols-8 grid-rows-8">
          {/* Rank 8 to 1 */}
          {Array.from({ length: 8 }).map((_, rankIndex) => {
            const rank = 8 - rankIndex;
            return Array.from({ length: 8 }).map((_, fileIndex) => {
              const file = String.fromCharCode(97 + fileIndex); // a-h
              const isDark = (rankIndex + fileIndex) % 2 === 1;
              const squareColor = isDark ? 'bg-primary/80' : 'bg-[#EAD8B1]'; // Using a cream color for light squares

              return (
                <div
                  key={`${file}${rank}`}
                  className={`${squareColor} flex items-center justify-center relative`}
                >
                  {/* Coordinate Labels */}
                  {fileIndex === 0 && (
                    <span className={`absolute top-0.5 left-1 text-[10px] font-bold ${isDark ? 'text-[#EAD8B1]' : 'text-primary'}`}>
                      {rank}
                    </span>
                  )}
                  {rankIndex === 7 && (
                    <span className={`absolute bottom-0.5 right-1 text-[10px] font-bold ${isDark ? 'text-[#EAD8B1]' : 'text-primary'}`}>
                      {file}
                    </span>
                  )}
                </div>
              );
            });
          })}
        </div>

        {/* Bottom Player Info (You) */}
        <div className="w-full max-w-[600px] flex justify-between items-center mt-4 text-text-muted">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              ME
            </div>
            <div>
              <div className="text-white font-semibold">You</div>
              <div className="text-xs">Rating: 1500</div>
            </div>
          </div>
          <div className="bg-surface-dark border border-primary/50 px-4 py-2 rounded-lg font-mono text-xl text-white shadow-[0_0_10px_rgba(217,119,6,0.3)]">
            09:55
          </div>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        {/* Game Info & Controls */}
        <div className="bg-surface-dark border border-border-dark rounded-xl p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-border-dark pb-3">
            <h3 className="font-bold text-white">Room: {roomId}</h3>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Standard</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-surface-dark border border-border-dark text-text-muted hover:bg-border-dark hover:text-white transition-colors text-sm">
              <span className="material-symbols-outlined text-sm">flag</span> Resign
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-surface-dark border border-border-dark text-text-muted hover:bg-border-dark hover:text-white transition-colors text-sm">
              <span className="material-symbols-outlined text-sm">handshake</span> Draw
            </button>
          </div>
        </div>

        {/* Move History */}
        <div className="flex-1 bg-surface-dark border border-border-dark rounded-xl overflow-hidden flex flex-col min-h-[300px]">
          <div className="bg-background-dark/50 px-4 py-3 border-b border-border-dark flex justify-between items-center">
            <h3 className="font-bold text-white text-sm">Move History</h3>
            <div className="flex gap-1">
               <button className="p-1 text-text-muted hover:text-white"><span className="material-symbols-outlined text-sm">first_page</span></button>
               <button className="p-1 text-text-muted hover:text-white"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
               <button className="p-1 text-text-muted hover:text-white"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
               <button className="p-1 text-text-muted hover:text-white"><span className="material-symbols-outlined text-sm">last_page</span></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 font-mono text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-text-muted text-xs border-b border-border-dark">
                  <th className="py-2 pl-2">#</th>
                  <th className="py-2">White</th>
                  <th className="py-2">Black</th>
                </tr>
              </thead>
              <tbody>
                {moves.map((move) => (
                  <tr key={move.id} className="hover:bg-background-dark/30">
                    <td className="py-1 pl-2 text-text-muted">{move.id}.</td>
                    <td className="py-1 text-white">{move.white}</td>
                    <td className="py-1 text-white">{move.black}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chat */}
        <div className="h-48 bg-surface-dark border border-border-dark rounded-xl overflow-hidden flex flex-col">
          <div className="bg-background-dark/50 px-4 py-2 border-b border-border-dark">
             <h3 className="font-bold text-white text-xs uppercase">Chat</h3>
          </div>
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            <p className="text-text-muted"><span className="font-bold text-white">System:</span> Game started.</p>
            <p className="text-text-muted"><span className="font-bold text-blue-400">Opponent:</span> Good luck!</p>
          </div>
          <div className="p-2 border-t border-border-dark">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-background-dark border border-border-dark rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
