-- CreateTable
CREATE TABLE "Meta" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "valor_atual" DOUBLE PRECISION NOT NULL,
    "cor" TEXT,
    "tipo_transacao" "TipoTransacao" NOT NULL DEFAULT 'ENTRADA',

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
