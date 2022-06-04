import Icon from "pages/atoms/Icons";
import React, { useState } from "react";
import styles from "./index.module.scss";
/**
 * Render the menu when user is log in
 * @param {object} props - Props
 * @param {string?} props.title - Title of the menu
 * @returns {JSX.Element}
 */
export default function Menu({ title = "No title" }) {
  const [showExpand, setShowExpand] = useState(false);

  return (
    <div className={styles.containerNavigation}>
      <nav
        className={!showExpand ? styles.closeNavigation : styles.openNavigation}
      >
        {!showExpand ? (
          <>
            <p>{title}</p>
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

            <div className={styles.options}>
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
              <button>
                <Icon icon="dashboard" /> Dashboard
              </button>
              <button>
                <Icon icon="user" />
                Clientes
              </button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
