import { prisma } from "@/lib/prisma";

export async function Footer() {
  const liveCategories = await prisma.category.findMany({
    where: { status: "live" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <footer className="bg-black text-white/70">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-orange flex items-center justify-center text-white font-display font-extrabold">
                Q
              </span>
              <span className="font-display font-extrabold text-white text-lg">2776 QUAIL CO.</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[32ch]">
              A small Coturnix quail flock selling eggs, raised local, local pickup only.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              {liveCategories.map((category) => (
                <li key={category.id}>
                  <a href="#shop" className="hover:text-orange">
                    {category.name}
                  </a>
                </li>
              ))}
              {liveCategories.length === 0 && <li className="text-white/40">Check back soon</li>}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Farm</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#story" className="hover:text-orange">
                  Our story
                </a>
              </li>
              <li>
                <a href="#pickup" className="hover:text-orange">
                  Pickup info
                </a>
              </li>
              <li>
                <a href="#hatchcam" className="hover:text-orange">
                  Hatch cam
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-orange">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange">
                  Sign in
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange">
                  Order status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs">
          <span>© 2026 2776 Quail Co. · Local pickup only</span>
          <span>quail.2776.ltd</span>
        </div>
      </div>
    </footer>
  );
}
