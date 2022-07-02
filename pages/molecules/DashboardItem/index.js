import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getSellInformation } from "helpers/apis/sell";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MySwal = withReactContent(Swal);
/**
 * Render the "card" for the album
 * @param {import('./types').DashboardItemProps} props - Props
 * @returns {JSX.Element}
 */
export default function DashboardItem({ sell }) {
  const [state, setState] = useState({
    isOpen: false,
    uuids: undefined,
    contact: undefined,
    notes: undefined,
    isLoading: false,
    triggerModal: false,
  });

  useEffect(() => {
    (async function () {
      if (!state.isOpen) return;

      const apiInfo = await getSellInformation(sell.id);
      setState({
        ...state,
        uuids: apiInfo.uuids,
        contact: undefined,
        notes: apiInfo.note,
      });

      MySwal.fire({
        icon: "info",
        iconColor: "#a268ae",
        html: (
          <div className={styles.infoSell}>
            <h1>Album [{sell.id}]</h1>
            <hr />

            <details>
              <summary>Fotos</summary>
              <ul>
                {apiInfo.uuids.map((uuid, i) => (
                  <li key={uuid}>
                    {i + 1} - {uuid}
                  </li>
                ))}
              </ul>
            </details>
            <hr />
            <details>
              <summary>Notas</summary>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {apiInfo.note}
              </ReactMarkdown>
            </details>
            <hr />
          </div>
        ),
      });

      setState({
        ...state,
        isOpen: true,
        isLoading: false,
      });
    })();
  }, [state.isOpen, state.triggerModal]);

  const showContentAlbum = () => {
    setState({
      ...state,
      isOpen: true,
      isLoading: true,
      triggerModal: !state.triggerModal,
    });
  };

  return (
    <article className={styles.sell} key={sell.id}>
      <p onClick={showContentAlbum}>
        {sell.id} {state.isLoading ? "- Un momento..." : ""}
      </p>
      <time>{sell.creationDate}</time>
      {sell.Customer === null ? null : <span>{sell.Customer.name}</span>}
    </article>
  );
}
