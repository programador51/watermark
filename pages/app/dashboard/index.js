import React, { useEffect, useState } from "react";
import Content from "pages/structure/LayoutContent";
import SearchInput from "pages/atoms/Inputs/Search";
import styles from "./index.module.scss";
import Button from "pages/atoms/Button";
import Link from "next/link";
import { SpinnerDotted } from "spinners-react";
import App from "..";

export default function Dashboard() {
  /**
   * Information of the sells that have been made
   * @type {[import("./types").AlbumI[]|undefined,()=>void]}
   */
  const [sells, setSells] = useState(undefined);

  useEffect(() => {
    (async function () {
      try {
        const resApi = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/app/dashboard`,
          {
            credentials: "include",
            method: "GET",
          }
        );

        /**
         * Information of the response
         * @type {import("./types").ResDashboardI}
         */
        const { albums } = await resApi.json();

        setSells(albums);
      } catch (error) {
        setSells([]);
      }
    })();
  }, []);

  return (
    <App>
      <Content>
        <div className={styles.dashboardContainer}>
          <div className={styles.stickySearch}>
            <SearchInput />
            <Link href="/app/venta">
              <a href="">
                <Button>Nueva venta</Button>
              </a>
            </Link>
            <hr />
          </div>

          {sells === undefined ? (
            <div className={styles.spinner}>
              <SpinnerDotted />
              <p>Cargando albums...</p>
            </div>
          ) : (
            <div className={styles.sells}>
              {sells.map((sell) => (
                <article className={styles.sell} key={sell.id}>
                  <p>{sell.id}</p>
                  <time>{sell.creationDate}</time>
                  <span>{sell.Customer.name}</span>
                </article>
              ))}
            </div>
          )}
        </div>
      </Content>
    </App>
  );
}
