import Content from "pages/structure/LayoutContent";
import React from "react";
import App from "..";
import { SpinnerDotted } from "spinners-react";
import scss from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { attemptConfirmPayment } from "helpers/apis/subscription";
import { useState } from "react";
import PaypalButton from "pages/atoms/PaypalButton";
import Button from "pages/atoms/Button";
import useNavigation from "customHooks/useNavigation";

export default function ProcessingPayment() {
  const { query } = useRouter();

  const [wasConfirmed, setWasConfirmed] = useState(undefined);

  const { redirectToSell } = useNavigation();

  useEffect(() => {
    (async function () {
      if (query.token === undefined || query.PayerID === undefined) return;

      const { data, status } = await attemptConfirmPayment(
        query.token,
        query.PayerID
      );

      if (status === 200) {
        setWasConfirmed(true);
        return;
      }
      setWasConfirmed(false);
    })();
  }, [query]);

  return (
    <App>
      <Content>
        <div className={scss.payment}>
          {wasConfirmed === undefined ? (
            <>
              <SpinnerDotted />
              <p>💰 Procesando pago, no cierres esta ventana...</p>
            </>
          ) : wasConfirmed === true ? (
            <>
              <p>
                Cuenta actualizada a premium 🥳. Disfruta de la cuenta premium
                del ...
              </p>
              <Button onClick={redirectToSell}>Realiza una venta</Button>
            </>
          ) : (
            <>
              <p>
                Ha habido un problema, porfavor, reintenta el proceso de pago 😭
              </p>
              <PaypalButton />
            </>
          )}
        </div>
      </Content>
    </App>
  );
}
