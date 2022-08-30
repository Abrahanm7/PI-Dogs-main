import React from "react";
import { Link } from "react-router-dom";
import l from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={l.backg}>
      <h1 className={l.title}>huellitas</h1>
      <Link to="/home">
        <button className={l.butt}>INGRESAR</button>
      </Link>
    </div>
  );
}
