-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateTable
CREATE TABLE "Transacao" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "tipo_transacao" "TipoTransacao" NOT NULL DEFAULT 'ENTRADA',

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
