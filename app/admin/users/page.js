import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Users</h1>
      <p className="text-black/60 mb-8">
        {users.length} account{users.length === 1 ? "" : "s"} signed up so far.
      </p>

      <div className="bg-white border border-grey-line rounded-xl overflow-hidden max-w-3xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-grey-line text-left text-xs uppercase tracking-wide text-black/50">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-grey-line last:border-0">
                <td className="px-4 py-3 font-semibold">{user.name || "—"}</td>
                <td className="px-4 py-3 text-black/70">{user.email}</td>
                <td className="px-4 py-3 text-black/50">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-black/50">
                  No users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
