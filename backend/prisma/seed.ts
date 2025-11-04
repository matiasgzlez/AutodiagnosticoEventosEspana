import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear productos de prueba
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Gaming',
        description: 'Laptop para gaming de alta gama con RTX 4070',
        price: 1299.99,
        stock: 10,
        category: 'Electronics'
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Smartphone premium de Apple',
        price: 999.99,
        stock: 25,
        category: 'Electronics'
      },
      {
        name: 'Nike Air Max',
        description: 'Zapatillas deportivas Nike',
        price: 120.00,
        stock: 50,
        category: 'Fashion'
      },
      {
        name: 'MacBook Pro M3',
        description: 'Laptop profesional de Apple con chip M3',
        price: 1999.99,
        stock: 5,
        category: 'Electronics'
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Smartphone Android de última generación',
        price: 899.99,
        stock: 30,
        category: 'Electronics'
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ ${products.count} productos creados exitosamente`);
  
  // Mostrar productos creados
  const allProducts = await prisma.product.findMany();
  console.log('📦 Productos en la base de datos:');
  allProducts.forEach(product => {
    console.log(`- ${product.name}: $${product.price} (Stock: ${product.stock})`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Conexión a la base de datos cerrada');
  });
