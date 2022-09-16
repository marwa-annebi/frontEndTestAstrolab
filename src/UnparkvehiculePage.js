import { CircularProgress, Grid, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import parking from "./assets/parking.jpg";
import Button from "./Button";
import Notification from "./Notification";

export default function UnparkvehiculePage() {
  const [ticketId, setticketId] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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
        "http://localhost:5000/ticket/unparkVehicule",
        { _id_ticket: ticketId },
        config
      );
      if (data) navigate("/", { state: data });
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
        alignItems: "center",
      }}
    >
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
        {loading && <CircularProgress color="inherit" />}

        <Grid container spacing={2}>
          <Grid xs={12} item>
            <h4 style={{ fontFamily: "cerapro-Medium" }}>
              input the ticket id{" "}
            </h4>
            <TextField
              value={ticketId}
              onChange={(e) => setticketId(e.target.value)}
            ></TextField>
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
