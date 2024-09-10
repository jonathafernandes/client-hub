/*
  Warnings:

  - You are about to drop the column `state` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_clientId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "state",
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "referencePoint" TEXT;

-- DropTable
DROP TABLE "Request";

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "discount" DECIMAL(10,2),
    "totalValue" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
