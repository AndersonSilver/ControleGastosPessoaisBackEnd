-- CreateTable
CREATE TABLE "Profissional" (
    "id" SERIAL NOT NULL,
    "escolaridade" TEXT,
    "profissao" TEXT,
    "fonteRenda" TEXT,
    "rendaMensal" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financeiro" (
    "id" SERIAL NOT NULL,
    "tipoMoradia" TEXT,
    "qtdPessoas" INTEGER,
    "qtdCartaoCredito" INTEGER,
    "valorPatrimonio" TEXT,
    "possuiVeiculo" TEXT,
    "tipoVeiculo" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Financeiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" SERIAL NOT NULL,
    "valor" INTEGER,
    "status" TEXT,
    "data" TIMESTAMP(3),
    "descricao" TEXT,
    "categoria" TEXT,
    "conta" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "valor" INTEGER,
    "status" TEXT,
    "data" TIMESTAMP(3),
    "descricao" TEXT,
    "categoria" TEXT,
    "conta" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transferencia" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3),
    "observacao" TEXT,
    "deConta" TEXT,
    "paraConta" TEXT,
    "valor" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transferencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_userId_key" ON "Profissional"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Financeiro_userId_key" ON "Financeiro"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Receita_userId_key" ON "Receita"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Despesa_userId_key" ON "Despesa"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Transferencia_userId_key" ON "Transferencia"("userId");

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financeiro" ADD CONSTRAINT "Financeiro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
