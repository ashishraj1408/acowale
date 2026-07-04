import { prisma } from '../config/prisma.js';
import { FeedbackInput } from '../types/feedback.js';

export const getFeedback = async (filters: { category?: string; search?: string; page?: number; limit?: number }) => {
  const where: any = {};

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.search) {
    where.comment = { contains: filters.search, mode: 'insensitive' };
  }

  const page = Number(filters.page ?? 1);
  const limit = Number(filters.limit ?? 10);
  const take = Math.max(1, Math.min(100, limit));
  const skip = Math.max(0, (Math.max(page, 1) - 1) * take);

  const [items, total] = await Promise.all([
    prisma.feedback.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
    prisma.feedback.count({ where }),
  ]);

  return {
    items,
    total,
    page: Math.max(1, page),
    limit: take,
    totalPages: Math.max(1, Math.ceil(total / take)),
  };
};

export const createFeedback = async (input: FeedbackInput) => {
  return prisma.feedback.create({
    data: {
      category: input.category as string,
      comment: input.comment?.trim() as string,
    },
  });
};
