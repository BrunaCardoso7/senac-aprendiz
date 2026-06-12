-- CreateTable
CREATE TABLE "ajudas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ajudas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ajudas" ADD CONSTRAINT "ajudas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
