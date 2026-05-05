import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async findAll(restaurantId: string, category?: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) throw new NotFoundException('Restaurant not found');

    return this.prisma.menuItem.findMany({
      where: {
        restaurantId,
        isAvailable: true,
        ...(category ? { category } : {}),
      },
      orderBy: { category: 'asc' },
    });
  }
}
