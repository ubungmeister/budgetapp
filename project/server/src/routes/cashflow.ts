import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router();

const prisma = new PrismaClient();

router.get('/get-cash-flow', async (req, res) => {
    const { monthYear, userID } = req.query;
    if(!userID) return res.status(400).json({ message: 'No userId provided' });
    
    const date = new Date(monthYear as string);
    const year = date.getFullYear();
    const month = date.getMonth()+1;

    const newDate = new Date(year, month - 1, 1);
  newDate.setUTCHours(0, 0, 0, 0);


  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const endOfMonth = new Date(nextYear, nextMonth - 1, 1);
  endOfMonth.setUTCHours(0, 0, 0, 0);


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

router.post('/add-cash-flow', async (req, res) => {
    const { amount, category, description, start_date, userId, goalId } = req.body;
    console.log(req.body)
    const newCashFlow = await prisma.incomeOutcome.create({
        data: {
            amount: amount,
            category: category,
            description: description,
            start_date: start_date,
            userId: userId,
            saving_goal_Id: goalId as string,
        }
    })
    res.status(200).json({ newCashFlow });
})

router.post('/update-cash-flow', async (req, res) => {
    const { id, amount, category, description, start_date, userId, goalId } = req.body;
    const updatedCashFlow = await prisma.incomeOutcome.update({
        where: {id: id as string},
        data: {
            amount: amount,
            category: category,
            description: description,
            start_date: start_date,
            userId: userId,
            saving_goal_Id: goalId as string,
        }
    })
    res.status(200).json({ updatedCashFlow })
})



export { router as cashFlowRouter };