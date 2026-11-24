/**
 * @component RailwayTrackBed
 * @description Continuous railway track infrastructure beneath the Vande Bharat Express
 * Renders parallel dual steel rails, concrete ties (sleepers), ballast gravel bed,
 * overhead catenary wires, and illuminated trackside signal lights.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
export function RailwayTrackBed() {
  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Overhead Catenary Contact Wire */}
      <div className="relative w-full h-8 flex items-center">
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#873653]/40 to-transparent" />
        <div className="absolute inset-x-0 top-1 h-[1px] bg-gradient-to-r from-transparent via-[rgba(214,185,154,0.2)] to-transparent" />
      </div>

      {/* Track Base Structure */}
      <div className="relative w-full">
        {/* Ballast Gravel Bed */}
        <div
          className="w-full h-12 bg-[#0A0D12] border-t-2 border-[#1E2430] shadow-inner"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(214,185,154,0.06) 1px, transparent 0)',
            backgroundSize: '8px 8px',
          }}
        >
          {/* Concrete Sleepers (Ties) repeated continuously */}
          <div
            className="w-full h-6 border-b border-[#141822] flex items-center"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #1A1F2B 0px, #1A1F2B 18px, transparent 18px, transparent 38px)',
            }}
          />
        </div>

        {/* Parallel Steel Rails */}
        <div className="absolute inset-x-0 top-1.5 flex flex-col gap-3 pointer-events-none">
          {/* Top Rail */}
          <div className="w-full h-[3px] bg-gradient-to-r from-[#873653]/60 via-[#F0EAE3]/80 to-[#873653]/60 shadow-[0_0_8px_rgba(214,185,154,0.4)]" />
          {/* Bottom Rail */}
          <div className="w-full h-[3px] bg-gradient-to-r from-[#873653]/60 via-[#D6B99A]/80 to-[#873653]/60 shadow-[0_0_8px_rgba(135,54,83,0.4)]" />
        </div>
      </div>
    </div>
  );
}
