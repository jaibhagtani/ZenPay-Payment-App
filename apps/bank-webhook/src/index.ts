import express from "express"
import { prisma } from "@repo/db/client"
const app = express();
// This is the endpoint that HDFC bank will hit, when it pays some money
// To put transfer 
const port = 9999;
app.use(express.json())

// console.log(port)
app.post("/hdfcWebhook", async (req, res) => {
    // *********************************************************
    // ****************(TODO)*****************
    // 1. Add zod validation here
    // 2. Check if this request actually came from hdfc bank, use a webHook secret
    // 3. Check if this onrampTxn is processing or Notification, and only once  
    const paymentInformation = {
        token: req.body.token,
        // userId in Our DB 
        userId: req.body.user_indentifier,
        // amount that is needed to be credit to this userID
        amount: req.body.amount
    }
    // console.log(paymentInformation);
    // Update the userbalance in DB, add txn
    // Single request is more efficient 

    // Transactions => Either both update should happen or none can happen
    try {
        
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token,
                },
                data : {
                    // amount: Number(paymentInformation.amount),
                    status: "Success"
                }
            })
        ]);
            // To tell the HDFC server with status 200
            // ******** V.V.V.V. IMP ********
            // ************** SUPER IMP **************
            // if sent bad status code 411, then they will assume that not able to capture
            // and then they will refund this amount to user
        
            // BE VERY CAREFULL WHILE RETURNING STATUS CODE
            res.status(200).json({
                msg : "Captured"
            })
        }
    
        catch(e)
        {
            // console.error(e);
            res.status(411).json({
                msg : "Error while processing webhook"
            })
        }
})  

app.listen(port);