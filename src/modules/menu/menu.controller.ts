import { Controller, Get, Param, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(':restaurantId')
  findAll(
    @Param('restaurantId') restaurantId: string,
    @Query('category') category?: string,
  ) {
    return this.menuService.findAll(restaurantId, category);
  }
}
