import { useEffect, useState } from "react";
import paymentService from "../../services/paymentService";
import "./StudentPayments.css";
import jsPDF from "jspdf";

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchPayments = async () => {
  try {
    const data = await paymentService.getPayments();
    setPayments(data);
  } catch (err) {
    console.error(err);
    alert("Failed to load payments");
  } finally {
    setLoading(false);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", { month: "long" });
};

const downloadReceipt = (payment) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Hostel Payment Receipt", 20, 20);

  doc.setFontSize(12);
  doc.text(`Student Name: ${payment.tenant?.name || "Student"}`, 20, 40);
  doc.text(`Room Number: ${payment.room?.number || "-"}`, 20, 50);
  doc.text(`Amount Paid: ₹${payment.amount}`, 20, 60);
  doc.text(`Payment Status: ${payment.status}`, 20, 70);
  doc.text(`Payment Month: ${getMonthName(payment.createdAt)}`, 20, 80);
  doc.text(`Payment Date: ${formatDate(payment.createdAt)}`, 20, 90);

  doc.text("Thank you for your payment.", 20, 115);

  doc.save(`Payment_Receipt_${payment._id}.pdf`);
};


  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <p>Loading payment history...</p>;

  return (
    <div className="student-payments-page">
      <h2>My Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Receipt</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{getMonthName(payment.createdAt)}</td>
                <td>₹{payment.amount}</td>
                <td>
                  <span className={`status ${payment.status}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{formatDate(payment.createdAt)}</td>
                <td>
                  <button
  className="receipt-btn"
  onClick={() => downloadReceipt(payment)}
>
  Download
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
