# 🪙Pocket Money

A family-friendly web app for kids and parents! It helps children learn about setting money goals and keeping track of their spending.

## Table Of Content
<!--ts-->
   * [Tech Stack](#tech-stack)
   * [Key Features](#key-features)
      * [Code structure](#code-structure)
      * [Navigation on the App](#navigation-on-the-app)
         * [Administrator Mode](#administrator-mode)
            * [Overview](#overview)
            * [Budget](#budget)
            * [Pocket Money Planning](#pocket-money-planning)
            * [Users](#users)
            * [Tasks](#tasks)
         * [User Mode](#user-mode)
            * [Cash Flow](#cash-flow)
            * [Overview Page](#overview-page)
            * [Goals](#goals)
            * [Tasks](#tasks-1)
      * [Settings](#settings)
   * [Process](#process)
   * [Diagrams](#diagrams)
<!--te-->


## Tech stack 
Here's a brief overview of the tech stack the app uses:
- Frontend is built using React and incorporates Tailwind for enhanced styling.
- On the server side, NodeJs and Express handle backend operations, while Postgres, coupled with the Prisma library, manages the database interactions. 
### Key features

## Code structure

### Client-side code structure:

Admin pages
- src/pages/admin - Pages related to admin functionalities

User pages
- src/pages/user - Pages related to user functionalities

Shared pages
- src/pages/settings - Shared pages for settings functionalities
- src/pages/tasks - Shared pages for tasks functionalities
- src/pages/auth - Shared pages for authentication functionalities

Reusable components
- src/components/_basic/library - Reusable components for the application

Utilities and routes
- src/components/_basic/helpers - Utilities and helper functions

API and Hooks
- src/api - API related functionalities
- src/api/hooks/UseQueries - Hooks for API queries, used in conjunction with the `api` directory
### Server-side code structure:

- Schema: server/prisma 
- Roures: server/src/routes
- Utilities: server/src/utils

## Navigation on the app 
Create an account. After SignIn you'll be able to log in as an Administrator.

### Administrator mode
After you successfully register and log in you can find the Admin menu on the left, let's explore each page one by one:
#### Overview 
- Provide information on how kids handle money, compare the money allocated this month, track ongoing tasks set for children, and display a pie chart illustrating the allocation of income, expenses, and goals.
#### Budget
- Allow to set the budget for a particular month Pocket money allocation.
#### Pocket money planning
- Allow to allocate the Budget for a particular month between users
#### Users
- Allow the admin to add a new user to the Family, the user will get the email confirmation with a password.
- Admin can also edit and delete users.
#### Tasks
- Admin can assign a task to the user, with a possible reward after completion.

### User mode
For login use the password sent on the confirmation page

#### Cash flow
User tracks their money flow by clicking on "Add transaction", where they can choose between Income, Expenses, and Goals:

- Income and Expense are designed to track the cash flow. 
- Goals is a feature that works like a savings account. You can send some money on a concrete goal. 

#### Overview page 
- Provide information on how the user handles money, tracks ongoing tasks, and display a pie chart illustrating the allocation of money

#### Goals 
- Allow users to create, edit, and delete Goals. The progress bar shows the left amount to meet the goal.

#### Tasks
- Shows the user the tasks that have been assigned. Users can change the task status when the task is done. Admin then approves or declines the task. 

### Settings
- Allow to change personal information


## Process
1. Create ERD and Activity diagram to outline the structure and flow of the application
2. Establish the backend infrastructure, DB and Prisma
3. Connect frontend with backend
4. Develop and integrate the login functionality
5. Implement functionalities specific to the admin role
6. Develop functionalities related to regular users.
7. Implement common features, statistics
8. Bug fixing
9. Submit for a code review
10. Address feedback received and enhance code quality
12. Deploy the application
13. Update Read Me

### Diagrams
1. ![268653679-a5fb6302-4b4b-4d3a-9484-863a5ccc15bf (1)](https://github.com/ubungmeister/budgetapp/assets/106166590/3a46ec58-e342-481f-8db2-8ac027c1848d) 2. ![268653634-e0b5c685-8ff4-4163-9277-804ec65c1ef2 (2)](https://github.com/ubungmeister/budgetapp/assets/106166590/22549c97-a69f-4f3e-86c3-4e45610afed5)

1 Activity diagram    2.ERD diagram
