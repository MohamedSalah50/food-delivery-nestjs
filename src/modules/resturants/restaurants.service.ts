import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.restaurant.findMany({
      include: { _count: { select: { menuItems: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
      include: { menuItems: { where: { isAvailable: true } } },
    });

    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }
}
