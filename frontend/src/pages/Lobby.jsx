import { Link } from 'react-router-dom';

export default function Lobby() {
  const activeRooms = [
    { id: 492, name: "Casual Match #492", variant: "Standard", players: "1/2", time: "10+0", color: "blue" },
    { id: 493, name: "Atomic Blitz Arena", variant: "Atomic", players: "1/2", time: "3+2", color: "purple" },
    { id: 494, name: "Gravity Pull", variant: "Gravity", players: "1/2", time: "5+5", color: "orange" },
    { id: 495, name: "Odd Move Tournament", variant: "Odd Move", players: "1/2", time: "15+10", color: "red" },
    { id: 496, name: "Grandmaster Duo", variant: "Standard", players: "2/2", time: "3+0", color: "blue", full: true },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-dark border border-border-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/95 to-transparent z-10"></div>
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhowmyrW1AoQmuHeI6enuQzQb0fJ-dHpY_fm5fC4Km1pPm3iVDbX8oVsyU03XcUq_jld_UUv5tMEKGqzjpk0alGM10YMi_0wNAsSG2fF9-m1SKZP4caORkIHUVNb7MwpqldFhNhQn0unLtpR1vf5kAp2E4-wHt5m4wMruC77a_DHMdliKMRYjnRFm9XBbCCO0dJ2TxZLDFs8V5sciP6oKPFR195Z0mAr4_qeCwKXPOWRWt8LxAOkYseFWVfBddF6TxjbBd_-kEVIYN')" }}
        ></div>

        <div className="relative z-20 flex flex-col md:flex-row gap-8 p-8 md:p-12 lg:p-16">
          <div className="flex-1 flex flex-col justify-center gap-6 max-w-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <span className="material-symbols-outlined text-primary text-xs">bolt</span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">New: Gravity Mode</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Master the Art of <span className="text-primary">Variant Chess</span>
              </h1>
              <p className="text-lg text-text-muted max-w-lg leading-relaxed">
                Play classic chess or explore wild variants like Atomic, Gravity, and Odd Move. Challenge friends or match with players worldwide in real-time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/create-room" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all hover:scale-[1.02]">
                <span className="material-symbols-outlined">add_circle</span>
                Create Room
              </Link>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-surface-dark border border-border-dark px-8 text-base font-bold text-text-main hover:bg-border-dark transition-all">
                <span className="material-symbols-outlined">school</span>
                Learn Rules
              </button>
            </div>
          </div>

          {/* Right Side Interactive Element (Room Join) */}
          <div className="flex-1 md:max-w-sm lg:max-w-md w-full flex flex-col justify-center">
            <div className="bg-background-dark/80 backdrop-blur-sm border border-border-dark rounded-xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Join a Room</h3>
              <p className="text-text-muted text-sm mb-6">Enter a 6-digit room code to jump straight into the action.</p>
              <div className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="room-code">Room Code</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-text-muted">key</span>
                    </div>
                    <input
                      className="block w-full rounded-lg border-border-dark bg-surface-dark pl-10 pr-4 py-3 text-white placeholder-text-muted focus:border-primary focus:ring-primary sm:text-sm"
                      id="room-code"
                      placeholder="Ex: A7X9P2"
                      type="text"
                    />
                  </div>
                </div>
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-background-dark font-bold py-3 hover:bg-gray-200 transition-colors">
                  Join Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Players Online", value: "1,240", color: "white" },
          { label: "Active Rooms", value: "85", color: "primary" },
          { label: "Variants", value: "12", color: "white" },
          { label: "Uptime", value: "24h", color: "white" }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-dark border border-border-dark rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className={`text-2xl font-black text-${stat.color === 'primary' ? 'primary' : 'white'}`}>{stat.value}</span>
            <span className="text-xs text-text-muted uppercase tracking-wide font-semibold mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Active Rooms Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">table_view</span>
            Active Rooms
          </h2>
          <div className="flex gap-2">
            <button aria-label="Filter" className="p-2 text-text-muted hover:text-white transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button aria-label="Refresh" className="p-2 text-text-muted hover:text-white transition-colors">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background-dark/50 text-xs uppercase text-text-muted font-semibold tracking-wider border-b border-border-dark">
                <tr>
                  <th className="px-6 py-4" scope="col">Room Name</th>
                  <th className="px-6 py-4" scope="col">Variant</th>
                  <th className="px-6 py-4" scope="col">Players</th>
                  <th className="px-6 py-4" scope="col">Time Control</th>
                  <th className="px-6 py-4 text-right" scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {activeRooms.map((room) => (
                  <tr key={room.id} className="group hover:bg-background-dark/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div className={`size-2 rounded-full ${room.full ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        {room.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md bg-${room.color}-500/10 px-2 py-1 text-xs font-medium text-${room.color}-400 ring-1 ring-inset ring-${room.color}-500/20`}>
                        {room.variant}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">{room.full ? 'groups' : 'person'}</span>
                        {room.players}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-muted font-mono">{room.time}</td>
                    <td className="px-6 py-4 text-right">
                      {room.full ? (
                        <button className="inline-flex items-center justify-center rounded bg-surface-dark border border-border-dark px-3 py-1.5 text-xs font-bold text-text-muted cursor-not-allowed opacity-50">
                          Full
                        </button>
                      ) : (
                        <Link to={`/room/${room.id}`} className="inline-flex items-center justify-center rounded bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all">
                          Join
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="border-t border-border-dark px-6 py-4 flex items-center justify-between">
            <span className="text-sm text-text-muted">Showing <span className="text-white font-medium">1-5</span> of <span className="text-white font-medium">85</span> rooms</span>
            <div className="flex gap-2">
              <button className="p-1 rounded hover:bg-border-dark text-text-muted disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-1 rounded hover:bg-border-dark text-white">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
