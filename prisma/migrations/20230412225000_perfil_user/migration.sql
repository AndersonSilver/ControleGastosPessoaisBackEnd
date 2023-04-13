/*
  Warnings:

  - You are about to drop the column `bairro` on the `perfilUser` table. All the data in the column will be lost.
  - You are about to drop the column `complemento` on the `perfilUser` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `perfilUser` table. All the data in the column will be lost.
  - You are about to drop the column `rua` on the `perfilUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "perfilUser" DROP COLUMN "bairro",
DROP COLUMN "complemento",
DROP COLUMN "numero",
DROP COLUMN "rua",
ADD COLUMN     "aniversario" TIMESTAMP(3),
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "nameCompleto" TEXT,
ADD COLUMN     "nascionalidade" TEXT,
ADD COLUMN     "objetivoFinanceiro" TEXT,
ADD COLUMN     "sexo" TEXT,
ADD COLUMN     "telefone" INTEGER;
