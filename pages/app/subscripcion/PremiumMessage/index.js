import React from "react";
import { useContext } from "react";
import { ContextSubscription } from "..";

export default function PremiumMessage() {
  const { subscription } = useContext(ContextSubscription);
  return subscription === undefined ? null : (
    <>
      <p>ยกTu cuenta es premium! ๐</p>
      <p>
        Disfruta de los beneficios hasta el{" "}
        <time dateTime={subscription.date}>
          {new Intl.DateTimeFormat("es-MX", {
            dateStyle: "long",
          }).format(new Date(subscription.date))}
        </time>
      </p>
      <p>๐</p>
    </>
  );
}
