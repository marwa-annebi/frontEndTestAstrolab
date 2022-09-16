import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import parking from "./assets/parking.jpg";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "./Notification";
import axios from "axios";

export default function VehiculeType() {
  const [loading, setloading] = useState(false);
  const [typeSlot, settypeSlot] = useState("");
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [typesVehicule, settypesVehicule] = useState([]);

  const loadTypes = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const result = await axios.get(
      "http://localhost:5000/vehiculeType/getAllVehiculeTypes",
      config
    );
    settypesVehicule(result.data.reverse());
  };
  useEffect(() => {
    loadTypes();
  }, []);
  let id = useParams();
  console.log(id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setloading(true);
      // console.log(typeSlot);
      const { data } = await axios.get(
        `http://localhost:5000/slot/avilableSlot/${id.id}/${typeSlot}`,
        config
      );
      if (data) navigate(`/SettingsTime/${id.id}`, { state: data });
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
      <form>
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
          <Grid
            container
            spacing={2}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <Grid xs={6} item>
              <FormControl
                fullWidth
                sx={{ m: 1, width: 200 }}
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-family-cerapro-medium)",
                  justifyContent: "center",
                  border: "0px",
                }}
              >
                <InputLabel
                  style={{
                    textAlign: "center",
                    fontFamily: "var(--font-family-cerapro-medium)",
                    justifyContent: "center",
                  }}
                >
                  Type Vehicule
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={typeSlot}
                  onChange={(e) => settypeSlot(e.target.value)}
                  name="type"
                  style={{ border: "3px solid gold", borderRadius: "49px" }}
                >
                  <MenuItem value="">
                    <em>none</em>
                  </MenuItem>
                  {typesVehicule?.map((key) => (
                    <MenuItem
                      value={key._id}
                      style={{
                        fontFamily: "var(--font-family-cerapro-medium)",
                      }}
                    >
                      {key.name}
                      <img
                        src={key.picture}
                        style={{ width: "50px", marginLeft: "80px" }}
                        alt={key.name}
                      />{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <Button
                text="submit"
                color="primary"
                style={{ marginTop: "20%" }}
                onClick={(e) => handleSubmit(e)}
              ></Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}
