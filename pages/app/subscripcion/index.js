import React, { useEffect, useState } from "react";
import Content from "pages/structure/LayoutContent";
import App from "pages/app";
import scss from "./styles.module.scss";
import { getStatusSubscription } from "helpers/apis/subscription";
import { SpinnerDotted } from "spinners-react";
import Button from "pages/atoms/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PaypalButton from "pages/atoms/PaypalButton";
import DivisorHr from "pages/atoms/DivisorHr";

const MySwal = withReactContent(Swal);

export default function Subscription() {
  /**
   * State of the subscription
   * @type {[import("./types").StateSubscription,()=>void]}
   */
  const [subscription, setSubscription] = useState(undefined);

  useEffect(() => {
    (async function () {
      const apiSubscription = await getStatusSubscription();
      setSubscription(apiSubscription);
    })();
  }, []);

  return (
    <App>
      <Content>
        <div className={scss.subscription}>
          {subscription === undefined ? (
            <div className={scss.loadingSubscription}>
              <SpinnerDotted />
              <span>Cargando informacion...</span>
            </div>
          ) : (
            <div className={scss.subStatus}>
              {!subscription.isSubscribed ? (
                <>
                  <p>Parece que no tienes premium 😭</p>

                  <DivisorHr />

                  <p>Métodos de pago</p>

                  <PaypalButton />
                </>
              ) : (
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

                  <Button
                    onClick={() =>
                      MySwal.fire({
                        icon: "success",
                        title: "¡Listo!",
                        html: (
                          <p
                            style={{
                              color: "black",
                            }}
                          >
                            La subscripcion premium{" "}
                            <b
                              style={{
                                color: "black",
                              }}
                            >
                              NO SE RENUEVA
                            </b>{" "}
                            de forma automática, asi que{" "}
                            <b
                              style={{
                                color: "black",
                              }}
                            >
                              no existe proceso de cancelacion ni devolucion.{" "}
                            </b>
                            No debes preocuparte por cargos automáticos
                          </p>
                        ),
                      })
                    }
                  >
                    Cancelar premium
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </Content>
    </App>
  );
}
