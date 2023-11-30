import express from "express"
import { PrismaClient } from "@prisma/client"
import { monthFunction } from "../utils/helpers"
const router = express.Router();

const prisma = new PrismaClient();



router.get('/get-cash-flow', async (req, res) => {
    const { monthYear, userID } = req.query;
    if(!userID) return res.status(400).json({ message: 'No userId provided' });
    
    const {newDate, endOfMonth} = monthFunction(monthYear as string);


    const pocketMoney = await prisma.pocketMoney.findFirst({
        where: {
            userId: userID as string,
            month: newDate,
        }
    })
    if( pocketMoney === null) {
        
    }
    const cashFlow = await prisma.incomeOutcome.findMany({
        where: {
            userId: userID as string,
            start_date: {
        gt: newDate,
        lte: endOfMonth,
      },
            
        }
    })
    res.status(200).json({ cashFlow});

})

router.post('/edit-cash-flow', async (req, res) => {
    const { id, amount, category, description, start_date, userId, saving_goal_Id,category_type} = req.body;
    
    let amountNumber = amount
    if(category_type === 'Income'){
        amountNumber = Math.abs(amount)
    }
    
    if(id){
        const updatedCashFlow = await prisma.incomeOutcome.update({
            where: {id: id as string},
            data: {
                amount: amountNumber,
                category: category,
                description: description,
                start_date: start_date,
                userId: userId,
                saving_goal_Id: saving_goal_Id as string,
                category_type: category_type as string,
            }
        })
        res.status(200).json({ updatedCashFlow })
    }
     else{
        const newCashFlow = await prisma.incomeOutcome.create({
            data: {
                amount: amountNumber,
                category: category,
                description: description,
                start_date: start_date,
                userId: userId,
                saving_goal_Id: saving_goal_Id as string,
                category_type: category_type as string,
            }
        })
        res.status(200).json({ newCashFlow });
     }
})

router.delete('/delete-cash-flow', async (req, res) => {
    
    const { id } = req.body;
    const deletedCashFlow = await prisma.incomeOutcome.delete({
        where: {id: id as string}
    })
    res.status(200).json({ deletedCashFlow })
})

router.get('/get-cash-flow-family', async (req, res) => {
    // getting all incomes and outcomes for a family for a given month
    const { monthYear, userID } = req.query;
    if(!userID) return res.status(400).json({ message: 'No userId provided' });    

    const admin = await prisma.user.findUnique({where: {id:userID as string}})
    if(admin.role !== "ADMIN") return res.status(400).json({ message: 'Only admin can delete task' })

    const users = await prisma.user.findMany({
        where: {
            family: {
                id: admin.familyID
            }
        }
    
    })
    
    const {newDate, endOfMonth} = monthFunction(monthYear as string);

    const cashFlow = await prisma.incomeOutcome.findMany({
        where: {
            userId: {
                in: users.map(user => user.id)
            },
             start_date: {
        gt: newDate,
        lte: endOfMonth,
      },
        }
    })
    console.log(cashFlow)
    res.status(200).json(cashFlow);
})


export { router as cashFlowRouter };