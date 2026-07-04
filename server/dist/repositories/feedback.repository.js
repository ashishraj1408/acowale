import { prisma } from '../config/prisma.js';
export class FeedbackRepository {
    async create(data) {
        return prisma.feedback.create({ data });
    }
    async list(query) {
        const where = {
            ...(query?.category ? { category: query.category } : {}),
            ...(query?.search
                ? {
                    comment: {
                        contains: query.search,
                        mode: 'insensitive',
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
        const totals = feedbacks.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] ?? 0) + 1;
            return acc;
        }, {});
        return Object.entries(totals).map(([category, count]) => ({ category, count }));
    }
}
