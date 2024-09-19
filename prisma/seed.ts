import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    await prisma.client.createMany({
      data: [
        {
          name: "Cliente 1",
          email: "cliente1@example.com",
          phone: "1234567890",
          address: "Rua Exemplo 1",
          city: "Cidade Exemplo",
          fantasyName: "Fantasia 1",
          corporateName: "Empresa 1",
        },
        {
          name: "Cliente 2",
          email: "cliente2@example.com",
          phone: "0987654321",
          address: "Rua Exemplo 2",
          city: "Cidade Exemplo",
          fantasyName: "Fantasia 2",
          corporateName: "Empresa 2",
        },
      ],
    });

    await prisma.product.createMany({
      data: [
        { name: "Produto 1", price: 10.50 },
        { name: "Produto 2", price: 20.75 },
      ],
    });

    console.log("🌴 Banco populado com sucesso!");

  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
