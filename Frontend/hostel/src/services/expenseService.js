import api from "./api";

const expenseService = {
  addExpense: (data) => api.post("/expenses", data),
  getExpenses: () => api.get("/expenses")
};

export default expenseService;
