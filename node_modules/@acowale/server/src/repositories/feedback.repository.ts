import { prisma } from '../config/prisma.js';
import type { FeedbackCategory } from '../types/feedback.js';

export class FeedbackRepository {
  async create(data: { category: FeedbackCategory; comment: string }) {
    return prisma.feedback.create({ data });
  }

  async list(query?: { category?: FeedbackCategory; search?: string }) {
    const where = {
      ...(query?.category ? { category: query.category } : {}),
      ...(query?.search
        ? {
            comment: {
              contains: query.search,
              mode: 'insensitive' as const,
            },
          }
        : {}),
    };

    return prisma.feedback.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async count() {
    return prisma.feedback.count();
  }

  async analytics() {
    const feedbacks = await prisma.feedback.findMany({
      select: { category: true },
    });

    const totals = feedbacks.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(totals).map(([category, count]) => ({ category, count }));
  }
}
