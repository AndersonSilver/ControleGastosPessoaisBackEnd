/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `perfilUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "perfilUser" ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "rua" DROP NOT NULL,
ALTER COLUMN "numero" DROP NOT NULL,
ALTER COLUMN "complemento" DROP NOT NULL,
ALTER COLUMN "bairro" DROP NOT NULL,
ALTER COLUMN "cidade" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "perfilUser_userId_key" ON "perfilUser"("userId");
