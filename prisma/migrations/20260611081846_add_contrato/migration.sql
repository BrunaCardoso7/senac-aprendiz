-- CreateTable
CREATE TABLE "Contrato" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "unidade" TEXT,
    "curso" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "final" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
