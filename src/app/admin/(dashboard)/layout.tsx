import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { logoutAdmin } from "@/lib/actions/admin-auth";

const ADMIN_LINKS = [
  { href: "/admin", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/custom-requests", label: "Custom Requests" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream-line pb-6">
        <nav className="flex gap-6">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm uppercase tracking-widest text-ink-soft hover:text-rose-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAdmin}>
          <button type="submit" className="text-sm text-ink-soft underline hover:text-rose-dark">
            Log out
          </button>
        </form>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
