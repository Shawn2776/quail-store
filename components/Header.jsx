export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Top utility strip */}
      <div className="bg-black text-white text-sm">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between gap-2 flex-wrap h-auto min-h-9 py-1">
          <span className="font-semibold">
            Local pickup only{" "}
            <a href="#pickup" className="underline underline-offset-2 hover:text-orange">
              — see how it works
            </a>
          </span>
          <nav className="hidden sm:flex gap-6 text-white/80">
            <a href="#story" className="hover:text-white">
              About the farm
            </a>
            <a href="#hatchcam" className="hover:text-white">
              Hatch cam
            </a>
          </nav>
        </div>
      </div>

      {/* Main row: logo, location, search, account/cart */}
      <div className="bg-white border-b border-grey-line">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <span className="w-9 h-9 rounded-full bg-orange flex items-center justify-center text-white font-display font-extrabold text-lg shrink-0">
                Q
              </span>
              <span className="font-display font-extrabold text-lg md:text-xl leading-none tracking-tight whitespace-nowrap">
                2776 QUAIL CO.
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 text-sm border-l border-grey-line pl-6 shrink-0">
              <span className="font-semibold">Coeur d&apos;Alene, ID</span>
              <span className="text-black/60">· Pickup only</span>
            </div>

            <div className="hidden md:flex flex-1 min-w-0">
              <div className="flex items-center border-2 border-black rounded-full overflow-hidden w-full">
                <input
                  type="text"
                  placeholder="Search table eggs, hatching eggs..."
                  className="flex-1 min-w-0 px-4 py-2 text-sm outline-none"
                />
                <button
                  className="bg-white hover:bg-grey-bg transition-colors px-4 py-2.5 text-black border-l-2 border-black shrink-0"
                  aria-label="Search"
                >
                  🔍
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto shrink-0">
              <button className="flex flex-col items-center text-xs font-semibold hover:text-orange">
                <span className="text-xl leading-none">👤</span>
                <span className="hidden sm:block mt-0.5">Account</span>
              </button>
              <button className="relative flex flex-col items-center text-xs font-semibold hover:text-orange">
                <span className="text-xl leading-none">🛒</span>
                <span className="hidden sm:block mt-0.5">Cart</span>
                <span className="absolute -top-1 -right-2 bg-turquoise text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          <div className="mt-3 md:hidden">
            <div className="flex items-center border-2 border-black rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search eggs, quail..."
                className="flex-1 min-w-0 px-4 py-2 text-sm outline-none"
              />
              <button
                className="bg-white hover:bg-grey-bg transition-colors px-4 py-2.5 text-black border-l-2 border-black shrink-0"
                aria-label="Search"
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
