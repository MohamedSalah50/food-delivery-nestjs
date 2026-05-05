import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: dto.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    const menuItemIds = dto.items.map((i) => i.menuItemId);
    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        id: { in: menuItemIds },
        restaurantId: dto.restaurantId,
        isAvailable: true,
      },
    });

    if (menuItems.length !== menuItemIds.length) {
      throw new BadRequestException('One or more menu items are invalid');
    }

    const menuItemMap = new Map<string, (typeof menuItems)[number]>(
      menuItems.map((item) => [item.id, item]),
    );
    let totalAmount = 0;

    for (const orderItem of dto.items) {
      const menuItem = menuItemMap.get(orderItem.menuItemId)!;
      totalAmount += Number(menuItem.price) * orderItem.quantity;
    }

    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          restaurantId: dto.restaurantId,
          totalAmount,
          status: 'PENDING',
          paymentStatus: 'PAID',
          items: {
            create: dto.items.map((item) => ({
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              unitPrice: menuItemMap.get(item.menuItemId)!.price,
            })),
          },
        },
        include: {
          items: { include: { menuItem: true } },
          restaurant: true,
        },
      });

      return newOrder;
    });

    return order;
  }

  async findOne(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { menuItem: true } },
        restaurant: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    if (order.userId !== userId) throw new NotFoundException('Order not found');

    return order;
  }

  findMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { menuItem: true } },
        restaurant: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
