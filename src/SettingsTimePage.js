import { CircularProgress, Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import parking from "./assets/parking.jpg";
import Button from "./Button";
import Notification from "./Notification";
import axios from "axios";
export default function SettingsTimePage() {
  const [entry_time, setentry_time] = useState("");
  const [exit_time, setexit_time] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const location = useLocation();
  const { state } = location;
  let result = state;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setloading(true);
      const { data } = await axios.post(
        `http://localhost:5000/ticket/givenTicket/${result._id}`,
        { entry_time, exit_time },
        config
      );
      if (data) navigate("/TicketPage", { state: data });
    } catch (error) {
      setloading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${parking})`,
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        margin: "auto",
      }}
    >
      {loading && <CircularProgress color="inherit" />}
      <Notification
        notify={notify}
        setNotify={setNotify}
        vertical="top"
        horizontal="right"
      />
      <Paper
        style={{
          borderRadius: 25,
          width: "500px",
          height: "250px",
          backgroundColor: "#E0E0E0",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "5%",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12} item>
            {" "}
            <div
              style={{
                fontFamily: "cerapro-Medium",
                marginTop: "-20px",
                color: "var(--cod-gray)",
                fontSize: "18px",
              }}
            >
              Your vehicule will be parked in the slot number{" "}
              <b style={{ color: "var(--mahogany-3)", fontSize: "20px" }}>
                {result.slot_number}
              </b>{" "}
              in the{" "}
              <b style={{ color: "var(--mahogany-3)", fontSize: "20px" }}>
                {result.floor_id.floor_number}
              </b>{" "}
              floor
            </div>
            <br></br>
            <div
              style={{
                fontFamily: "cerapro-Medium",
                color: "var(--heavy-metal)",
                fontSize: "15px",
              }}
            >
              Enter the Entry time and The Exit Time
            </div>
          </Grid>
          <Grid xs={6} item>
            Entry Time
          </Grid>
          <Grid xs={6} item>
            <input
              type="time"
              id="appt"
              name="appt"
              value={entry_time}
              onChange={(e) => setentry_time(e.target.value)}
              required
            ></input>
          </Grid>
          <Grid xs={6} item>
            Exit Time
          </Grid>
          <Grid xs={6} item>
            <input
              type="time"
              id="appt"
              name="appt"
              value={exit_time}
              onChange={(e) => setexit_time(e.target.value)}
              required
            ></input>
          </Grid>

          <Grid xs={12} item>
            <Button
              text="submit"
              color="primary"
              onClick={(e) => handleSubmit(e)}
            ></Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
