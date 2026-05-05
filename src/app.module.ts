import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { MenuModule } from './modules/menu/menu.module';
import { RestaurantsModule } from './modules/resturants/resturants.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [PrismaModule, RestaurantsModule, MenuModule, OrdersModule],
})
export class AppModule {}