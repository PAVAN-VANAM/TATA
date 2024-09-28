-- CreateTable
CREATE TABLE "Profile" (
    "user_id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "batch_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "batch_id" VARCHAR(255) NOT NULL,
    "batch_name" VARCHAR(255) NOT NULL,
    "faculty" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("batch_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" VARCHAR(100) NOT NULL,
    "attendance" BOOLEAN NOT NULL DEFAULT false,
    "batch_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Batch_batch_name_key" ON "Batch"("batch_name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("batch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("batch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
