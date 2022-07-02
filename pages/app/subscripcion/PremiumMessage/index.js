import React from "react";
import { useContext } from "react";
import { ContextSubscription } from "..";

export default function PremiumMessage() {
  const { subscription } = useContext(ContextSubscription);

  return (
    <>
      <p>¡Tu cuenta es premium! 👑</p>
      <p>
        Disfruta de los beneficios hasta el{" "}
        <date time={subscription.date}>
          {new Intl.DateTimeFormat("es-MX", {
            dateStyle: "long",
          }).format(new Date(subscription.date))}
        </date>
      </p>
      <p>😁</p>
    </>
  );
}
