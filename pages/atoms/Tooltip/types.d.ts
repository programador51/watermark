import { TooltipProps } from "react-tooltip";

export interface CustomTooltipProps extends TooltipProps {
    text: JSX.Element | string;
}