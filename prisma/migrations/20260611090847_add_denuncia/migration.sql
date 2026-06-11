-- CreateTable
CREATE TABLE "denuncias" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "dataOcorido" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "testemunhas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "denuncias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "denuncias" ADD CONSTRAINT "denuncias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
