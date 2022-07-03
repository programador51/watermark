import React from "react";
import { useContext } from "react";
import { ContextSubscription } from "..";

export default function PremiumMessage() {
  const { subscription } = useContext(ContextSubscription);

  console.log(subscription);

  return subscription === undefined ? null : (
    <>
      <p>¡Tu cuenta es premium! 👑</p>
      <p>
        Disfruta de los beneficios hasta el{" "}
        <time dateTime={subscription.date}>
          {new Intl.DateTimeFormat("es-MX", {
            dateStyle: "long",
          }).format(new Date(subscription.date))}
        </time>
      </p>
      <p>😁</p>
    </>
  );
}
