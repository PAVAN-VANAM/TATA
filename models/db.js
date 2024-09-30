const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const newBatch = await prisma.batch.create({
//     data: {
//       batch_name: 'vihaan-3yr-MERN-Batch-A',
//       faculty: 'Pavan',
//       token: 'batch2024-token',
//     },
//   });
//   console.log('New Batch:', newBatch);

//   // 2. Create a Profile
//   const newProfile = await prisma.profile.create({
//     data: {
//       userId: '21AG1A0563',
//       name: 'PAVAN VANAM',
//       password: '12345',
//       department: '4yr-CSE-A',
//       batchIds: [newBatch.batchId], // Linking to the batch created above
//     },
//   });
//   console.log('New Profile:', newProfile);

//   // 3. Create Attendance for the Profile in the Batch
//   const newAttendance = await prisma.attendance.create({
//     data: {
//       userId: newProfile.profileId,
//       batchId: newBatch.batchId,
//       attendance: true, // Marking attendance as "present"
//     },
//   });
//   console.log('New Attendance:', newAttendance);

//   // 4. Read all Profiles
//   const profiles = await prisma.profile.findMany({
//     include: {
//       attendance: true, // Include attendance relation
//     },
//   });
//   console.log('All Profiles:', profiles);

//   /* // 5. Update Attendance
//   const updatedAttendance = await prisma.attendance.update({
//     where: {
//       attendanceId: newAttendance.attendanceId,
//     },
//     data: {
//       attendance: false, // Change to "absent"
//     },
//   });
//   console.log('Updated Attendance:', updatedAttendance);

//   // 6. Delete a Profile
//   const deletedProfile = await prisma.profile.delete({
//     where: {
//       userId: newProfile.userId,
//     },
//   });
//   console.log('Deleted Profile:', deletedProfile); */
  
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

module.exports = prisma;
