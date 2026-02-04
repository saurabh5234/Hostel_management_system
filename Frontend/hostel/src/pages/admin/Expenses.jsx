import { useEffect, useState } from "react";
import expenseService from "../../services/expenseService";
import "./Expenses.css";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "other",
    amount: "",
    description: ""
  });

  const loadExpenses = async () => {
    try {
      const res = await expenseService.getExpenses();
      // Backend returns array directly
      setExpenses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load expenses", err);
      alert("Failed to load expenses");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const month = new Date().toISOString().slice(0, 7); // YYYY-MM

      await expenseService.addExpense({
        ...form,
        month
      });

      setForm({
        name: "",
        category: "other",
        amount: "",
        description: ""
      });

      alert("Expense added successfully!");
      loadExpenses();
    } catch (err) {
      console.error("Failed to add expense", err);
      alert(`Failed to add expense: ${err.response?.data?.message || err.message}`);
    }
  };


  const total = expenses.reduce(
  (sum, e) => sum + Number(e.amount || 0),
  0
);

  return (
    <div className="expenses-page">
      <h2>Expenses</h2>

      {/* Summary */}
      <div className="expense-summary">
        <div className="summary-card">
          <h4>Total Expenses</h4>
          <p>₹{total}</p>
        </div>
      </div>

      {/* Add Expense */}
    <form className="expense-form" onSubmit={handleSubmit}>
  <h3>Add New Expense</h3>

  <div className="form-grid">
    <input
      type="text"
      name="name"
      placeholder="Expense Name"
      value={form.name}
      onChange={handleChange}
      required
    />

    <select
      name="category"
      value={form.category}
      onChange={handleChange}
    >
      <option value="electricity">Electricity</option>
      <option value="water">Water</option>
      <option value="maintenance">Maintenance</option>
      <option value="repair">Repair</option>
      <option value="salary">Salary</option>
      <option value="food">Food</option>
      <option value="internet">Internet</option>
      <option value="other">Other</option>
    </select>

    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={form.amount}
      onChange={handleChange}
      required
    />

    <textarea
      name="description"
      placeholder="Description"
      value={form.description}
      onChange={handleChange}
    />
  </div>

  {/* ✅ ONLY BUTTON, NO INNER FORM */}
  <button type="submit" className="add-btn">
    Add Expense
  </button>
</form>



      {/* Expense List */}
      <div className="expense-table">
        <h3>Expense History</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.category}</td>
                <td>₹{e.amount}</td>
                <td>{new Date(e.expenseDate).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
