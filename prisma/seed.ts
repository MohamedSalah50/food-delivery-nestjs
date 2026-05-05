// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();

  const burger = await prisma.restaurant.create({
    data: {
      name: 'Burger House',
      description: 'Best smash burgers in town',
      imageUrl:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      menuItems: {
        create: [
          {
            name: 'Classic Smash Burger',
            description: 'Double patty, cheddar, pickles, special sauce',
            price: 89,
            category: 'Burgers',
            imageUrl:
              'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400',
          },
          {
            name: 'Crispy Chicken Burger',
            description: 'Fried chicken fillet, coleslaw, jalapeños',
            price: 79,
            category: 'Burgers',
            imageUrl:
              'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400',
          },
          {
            name: 'Loaded Fries',
            description: 'Fries with cheese sauce and bacon bits',
            price: 45,
            category: 'Sides',
            imageUrl:
              'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
          },
          {
            name: 'Chocolate Milkshake',
            description: 'Thick creamy chocolate shake',
            price: 39,
            category: 'Drinks',
            imageUrl:
              'https://images.unsplash.com/photo-1572490122747-3a3e7e3b1f93?w=400',
          },
        ],
      },
    },
  });

  const pizza = await prisma.restaurant.create({
    data: {
      name: 'Pizza Roma',
      description: 'Authentic Italian wood-fired pizza',
      imageUrl:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
      menuItems: {
        create: [
          {
            name: 'Margherita',
            description: 'Tomato sauce, fresh mozzarella, basil',
            price: 95,
            category: 'Pizzas',
            imageUrl:
              'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
          },
          {
            name: 'Pepperoni',
            description: 'Tomato sauce, mozzarella, pepperoni',
            price: 115,
            category: 'Pizzas',
            imageUrl:
              'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
          },
          {
            name: 'Caesar Salad',
            description: 'Romaine, parmesan, croutons, caesar dressing',
            price: 55,
            category: 'Salads',
            imageUrl:
              'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
          },
          {
            name: 'Tiramisu',
            description: 'Classic Italian dessert with mascarpone',
            price: 49,
            category: 'Desserts',
            imageUrl:
              'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
          },
        ],
      },
    },
  });

  console.log('✅ Seeded:', burger.name, '&', pizza.name);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
