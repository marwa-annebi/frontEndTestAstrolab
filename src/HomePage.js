import { Paper } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parking from "./assets/parking.jpg";
import Button from "./Button";
export default function HomePage() {
  const navigate = useNavigate();
  const [parkings, setparkings] = useState([]);
  const loadParkings = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const result = await axios.get(
      "http://localhost:5000/parking/getAllParkings",
      config
    );
    setparkings(result.data.reverse());
  };
  useEffect(() => {
    loadParkings();
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${parking})`,
        width: "100vw",
        height: "100vh",
        margin: "auto",
      }}
    >
      {/* <div> */}
      <div
        style={{
          textAlign: "center",
          justifyContent: "space-between",
        }}
      >
        {parkings?.map((item, key) => {
          return (
            <Paper
              style={{ width: "200px", marginTop: "-20px", marginLeft: "10px" }}
            >
              <h2>{item.parking_name}</h2>
              <p>{item.details.address_1}</p>
              <p>{item.details.address_2}</p>
              <Button
                text="park my car"
                color="primary"
                // style={{ marginTop: "20%" }}
                onClick={() => navigate(`/InputTypevehicule/${item._id}`)}
              ></Button>
              <Button
                text="unpark my car"
                color="default"
                // style={{ marginTop: "20%" }}
                onClick={() => navigate("/unparkvehicule")}
              ></Button>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}
