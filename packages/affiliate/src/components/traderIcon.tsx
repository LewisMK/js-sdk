import { FC } from "react";
import { IconProps } from "../utils/types";

export const TraderIcon: FC<IconProps> = (props) => {
  const { size = 16, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="white"
      fillOpacity="0.36"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...rest}
    >
      <path d="M7.99929 1.30212C4.31735 1.30212 1.34509 4.28679 1.33262 7.96878C1.32015 11.6454 4.32042 14.6488 7.99929 14.6561C11.6782 14.6634 14.6726 11.6194 14.666 7.96878C14.6593 4.28679 11.6812 1.30212 7.99929 1.30212ZM7.99929 2.63546C10.9448 2.63546 13.3326 5.02345 13.3326 7.96878C13.3326 9.46878 12.7078 10.8208 11.7112 11.7901C11.2202 10.7281 10.1656 9.96878 8.95762 9.96878C8.71802 9.96878 7.28042 9.96878 7.04095 9.96878C5.83369 9.96878 4.78215 10.7188 4.29095 11.7814C3.29429 10.8121 2.66595 9.46878 2.66595 7.96878C2.66595 5.02345 5.05375 2.63546 7.99929 2.63546ZM7.99929 3.96879C6.52649 3.96879 5.33255 5.16279 5.33262 6.63545C5.33262 8.10812 6.52649 9.30212 7.99929 9.30212C9.47202 9.30212 10.666 8.10812 10.666 6.63545C10.666 5.16279 9.47202 3.96879 7.99929 3.96879Z" />
      <path
        d="M16 12.6667C16 14.5076 14.5076 16 12.6666 16C10.8257 16 9.33331 14.5076 9.33331 12.6667C9.33331 10.8257 10.8257 9.33333 12.6666 9.33333C14.5076 9.33333 16 10.8257 16 12.6667Z"
        fill="#005A4F"
      />
      <path
        d="M14.3325 13.3345C14.3325 13.2918 14.3182 13.2473 14.2857 13.2147L13.6658 12.6002L13.4315 12.8345L13.7595 13.1678H11.3325C11.2405 13.1678 11.1658 13.2425 11.1658 13.3345C11.1658 13.4265 11.2405 13.5012 11.3325 13.5012H13.7595L13.4315 13.8345L13.6658 14.0688L14.2857 13.4543C14.3182 13.4217 14.3325 13.3772 14.3325 13.3345ZM14.1658 12.0012C14.1658 11.9092 14.0912 11.8345 13.9992 11.8345H11.572L11.9002 11.5012L11.6658 11.2668L11.046 11.8813C10.981 11.9465 10.981 12.0558 11.046 12.121L11.6658 12.7355L11.9002 12.5012L11.572 12.1678H13.9992C14.0912 12.1678 14.1658 12.0932 14.1658 12.0012Z"
        fill="white"
        fillOpacity="0.98"
      />
    </svg>
  );
};