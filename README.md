Expense Tracker Backend
📄 Project Description

A simple Expense Tracker API built with Node.js and Express.
It allows users to add, update, delete, and list expenses, as well as calculate totals and get top expenses.
The data is stored in-memory for simplicity, meaning it resets every time the server restarts.

⚡ Features

List all expenses (GET /expenses)
Filter by category (GET /expenses?category=Food)
Sort by amount or date (GET /expenses?sort=amount)
Add a new expense (POST /)
Update an existing expense (PATCH /:id)
Delete an expense (DELETE /:id)
Get total expense amount (GET /total)
Get top N expenses (GET /top?limit=3)

🛠 Installation & Running

Clone the repository

git clone <your-repo-url>
cd task-1


Install dependencies

npm install


Start the server

npm start


The server runs on http://localhost:3000/ by default.

Nodemon is used to auto-restart the server during development.

🔗 API Endpoints
1. Get all expenses
GET /expenses


Optional query params:

category → filter by category

sort → sort by amount or date

Example response:

{
  "success": true,
  "result": [
    { "id": "...", "title": "Coffee", "amount": 3.5, "category": "Food", "date": "2025-11-20" },
    ...
  ]
}

2. Add a new expense
POST /


Body (JSON):

{
  "title": "New Expense",
  "amount": 50,
  "category": "Food",
  "date": "2025-11-27"
}


Response:

{
  "success": true,
  "result": { "id": "...", "title": "New Expense", "amount": 50, "category": "Food", "date": "2025-11-27" }
}

3. Update an expense
PATCH /:id


Body (JSON):

{
  "title": "Updated Expense",
  "amount": 60
}


Only "title", "amount", "category", "date" can be updated.

4. Delete an expense
DELETE /:id


Response:

{
  "ok": true,
  "deleted": { "id": "...", "title": "Coffee", "amount": 3.5, "category": "Food", "date": "2025-11-20" }
}

5. Get total expenses
GET /total


Optional query param:

category → filter total by category

Response:

{ "total": 500 }

6. Get top expenses
GET /top?limit=3


limit is optional, default is 3

Response:

{
  "success": true,
  "result": [
    { "id": "...", "title": "IPhone 15", "amount": 196.45, "category": "Electronics", "date": "2025-11-22" },
    ...
  ]
}

⚠️ Notes

_Data is stored in-memory, so it resets every time the server restarts.
_Expense IDs are generated using UUID.
_Validation is done for title (required) and amount (must be > 0).