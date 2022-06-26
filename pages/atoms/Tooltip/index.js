import React from "react";
import { useRef } from "react";
import ReactTooltip from "react-tooltip";

/**
 *
 * @param {import("./types").CustomTooltipProps} props
 * @returns
 */
export default function Tooltip(props) {
  const id = useRef(window.crypto.randomUUID());

  return (
    <>
      <a data-tip data-for={`${id.current}`}>
        {props.text}
      </a>
      <ReactTooltip id={id.current} {...props}></ReactTooltip>
    </>
  );
}
