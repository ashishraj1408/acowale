import { prisma } from '../config/prisma.js';

export const getAnalyticsSummary = async () => {
  const total = await prisma.feedback.count();
  const rows = await prisma.feedback.groupBy({ by: ['category'], _count: { category: true } });

  return {
    total,
    distribution: rows.map((row) => ({ category: row.category, count: row._count.category })),
  };
};
