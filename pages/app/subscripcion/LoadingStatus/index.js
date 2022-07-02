import React from "react";
import { SpinnerDotted } from "spinners-react";
import scss from "../styles.module.scss";

export default function LoadingStatus() {
  return (
    <div className={scss.loadingSubscription}>
      <SpinnerDotted />
      <span>Cargando informacion...</span>
    </div>
  );
}
