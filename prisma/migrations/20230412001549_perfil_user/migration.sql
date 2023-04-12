-- CreateTable
CREATE TABLE "perfilUser" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "perfilUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "perfilUser" ADD CONSTRAINT "perfilUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
