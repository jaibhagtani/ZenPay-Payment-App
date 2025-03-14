import {PrismaClient} from "@prisma/client"
import { hash } from "bcrypt";
const prisma = new PrismaClient();

async function main()
{
    // if already made then, update or create
    const jai = await prisma.user.upsert({
        where: {
            number: "2"
        },
        update: {},
        create: {
            number: "2",
            password: await hash("mohit", 10),
            name: "mohit",
            
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 628793,
                    token: "130",
                    provider: "HDFC Bank",
                },
            },
        },
    })


//     const bob = await prisma.user.upsert({
//         where: {
//             number: "9999999998"
//         },
//         update: {},
//         create: {
//             number: "9999999998",
//             password: "bob",
//             name: "bob",

//             OnRampTransaction: {
//                 create: {
//                     startTime: new Date(),
//                     status: "Failure",
//                     amount: 2000,
//                     token: "123",
//                     provider: "HDFC Bank",
//                 },
//             },
//         },
//     })
//     console.log({alice, bob});
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})