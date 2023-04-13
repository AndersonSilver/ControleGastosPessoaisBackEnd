/*
  Warnings:

  - You are about to drop the `perfilUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "perfilUser" DROP CONSTRAINT "perfilUser_userId_fkey";

-- DropTable
DROP TABLE "perfilUser";

-- CreateTable
CREATE TABLE "DadosPessoais" (
    "id" SERIAL NOT NULL,
    "nameCompleto" TEXT,
    "telefone" INTEGER,
    "cep" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "aniversario" TIMESTAMP(3),
    "sexo" TEXT,
    "nascionalidade" TEXT,
    "cpf" TEXT,
    "objetivoFinanceiro" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DadosPessoais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DadosPessoais_userId_key" ON "DadosPessoais"("userId");

-- AddForeignKey
ALTER TABLE "DadosPessoais" ADD CONSTRAINT "DadosPessoais_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
