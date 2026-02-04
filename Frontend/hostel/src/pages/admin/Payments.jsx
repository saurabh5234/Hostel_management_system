import { useEffect, useState } from "react";
import paymentService from "../../services/paymentService";
import AddPaymentModal from "../../components/AddPaymentModal"; // ✅ FIX 1
import "./Payments.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPayments = async () => {
    const data = await paymentService.getPayments();
    setPayments(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPayments();
    };
    fetchData();
  }, []);

  return (
    <div className="payments-page">
      <h2>Payments Management</h2>

      {/* Summary Cards */}
      <div className="payment-cards">
        <div className="card">Total Payments: {payments.length}</div>
        <div className="card">
          Paid: {payments.filter(p => p.status === "paid").length}
        </div>
        <div className="card">
          Pending: {payments.filter(p => p.status === "pending").length}
        </div>
      </div>

      {/* Actions */}
      <div className="payments-actions">
        <button onClick={() => setShowModal(true)}>
          + Record Payment
        </button>
      </div>

      {/* Payments List */}
      <div className="payments-list">
        {payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          payments.map(payment => (
            <div key={payment._id} className="payment-row">
              <p><b>Tenant:</b> {payment.tenant?.name}</p>
              <p><b>Room:</b> {payment.room?.number}</p>
              <p><b>Amount:</b> ₹{payment.amount}</p>
              <p><b>Status:</b> {payment.status}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddPaymentModal
          onClose={() => setShowModal(false)}
          onPaymentAdded={fetchPayments}
        />
      )}
    </div>
  );
}
