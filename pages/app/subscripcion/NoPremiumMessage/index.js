import DivisorHr from "pages/atoms/DivisorHr";
import PaypalButton from "pages/atoms/PaypalButton";
import React from "react";

export default function NoPremiumMessage() {
  return (
    <>
      <p>Parece que no tienes premium 😭</p>

      <DivisorHr />

      <p>Métodos de pago</p>

      <PaypalButton />
    </>
  );
}
