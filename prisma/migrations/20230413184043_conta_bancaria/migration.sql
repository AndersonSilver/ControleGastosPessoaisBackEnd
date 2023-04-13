-- CreateTable
CREATE TABLE "CartaoCredito" (
    "id" SERIAL NOT NULL,
    "limite" INTEGER,
    "dataVencimento" TEXT,
    "dataFechamento" TEXT,
    "bandeira" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CartaoCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContaBancaria" (
    "instituicao" TEXT,
    "descricao" TEXT,
    "tipoConta" TEXT,
    "saldo" INTEGER,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CartaoCredito_userId_key" ON "CartaoCredito"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ContaBancaria_userId_key" ON "ContaBancaria"("userId");

-- AddForeignKey
ALTER TABLE "CartaoCredito" ADD CONSTRAINT "CartaoCredito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContaBancaria" ADD CONSTRAINT "ContaBancaria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
