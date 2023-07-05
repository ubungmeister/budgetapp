import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router();

const prisma = new PrismaClient();


router.get('/get-budget', async (req, res) => {

    const { monthYear, userID } = req.query 
    const adminID = userID as string;

    const admin = await prisma.user.findUnique({ where: { id: adminID } });
    const familyID =  admin.familyID;

    if (!monthYear) return res.status(400).json({ message: 'No monthYear provided' });

    // need to have an array of months a years to loop + 1 month
    const date = new Date(monthYear as string);
    const year = date.getFullYear();
    const month = date.getMonth()+1;


    // need to get 6 months in a row including the first that we got 

    const createAllMonths = async()=>{
        const arrayofMonth = [] as Array<any>

        for (let i = 0; i < 6; i++) {
            const newDate = new Date(year, month + i, 1);
            newDate.setUTCHours(0, 0, 0, 0);
            arrayofMonth.push(newDate.toISOString());
        }
        return arrayofMonth
    }

    try{
          const dates = await createAllMonths()
            //look in DB if the Budget with this monthYear exist
            const budget = await prisma.budget.findMany({
                where: {
                 month: {in: dates},
                 familyID: familyID
                }
            })
            res.status(200).json({budget})
    }catch(error){}

    

})

router.post('/update-budget', async (req, res) => {

    const {budget, userID} = req.body
    const adminID = userID;

    const admin = await prisma.user.findUnique({ where: { id: adminID } });
    const familyID =  admin.familyID;

    for(let i = 0; i < budget.length; i++){
        if(budget[i].id){
            await prisma.budget.update({
                where: {id: budget[i].id},
                data: {amount: budget[i].amount}
            })
        }else{
            await prisma.budget.create({
                data: {
                    month: budget[i].month,
                    amount: budget[i].amount,
                    familyID: familyID
                }
            })
        }
    }
    res.status(200).json({message: 'Budget updated'})

})






export {router as budgetRouter}