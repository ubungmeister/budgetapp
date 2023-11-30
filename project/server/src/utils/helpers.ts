
const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kidbugetapp@gmail.com',
        pass: 'xrwneibpcoeiwkwe'
  }
    });

export const monthFunction = (monthYear: string) => {
    const date = new Date(monthYear as string);
    const year = date.getFullYear();
    const month = date.getMonth()+1;

    const newDate = new Date(year, month - 1, 1);
    newDate.setUTCHours(0, 0, 0, 0);


  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const endOfMonth = new Date(nextYear, nextMonth - 1, 1);
  endOfMonth.setUTCHours(0, 0, 0, 0);

  return {newDate, endOfMonth}
}
