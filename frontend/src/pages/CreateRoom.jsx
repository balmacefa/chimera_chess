import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [variant, setVariant] = useState('standard');
  const [visibility, setVisibility] = useState('public');
  const [color, setColor] = useState('random');
  const [timeControl, setTimeControl] = useState({ minutes: 5, increment: 3 });

  const handleCreate = (e) => {
    e.preventDefault();
    // Simulate room creation API call
    const roomId = Math.random().toString(36).substring(7);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-2xl bg-surface-dark border border-border-dark rounded-xl shadow-2xl overflow-hidden">
        <div className="border-b border-border-dark px-6 py-4 flex items-center justify-between bg-background-dark/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">add_circle</span>
            Create New Room
          </h2>
          <button onClick={() => navigate('/')} className="text-text-muted hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleCreate} className="p-6 space-y-8">
          {/* Variant Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Game Variant</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'standard', name: 'Standard', icon: 'chess', color: 'blue' },
                { id: 'atomic', name: 'Atomic', icon: 'explosion', color: 'purple' },
                { id: 'gravity', name: 'Gravity', icon: 'arrow_downward', color: 'orange' },
                { id: 'odd', name: 'Odd Move', icon: 'gesture', color: 'red' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v.id)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                    variant === v.id
                      ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary'
                      : 'bg-background-dark border-border-dark text-text-muted hover:border-primary/50 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                  <span className="text-sm font-medium">{v.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Time Control */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Time Control</label>
              <div className="bg-background-dark rounded-lg p-4 border border-border-dark space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">Minutes per side</span>
                    <span className="text-white font-mono">{timeControl.minutes} min</span>
                  </div>
                  <input
                    type="range"
                    min="1" max="60"
                    value={timeControl.minutes}
                    onChange={(e) => setTimeControl({...timeControl, minutes: parseInt(e.target.value)})}
                    className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">Increment (seconds)</span>
                    <span className="text-white font-mono">{timeControl.increment} sec</span>
                  </div>
                  <input
                    type="range"
                    min="0" max="30"
                    value={timeControl.increment}
                    onChange={(e) => setTimeControl({...timeControl, increment: parseInt(e.target.value)})}
                    className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>

            {/* Color & Visibility */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Play As</label>
                <div className="flex bg-background-dark rounded-lg p-1 border border-border-dark">
                  {[
                    { id: 'white', icon: 'chess_pawn' }, // Placeholder for white
                    { id: 'random', icon: 'shuffle' },
                    { id: 'black', icon: 'chess_pawn' }, // Placeholder for black
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.id)}
                      className={`flex-1 flex items-center justify-center py-2 rounded transition-all ${
                        color === c.id
                          ? 'bg-surface-dark text-white shadow-sm'
                          : 'text-text-muted hover:text-white'
                      }`}
                    >
                      <span className={`material-symbols-outlined ${c.id === 'white' ? 'text-white' : c.id === 'black' ? 'text-gray-500' : ''}`}>
                        {c.icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Visibility</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={visibility === 'public'}
                      onChange={() => setVisibility('public')}
                      className="w-4 h-4 text-primary bg-background-dark border-border-dark focus:ring-primary focus:ring-offset-surface-dark"
                    />
                    <span className="text-white text-sm">Public</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={visibility === 'private'}
                      onChange={() => setVisibility('private')}
                      className="w-4 h-4 text-primary bg-background-dark border-border-dark focus:ring-primary focus:ring-offset-surface-dark"
                    />
                    <span className="text-white text-sm">Private</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-dark flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-lg text-sm font-bold text-text-muted hover:text-white hover:bg-surface-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:bg-primary-hover hover:scale-[1.02] transition-all"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
