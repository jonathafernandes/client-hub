/*
  Warnings:

  - A unique constraint covering the columns `[registerNumber]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registerNumber]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "registerNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "registerNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_registerNumber_key" ON "Client"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_registerNumber_key" ON "Orders"("registerNumber");
