
import React from "react";
import { FC, SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export const ReferralIcon: FC<IconProps> = (props) => {
    const { size = 16, viewBox, ...rest } = props;
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
            <path d="M30.6666 23.4665C30.6666 27.1484 27.6818 30.1331 23.9999 30.1331C20.318 30.1331 17.3333 27.1484 17.3333 23.4665C17.3333 19.7846 20.318 16.7998 23.9999 16.7998C27.6818 16.7998 30.6666 19.7846 30.6666 23.4665Z" fill="#284AAD" />
            <path d="M24.1756 21.6132L23.999 21.7991L23.8224 21.6124C23.1346 20.8873 22.0157 20.884 21.3248 21.6059L21.3186 21.6124C20.6269 22.3407 20.6269 23.5185 21.3186 24.2476L23.7137 26.8078C23.8687 26.9727 24.1216 26.9751 24.2797 26.8134L24.2851 26.8078L26.681 24.2476C27.3727 23.5193 27.3727 22.3415 26.681 21.6124C25.9932 20.8873 24.8743 20.884 24.1833 21.6051L24.1756 21.6132Z" fill="white" fill-opacity="0.98" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5288 18.0012C18.1445 17.9132 17.7443 17.8667 17.3333 17.8667H11.9999C9.0544 17.8667 6.66658 20.2545 6.66658 23.2V23.7833C4.36957 21.6414 2.93325 18.5885 2.93325 15.2C2.93325 8.71989 8.18644 3.4667 14.6666 3.4667C21.1467 3.4667 26.3999 8.71989 26.3999 15.2C26.3999 15.5035 26.3884 15.8043 26.3658 16.102C26.9077 16.2759 27.4235 16.508 27.906 16.7909C27.968 16.2693 27.9999 15.7384 27.9999 15.2C27.9999 7.83624 22.0304 1.8667 14.6666 1.8667C7.30279 1.8667 1.33325 7.83624 1.33325 15.2C1.33325 22.5638 7.30279 28.5334 14.6666 28.5334C15.7626 28.5334 16.8277 28.4011 17.8468 28.1517C17.5065 27.7055 17.2136 27.2212 16.9758 26.7062C16.2292 26.8552 15.457 26.9334 14.6666 26.9334C12.3054 26.9334 10.1072 26.2359 8.26658 25.0358V23.2C8.26658 21.1382 9.93806 19.4667 11.9999 19.4667H17.3333C17.3488 19.4667 17.3644 19.4668 17.3799 19.467C17.7034 18.9327 18.0898 18.4407 18.5288 18.0012ZM14.6666 17.3334C17.3176 17.3334 19.4666 15.1843 19.4666 12.5334C19.4666 9.8824 17.3176 7.73337 14.6666 7.73337C12.0156 7.73337 9.86658 9.8824 9.86658 12.5334C9.86658 15.1843 12.0156 17.3334 14.6666 17.3334ZM14.6666 9.33337C16.4339 9.33337 17.8666 10.7661 17.8666 12.5334C17.8666 14.3007 16.4339 15.7334 14.6666 15.7334C12.8993 15.7334 11.4666 14.3007 11.4666 12.5334C11.4666 10.7661 12.8993 9.33337 14.6666 9.33337Z" fill="white" fill-opacity="0.8" />
        </svg>


    );
}
