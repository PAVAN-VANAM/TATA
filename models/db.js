const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query"],
});
// just to check Case of PRisma client 

/* async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.profile.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); */

export default prisma;
