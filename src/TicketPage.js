import React from "react";
import { useLocation } from "react-router";
import QRCode from "react-qr-code";
export default function TicketPage() {
  const location = useLocation();
  const { state } = location;
  let data = state;
  // alert(data);
  return (
    <div
      style={{
        fontFamily: "cerapro-Medium",
        textAlign: "center",
      }}
    >
      <h3>
        floor number :{" "}
        <b style={{ color: "var(--mahogany-3)", fontSize: "20px" }}>
          {data.slot.floor_id.floor_number}
        </b>
      </h3>
      <h3>
        Slot number :{" "}
        <b style={{ color: "var(--mahogany)" }}>{data.slot.slot_number}</b>
      </h3>
      <h3>
        Entry Time :{" "}
        <b style={{ color: "var(--mahogany)" }}>{data.ticket.entry_time}</b>
      </h3>
      <h3>
        Exit Time :{" "}
        <b style={{ color: "var(--mahogany)" }}>{data.ticket.exit_time}</b>
      </h3>
      <p>Scan this QR code.</p>
      <QRCode value={data.ticket._id_ticket} />
      <h5 style={{ color: "green" }}>{data.ticket._id_ticket}</h5>
    </div>
  );
}
