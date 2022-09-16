import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SettingsTimePage from "./SettingsTimePage";
import TicketPage from "./TicketPage";
import UnparkvehiculePage from "./UnparkvehiculePage";
import VehiculeType from "./VehiculeType";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" exact></Route>
        <Route
          element={<VehiculeType />}
          path="/InputTypevehicule/:id"
          exact
        ></Route>
        <Route element={<SettingsTimePage />} path="/SettingsTime/:id"></Route>{" "}
        <Route element={<TicketPage />} path="/TicketPage" exact></Route>
        <Route
          element={<UnparkvehiculePage />}
          path="/unparkvehicule"
          exact
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
