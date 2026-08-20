export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Overview</h1>
      <p className="text-black/60 mb-8">Welcome to the 2776 Quail Co. admin dashboard.</p>

      <div className="bg-white border border-grey-line rounded-xl p-6 max-w-md">
        <p className="text-sm text-black/60">
          Real numbers (live products, pending QA entries, signed-up users) will show up here once the other admin pages
          are built.
        </p>
      </div>
    </div>
  );
}
