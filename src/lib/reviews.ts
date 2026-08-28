import { prisma } from "@/lib/prisma";

export async function getApprovedReviews() {
  return prisma.review.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true, slug: true } } },
  });
}

export async function getAverageRating() {
  const result = await prisma.review.aggregate({
    where: { isApproved: true },
    _avg: { rating: true },
    _count: true,
  });
  return {
    average: result._avg.rating ?? 0,
    count: result._count,
  };
}
