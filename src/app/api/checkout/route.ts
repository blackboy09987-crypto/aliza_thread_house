import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/schemas";
import { DELIVERY_FEE_CENTS } from "@/lib/site-config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { customer, items } = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: items.map((i) => i.productId) } },
      });

      const productMap = new Map(products.map((p) => [p.id, p]));
      let subtotalCents = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = productMap.get(item.productId);
        if (!product || !product.isActive) {
          throw new Error(`One of the items in your cart is no longer available.`);
        }
        if (!product.isCustom && product.stock < item.quantity) {
          throw new Error(`Only ${product.stock} left of "${product.name}".`);
        }
        subtotalCents += product.priceCents * item.quantity;
        orderItemsData.push({
          productId: product.id,
          nameSnapshot: product.name,
          priceCentsSnapshot: product.priceCents,
          quantity: item.quantity,
        });
      }

      const created = await tx.order.create({
        data: {
          customerName: customer.name,
          email: customer.email || null,
          phone: customer.phone,
          addressLine1: customer.addressLine1,
          addressLine2: customer.addressLine2,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postalCode,
          country: customer.country,
          note: customer.note,
          subtotalCents,
          deliveryFeeCents: DELIVERY_FEE_CENTS,
          items: { create: orderItemsData },
        },
        include: { items: true },
      });

      for (const item of items) {
        const product = productMap.get(item.productId)!;
        if (!product.isCustom) {
          await tx.product.update({
            where: { id: product.id },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      return created;
    });

    if (!isStripeConfigured()) {
      return NextResponse.json({ orderId: order.id, stripeConfigured: false });
    }

    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ...(customer.email ? { customer_email: customer.email } : {}),
      line_items: [
        ...order.items.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: "pkr",
            unit_amount: item.priceCentsSnapshot,
            product_data: { name: item.nameSnapshot },
          },
        })),
        {
          quantity: 1,
          price_data: {
            currency: "pkr",
            unit_amount: DELIVERY_FEE_CENTS,
            product_data: { name: "Delivery fee" },
          },
        },
      ],
      metadata: { orderId: order.id },
      success_url: `${siteUrl}/checkout/success?order=${order.id}`,
      cancel_url: `${siteUrl}/checkout/cancel?order=${order.id}`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url, orderId: order.id, stripeConfigured: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
