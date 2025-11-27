import express from "express";
import morgan from "morgan";
import cors from "cors";
import expensesRouter from "./routes/expenses.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Expense Tracker API (backend)" });
});

app.use("/", expensesRouter);
// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ json: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running at port: http://localhost:${PORT}`);
});
