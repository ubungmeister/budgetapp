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
    console.log('cashFlow: ', cashFlow);
    res.status(200).json({ cashFlow});

})

router.post('/add-cash-flow', async (req, res) => {
    const { amount, category, description, start_date, userId } = req.body;
    console.log('req.body: ', req.body);
    const newCashFlow = await prisma.incomeOutcome.create({
        data: {
            amount: amount,
            category: category,
            description: description,
            start_date: start_date,
            userId: userId,
        }
    })
    res.status(200).json({ newCashFlow });
})



export { router as cashFlowRouter };