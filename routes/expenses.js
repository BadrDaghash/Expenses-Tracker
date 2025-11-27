import Router from "router";
import { randomUUID } from "crypto";
import { expenses } from "../DB/expensesData.js";
import { isValidExpensePayload } from "../utils/validation.js";

const router = Router();

/**
 * GET /expenses
 * List all expenses, with optional filtering by category and sorting
 */
router.get("/expenses", (req, res) => {
  const { category, sort } = req.query;

  let result = category
    ? expenses.filter(
        (e) => e.category.toLowerCase() === category.toLowerCase()
      )
    : [...expenses];

  result = result.map(({ id, title, amount, category, date }) => ({
    id,
    title,
    amount: Number(amount),
    category,
    date,
  }));

  if (sort === "amount") {
    result.sort((a, b) => a.amount - b.amount);
  } else if (sort === "date") {
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  res.json({ success: true, result });
});

/**
 * GET /top
 * Return the top N expenses by amount (default 3)
 */
router.get("/top", (req, res) => {
  const limit = Math.max(1, Number(req.query.limit) || 3);

  const top = [...expenses]
    .sort((a, b) => Number(a.amount) - Number(b.amount))
    .slice(0, limit)
    .map(({ id, title, amount, category, date }) => ({
      id,
      title,
      amount,
      category,
      date,
    }));
  res.json({ success: true, result: top });
});

/**
 * GET /total
 * Return the total expense amount, optionally filtered by category
 */
router.get("/total", (req, res) => {
  const { category } = req.query;

  const list = category
    ? expenses.filter(
        (e) => e.category.toLowerCase() === category.toLowerCase()
      )
    : expenses;

  const total = list.reduce((sum, e) => sum + Number(e.amount), 0);
  res.json({ total });
});

/**
 * POST /
 * Add a new expense
 */
router.post("/", (req, res) => {
  const payload = req.body;

  const {
    title,
    amount,
    category = "Uncategorized",
    date = new Date().toISOString().slice(0,10),
  } = payload;

  const validation = isValidExpensePayload({ title, amount });
  if (!validation.ok) {
    return res.status(400).json({ error: validation.message });
  }

  const newExpense = {
    id: randomUUID(),
    title: title.toString().trim(),
    amount: Number(amount),
    category: category.toString(),
    date: String(date),
  };

  expenses.push(newExpense);

  res.status(201).json({ success: true, result: newExpense });
});

/**
 * DELETE /:id
 * Delete an expense by ID
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const existing = expenses.find((e) => e.id === id);
  if (!existing) {
    return res.status(404).json({ error: "Expense not found" });
  }
  expenses = expenses.filter((e) => e.id !== id);

  res.json({ ok: true, deleted: existing }); 

});

/**
 * PATCH /:id
 * Update an existing expense by ID
 */
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};

  const idx = expenses.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ error: "Expense not found" });

  const allowed = ["title", "amount", "category", "date"];
  const sanitized = {};

  allowed.forEach(key => {
    if (key in updates) sanitized[key] = updates[key];
  });

  if ("amount" in sanitized) {
    const num = Number(sanitized.amount);
    if (Number.isNaN(num) || num <= 0) {
      return res.status(400).json({ error: "amount must be a number greater than 0" });
    }
    sanitized.amount = num;
  }

  expenses[idx] = { ...expenses[idx], ...sanitized };

  res.json(expenses[idx]);
});


export default router;
