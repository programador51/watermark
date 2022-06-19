import Icon from "pages/atoms/Icons";
import React from "react";
import { useContext } from "react";
import styles from "./index.module.scss";
import { FacebookLoginButton } from "react-social-login-buttons";
import { signIn } from "next-auth/react";
import useMenu from "pages/customHooks/useMenu";
import useSession from "pages/customHooks/useSession";
import { AuthContext } from "../Layout";

/**
 * Render the menu when user is log in
 * @param {object} props - Props
 * @param {string?} props.title - Title of the menu
 * @returns {JSX.Element}
 */
export default function Menu({ title = "" }) {
  const { redirectToHome, showExpand, setShowExpand, redirectToDashboard } =
    useMenu();

  useSession({
    redirectOnUnauthorized: false,
    createAccountOnReadCookie: false,
  });

  const { status } = useContext(AuthContext);

  const attemptLogin = async (login) => {
    try {
      await signIn(login);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.containerNavigation}>
      <nav
        className={!showExpand ? styles.closeNavigation : styles.openNavigation}
      >
        {!showExpand ? (
          <>
            <h1 className="logo">Only Nudes</h1>
            <button onClick={() => setShowExpand(!showExpand)}>
              <Icon icon="menu" />
            </button>
          </>
        ) : (
          <>
            <div className={styles.containerMenuHeader}>
              <button onClick={() => setShowExpand(!showExpand)}>
                <Icon icon="close" />
              </button>
            </div>

            {status !== "authenticated" ? (
              <div className={styles.options}>
                <button onClick={redirectToHome}>
                  <Icon icon="home" /> Inicio
                </button>
                <button>
                  <Icon icon="cellphone" /> Demo
                </button>
                <button>
                  <Icon icon="home" /> FAQ
                </button>
                <div className={styles.login}>
                  <FacebookLoginButton
                    onClick={async () => await attemptLogin("facebook")}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.options}>
                <button onClick={redirectToHome}>
                  <Icon icon="home" /> Inicio
                </button>
                <details>
                  <summary>
                    <span>
                      <Icon icon="engine" />
                      Mi cuenta
                    </span>
                  </summary>
                  <button>
                    <Icon icon="creditCard" /> Pagos
                  </button>
                  <button>
                    <Icon icon="engine" /> Configuracion
                  </button>
                  <button>
                    <Icon icon="login" />
                    Inicios de sesión
                  </button>
                  <button>
                    <Icon icon="logout" /> Cerrar sesión
                  </button>
                </details>
                <button onClick={redirectToDashboard}>
                  <Icon icon="dashboard" /> Dashboard
                </button>
                <button>
                  <Icon icon="user" />
                  Clientes
                </button>
              </div>
            )}
          </>
        )}
      </nav>
    </div>
  );
}
