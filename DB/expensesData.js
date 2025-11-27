// data.js
import { randomUUID } from "crypto";

export let expenses = [
  {
    id: randomUUID(),
    title: "Coffe",
    amount: 3.5,
    category: "Food",
    date: "2025-11-20",
  },
  {
    id: randomUUID(),
    title: "IPhone 15",
    amount: 196.45,
    category: "Electronics",
    date: "2025-11-22",
  },
  {
    id: randomUUID(),
    title: "Groceries",
    amount: 47.45,
    category: "Food",
    date: "2025-11-21",
  },
  {
    id: randomUUID(),
    title: "IPhone 16",
    amount: 245.45,
    category: "Electronics",
    date: "2025-11-22",
  },
];
