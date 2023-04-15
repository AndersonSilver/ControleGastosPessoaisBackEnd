-- AlterTable
ALTER TABLE "ContaBancaria" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ContaBancaria_pkey" PRIMARY KEY ("id");
