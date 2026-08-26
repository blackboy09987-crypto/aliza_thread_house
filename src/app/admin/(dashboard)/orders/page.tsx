import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { updateOrderStatus, confirmOrder } from "@/lib/actions/orders";

const STATUSES = ["PENDING", "PAID", "IN_PROGRESS", "SHIPPED", "COMPLETED", "CANCELLED"];

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-ink-soft">No orders yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((order) => {
            const total = order.subtotalCents + order.deliveryFeeCents;
            return (
              <div key={order.id} className="rounded-2xl border border-cream-line bg-cream p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">
                      #{order.id.slice(-8)} — {order.customerName}
                    </p>
                    <p className="text-sm text-ink-soft">
                      {order.phone}
                      {order.email && ` · ${order.email}`}
                    </p>
                    <p className="text-sm text-ink-soft">
                      {order.addressLine1}, {order.city}
                      {order.state ? `, ${order.state}` : ""} {order.postalCode}
                    </p>
                    {order.note && (
                      <p className="mt-1 text-sm italic text-ink-soft">Note: {order.note}</p>
                    )}
                    <a
                      href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-sage-dark underline"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {order.status === "PENDING" && (
                      <form action={confirmOrder}>
                        <input type="hidden" name="id" value={order.id} />
                        <button
                          type="submit"
                          className="rounded-full bg-sage-dark px-4 py-1.5 text-xs font-medium text-cream hover:opacity-90"
                        >
                          ✓ Mark Confirmed
                        </button>
                      </form>
                    )}
                    <form action={updateOrderStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={order.id} />
                      <select
                        name="status"
                        defaultValue={order.status}
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
                </div>

                <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.quantity} × {item.nameSnapshot}
                      </span>
                      <span>{formatPrice(item.priceCentsSnapshot * item.quantity)}</span>
                    </li>
                  ))}
                  <li className="flex justify-between border-t border-cream-line pt-1">
                    <span>Delivery fee</span>
                    <span>{formatPrice(order.deliveryFeeCents)}</span>
                  </li>
                </ul>
                <p className="mt-2 text-right font-medium text-ink">Total: {formatPrice(total)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
