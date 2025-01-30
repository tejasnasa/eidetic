-- CreateTable
CREATE TABLE "numbers_rec" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "numbers_rec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simon_rec" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simon_rec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiles_rec" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tiles_rec_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "numbers_rec_id_key" ON "numbers_rec"("id");

-- CreateIndex
CREATE UNIQUE INDEX "simon_rec_id_key" ON "simon_rec"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tiles_rec_id_key" ON "tiles_rec"("id");
