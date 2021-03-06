import { purchaseSubscription } from "helpers/apis/subscription";
import React, { useState } from "react";
import scss from "./styles.module.scss";
import { SpinnerDotted } from "spinners-react";

export default function PaypalButton() {
  const [isOnProcess, setIsOnProcess] = useState(false);

  const handleClick = async () => {
    setIsOnProcess(true);

    const { id, links, status } = await purchaseSubscription();

    const linkRedirect = links.find((link) => link.rel === "approve");

    window.location.href = linkRedirect.href;

    setIsOnProcess(false);
  };

  return isOnProcess ? (
    <div className={scss.loading}>
      <SpinnerDotted />
      <p>Un momento...</p>
    </div>
  ) : (
    <button className={scss.paypalButton} onClick={handleClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/paypal.png" alt="paypal_logo" />
    </button>
  );
}
