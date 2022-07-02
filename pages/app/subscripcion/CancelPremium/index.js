import Button from "pages/atoms/Button";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function CancelPremium() {
  return (
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
  );
}
