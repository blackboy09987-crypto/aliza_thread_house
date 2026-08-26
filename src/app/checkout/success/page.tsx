import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import ClearCartOnMount from "@/components/ClearCartOnMount";
import { PAYMENT_METHODS, WHATSAPP_LINK } from "@/lib/site-config";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  const order = orderId
    ? await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } })
    : null;

  const total = order ? order.subtotalCents + order.deliveryFeeCents : 0;
  const whatsappMessage = order
    ? encodeURIComponent(
        `Hi Aliza! I just placed order #${order.id.slice(-8)} for ${formatPrice(total)}. Sharing my payment screenshot here.`
      )
    : "";

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center">
      <ClearCartOnMount />
      <span className="text-5xl">🧵</span>
      <h1 className="mt-4 font-display text-3xl text-ink">Thank you for your order!</h1>

      {order ? (
        <>
          <p className="mt-3 text-ink-soft">
            Order <span className="font-medium text-ink">#{order.id.slice(-8)}</span> has been
            received.
          </p>

          <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-ink-soft">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.quantity} × {item.nameSnapshot}
                </span>
                <span>{formatPrice(item.priceCentsSnapshot * item.quantity)}</span>
              </li>
            ))}
            <li className="flex justify-between border-t border-cream-line pt-2">
              <span>Delivery fee</span>
              <span>{formatPrice(order.deliveryFeeCents)}</span>
            </li>
            <li className="flex justify-between font-medium text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </li>
          </ul>

          {order.status === "PENDING" && (
            <div className="mx-auto mt-6 max-w-md rounded-xl border border-cream-line bg-cream-soft p-5 text-left text-sm text-ink-soft">
              <p className="font-medium text-ink">Complete your payment</p>
              <p className="mt-1">
                Send {formatPrice(total)} via EasyPaisa or JazzCash, then share your payment
                screenshot on WhatsApp so Aliza can confirm your order.
              </p>
              <ul className="mt-3 space-y-1">
                {PAYMENT_METHODS.map((method) => (
                  <li key={method.name}>
                    <span className="font-medium text-ink">{method.name}:</span>{" "}
                    {method.accountNumber} ({method.accountName})
                  </li>
                ))}
              </ul>
              <a
                href={`${WHATSAPP_LINK}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-sage-dark px-6 py-2 text-sm font-medium text-cream hover:opacity-90"
              >
                Send payment proof on WhatsApp
              </a>
            </div>
          )}
        </>
      ) : (
        <p className="mt-3 text-ink-soft">Your order has been received.</p>
      )}

      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-7 py-3 text-sm font-medium text-cream"
      >
        Continue shopping
      </Link>
    </div>
  );
}
