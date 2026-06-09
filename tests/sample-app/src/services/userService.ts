import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; name?: string }): Promise<User> {
    return prisma.user.create({ data });
  }
}
