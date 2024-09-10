/*
  Warnings:

  - You are about to drop the column `cep` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "cep",
ADD COLUMN     "zipCode" TEXT;
