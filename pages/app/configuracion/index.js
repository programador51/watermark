import React, { useState } from "react";
import App from "../../../pages/app";
import Content from "../../../pages/structure/LayoutContent";
import GoFileToken from "../../../pages/molecules/GoFileToken";
import Button from "../../../pages/atoms/Button";
import { updateProfileConfiguration } from "../../../helpers/apis/configuration";

export default function ConfigurationProfile() {
  const [state, setState] = useState({
    isValid: true,
    goFileToken: "",
  });

  /**
   * Update the token for the profile configuration
   * @param {string} token - Token
   * @returns {void}
   */
  const updateGoFileToken = (token) =>
    setState({
      ...state,
      goFileToken: token,
    });

  return (
    <App>
      <Content>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GoFileToken onChange={(value) => updateGoFileToken(value)} />

          <Button
            onClick={() =>
              updateProfileConfiguration({
                goFileToken: state.goFileToken,
              })
            }
            disabled={state.isValid ? false : true}
          >
            Guardar
          </Button>
        </div>
      </Content>
    </App>
  );
}
