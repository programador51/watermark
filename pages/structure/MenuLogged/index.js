import Icon from "pages/atoms/Icons";
import React from "react";
import { useContext } from "react";
import styles from "./index.module.scss";
import { FacebookLoginButton } from "react-social-login-buttons";
import { signIn } from "next-auth/react";
import useMenu from "pages/customHooks/useMenu";
import useSession from "pages/customHooks/useSession";
import { AuthContext } from "../Layout";
import Image from "next/image";

/**
 * Render the menu when user is log in
 * @param {object} props - Props
 * @param {string?} props.title - Title of the menu
 * @returns {JSX.Element}
 */
export default function Menu({ title = "" }) {
  const {
    redirectToHome,
    showExpand,
    setShowExpand,
    redirectToDashboard,
    redirectToConfiguration,
    redirectToSubscription,
  } = useMenu();

  const { handleCloseSession } = useSession({
    redirectOnUnauthorized: false,
    createAccountOnReadCookie: false,
  });

  const { status, user } = useContext(AuthContext);

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
            <h1 className="logo">Safe Nudes</h1>
            <button onClick={() => setShowExpand(!showExpand)}>
              <Icon icon="menu" />
            </button>
          </>
        ) : (
          <>
            <div className={styles.containerMenuHeader}>
              {status === "authenticated" ? (
                <div className={styles.profileInfo}>
                  <div className={styles.profilePicture}>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      alt="profile_picture_user"
                    />
                  </div>
                  <div className={styles.center}>
                    <p>Facebook</p>
                    <p>{user.email}</p>
                  </div>
                </div>
              ) : null}

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
                  <button onClick={redirectToSubscription}>
                    <Icon icon="creditCard" /> Subscripcion
                  </button>
                  {/* <button onClick={redirectToConfiguration}>
                    <Icon icon="engine" /> Configuracion
                  </button>
                  <button>
                    <Icon icon="login" />
                    Inicios de sesión
                  </button> */}
                  <button onClick={handleCloseSession}>
                    <Icon icon="logout" /> Cerrar sesión
                  </button>
                </details>
                <button onClick={redirectToDashboard}>
                  <Icon icon="dashboard" /> Dashboard
                </button>
                {/* <button>
                  <Icon icon="user" />
                  Clientes
                </button> */}
              </div>
            )}
          </>
        )}
      </nav>
    </div>
  );
}
