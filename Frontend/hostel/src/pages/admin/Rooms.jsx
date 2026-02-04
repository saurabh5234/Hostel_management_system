import { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard";
import roomService from "../../services/roomService";
import AddRoomModal from "../../components/AddRoomModal";
import "./Rooms.css";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // ✅ DEFINE FUNCTION FIRST
  const fetchRooms = async () => {
    const data = await roomService.getRooms();
    setRooms(data);
  };

  // ✅ THEN USE IT
  useEffect(() => {
    (async () => {
      const data = await roomService.getRooms();
      setRooms(data);
    })();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    if (!room?.number) return false;

    const matchesSearch = room.number
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status ? room.status === status : true;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteRoom = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this room?"
  );

  if (!confirmDelete) return;

  try {
    await roomService.deleteRoom(id);
    fetchRooms(); // refresh list
  } catch {
    alert("Failed to delete room");
  }
};


  return (
    <div className="rooms-page">
      <h2>Rooms Management</h2>

      <div className="rooms-actions">
        <input
          type="text"
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <button className="add-room-btn" onClick={() => setShowModal(true)}>
          + Add Room
        </button>
      </div>

    <div className="rooms-grid">
  {filteredRooms.map((room) => (
    <RoomCard
      key={room._id}
      room={room}
      onEdit={(room) => {
        setSelectedRoom(room);
        setShowModal(true);
      }}
      onDelete={handleDeleteRoom}
    />
  ))}
</div>



      {/* ✅ MODAL RENDERED INSIDE JSX */}
      {showModal && (
  <AddRoomModal
    onClose={() => {
      setShowModal(false);
      setSelectedRoom(null);
    }}
    onRoomAdded={fetchRooms}
    roomData={selectedRoom}
  />
)}

    </div>
  );
}
