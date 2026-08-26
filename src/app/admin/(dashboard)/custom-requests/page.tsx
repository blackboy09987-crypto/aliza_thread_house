import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { updateCustomRequestStatus } from "@/lib/actions/orders";

const STATUSES = ["NEW", "QUOTED", "ACCEPTED", "DECLINED", "COMPLETED"];

export default async function AdminCustomRequestsPage() {
  const requests = await prisma.customOrderRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Custom order requests</h1>

      {requests.length === 0 ? (
        <p className="mt-6 text-ink-soft">No custom requests yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {requests.map((req) => (
            <div key={req.id} className="rounded-2xl border border-cream-line bg-cream p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{req.name}</p>
                  <p className="text-sm text-ink-soft">
                    {req.email} {req.phone && `· ${req.phone}`}
                  </p>
                  {req.budgetCents != null && (
                    <p className="text-sm text-ink-soft">Budget: {formatPrice(req.budgetCents)}</p>
                  )}
                </div>
                <form action={updateCustomRequestStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={req.id} />
                  <select
                    name="status"
                    defaultValue={req.status}
                    className="rounded-lg border border-cream-line bg-cream-soft px-2 py-1 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full bg-rose-dark px-3 py-1 text-xs text-cream hover:bg-terracotta-dark"
                  >
                    Update
                  </button>
                </form>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-ink-soft">{req.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
