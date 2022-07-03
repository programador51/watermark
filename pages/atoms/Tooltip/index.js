import React from "react";
import { useRef } from "react";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param {import("./types").CustomTooltipProps} props
 * @returns
 */
export default function Tooltip(props) {
  const id = useRef(uuidv4());

  return (
    <>
      <a data-tip data-for={`${id.current}`}>
        {props.text}
      </a>
      <ReactTooltip id={id.current} {...props}></ReactTooltip>
    </>
  );
}
