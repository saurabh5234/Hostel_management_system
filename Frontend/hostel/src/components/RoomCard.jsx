export default function RoomCard({ room, onEdit, onDelete }) {
  return (
    <div className="room-card">
      <div className="room-card-header">
        <h3>Room {room.number}</h3>
        <span className={`status-badge ${room.status}`}>
          {room.status}
        </span>
      </div>

      <div className="room-info">
        <p><b>Type:</b> {room.type}</p>
        <p><b>Floor:</b> {room.floor}</p>
        <p><b>Rent:</b> ₹{room.monthlyRent}</p>
        <p><b>Deposit:</b> ₹{room.securityDeposit}</p>
      </div>

      <div className="amenities">
        {room.amenities?.wifi && <span title="WiFi">📶</span>}
        {room.amenities?.ac && <span title="AC">❄️</span>}
        {room.amenities?.tv && <span title="TV">📺</span>}
        {room.amenities?.parking && <span title="Parking">🚗</span>}
        {room.amenities?.food && <span title="Food">🍽️</span>}
      </div>

      <div className="room-actions">
        <button onClick={() => onEdit(room)}>Edit</button>
        <button className="danger" onClick={() => onDelete(room._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
