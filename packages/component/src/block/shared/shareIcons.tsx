import React, { FC } from "react";
import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export const ShareXIcon: FC<IconProps> = (props) => {
    const { size = 36, ...rest } = props;

    return (
        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
            <circle cx="18.5" cy="18" r="17" fill="#FFFFFF" />
            <path d="M18.5 0C8.55781 0 0.5 8.05781 0.5 18C0.5 27.9422 8.55781 36 18.5 36C28.4422 36 36.5 27.9422 36.5 18C36.5 8.05781 28.4422 0 18.5 0ZM26.7195 14.0344C26.7266 14.2102 26.7336 14.393 26.7336 14.5687C26.7336 20.025 22.5781 26.325 14.9773 26.325C12.7311 26.3283 10.5315 25.6838 8.64219 24.4688C8.96906 24.5052 9.29767 24.524 9.62657 24.525C11.488 24.5279 13.2961 23.9037 14.7594 22.7531C13.8977 22.7352 13.0629 22.4493 12.3712 21.9352C11.6794 21.4211 11.1649 20.7043 10.8992 19.8844C11.154 19.9348 11.413 19.9607 11.6727 19.9617C12.041 19.9634 12.4079 19.9137 12.7625 19.8141C11.8276 19.6256 10.9867 19.1191 10.383 18.3808C9.77926 17.6425 9.44985 16.7178 9.45078 15.7641V15.7078C10.023 16.029 10.6651 16.2052 11.3211 16.2211C10.7549 15.8443 10.291 15.333 9.9707 14.733C9.65045 14.133 9.4839 13.4629 9.48594 12.7828C9.4834 12.0534 9.67773 11.3368 10.0484 10.7086C11.0859 11.9847 12.3801 13.0285 13.847 13.7723C15.3139 14.516 16.9207 14.9431 18.5633 15.0258C18.424 14.4191 18.4231 13.7889 18.5605 13.1818C18.6979 12.5747 18.9702 12.0063 19.3571 11.5188C19.744 11.0312 20.2357 10.637 20.7958 10.3653C21.3558 10.0936 21.9698 9.95137 22.5922 9.94922C23.1579 9.94769 23.7179 10.0631 24.237 10.2881C24.756 10.5132 25.223 10.843 25.6086 11.257C26.5349 11.0779 27.4226 10.7376 28.2313 10.2516C27.922 11.2071 27.2777 12.0187 26.4172 12.5367C27.2357 12.4405 28.0347 12.22 28.7867 11.8828C28.2342 12.7197 27.5337 13.4488 26.7195 14.0344Z" fill="#4483F7" />
        </svg>

    );
};


export const ShareTelegramIcon: FC<IconProps> = (props) => {
    const { size = 36, ...rest } = props;

    return (
        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
            <circle cx="18.5" cy="18" r="17" fill="#FFFFFF" />
            <path d="M18.5 36C28.4422 36 36.5 27.9422 36.5 18C36.5 8.05781 28.4422 0 18.5 0C8.55781 0 0.5 8.05781 0.5 18C0.5 27.9422 8.55781 36 18.5 36ZM8.73359 17.6133L26.0867 10.9195C26.8953 10.6313 27.5984 11.1164 27.3312 12.3328L24.3781 26.2547C24.1602 27.2391 23.5695 27.4852 22.7539 27.0141L18.2539 23.6953L16.0812 25.7836C15.8422 26.0227 15.6383 26.2266 15.1742 26.2266L15.4906 21.6492L23.8367 14.1188C24.2023 13.8023 23.7523 13.6195 23.2742 13.9359L12.9664 20.4258L8.52265 19.0406C7.5664 18.7313 7.54531 18.0773 8.73359 17.6133Z" fill="#2695E6" />
        </svg>

    );
};


export const ShareFacebookIcon: FC<IconProps> = (props) => {
    const { size = 36, ...rest } = props;

    return (
        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18.5" cy="18" r="17" fill="#FFFFFF" />
            <path d="M18.5 0C8.55781 0 0.5 8.08941 0.5 18.0706C0.5 27.0212 6.98984 34.4329 15.4977 35.8729V21.8471H11.1523V16.8H15.4977V13.08C15.4977 8.76 18.1273 6.40942 21.9664 6.40942C23.8016 6.40942 25.3836 6.54354 25.8406 6.60707V11.1247H23.1758C21.0875 11.1247 20.6867 12.12 20.6867 13.5812V16.8H25.6648L25.018 21.8471H20.6867V36C29.5953 34.9129 36.5 27.3106 36.5 18.0777C36.5 8.09648 28.4422 0 18.5 0Z" fill="#425A94" />
        </svg>

    );
};



export const ShareRadditIcon: FC<IconProps> = (props) => {
    const { size = 36, ...rest } = props;

    return (
        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
            <circle cx="18.5" cy="18" r="17" fill="white" />
            <path d="M22.1687 24.2505C21.3479 25.0739 19.5994 25.3674 18.3433 25.3674C17.0871 25.3674 15.3385 25.0739 14.5178 24.2505C14.4247 24.159 14.2994 24.108 14.1691 24.1087C14.0388 24.1094 13.914 24.1616 13.8219 24.254C13.7297 24.3464 13.6777 24.4716 13.677 24.6024C13.6764 24.7331 13.7271 24.8588 13.8183 24.9521C15.1173 26.2552 17.6081 26.3555 18.3361 26.3555C19.0641 26.3555 21.5549 26.2552 22.8539 24.9521C22.9464 24.859 22.9984 24.7328 22.9984 24.6013C22.9984 24.4698 22.9464 24.3436 22.8539 24.2505C22.8093 24.2046 22.7561 24.1681 22.6972 24.1432C22.6384 24.1183 22.5752 24.1055 22.5113 24.1055C22.4474 24.1055 22.3842 24.1183 22.3254 24.1432C22.2665 24.1681 22.2133 24.2046 22.1687 24.2505Z" fill="url(#paint0_linear_8289_72938)" />
            <path d="M16.2531 19.9288C16.2531 19.5474 16.14 19.1745 15.9281 18.8574C15.7162 18.5402 15.415 18.293 15.0626 18.147C14.7102 18.0011 14.3224 17.9629 13.9483 18.0373C13.5742 18.1117 13.2306 18.2954 12.9609 18.5651C12.6911 18.8348 12.5075 19.1785 12.4331 19.5526C12.3586 19.9267 12.3968 20.3144 12.5428 20.6668C12.6888 21.0192 12.936 21.3205 13.2531 21.5324C13.5703 21.7443 13.9431 21.8574 14.3246 21.8574C14.8357 21.8562 15.3256 21.6527 15.687 21.2913C16.0484 20.9298 16.252 20.44 16.2531 19.9288Z" fill="url(#paint1_linear_8289_72938)" />
            <path d="M18.5 0C8.55781 0 0.5 8.05781 0.5 18C0.5 27.9422 8.55781 36 18.5 36C28.4422 36 36.5 27.9422 36.5 18C36.5 8.05781 28.4422 0 18.5 0ZM28.9414 20.4012C28.9837 20.6615 29.0049 20.9249 29.0047 21.1887C29.0047 25.2246 24.3008 28.5012 18.5 28.5012C12.6992 28.5012 7.9953 25.2316 7.9953 21.1887C7.99512 20.9226 8.01629 20.6569 8.05859 20.3941C7.50995 20.1499 7.06187 19.7246 6.78936 19.1895C6.51686 18.6543 6.4365 18.0418 6.56171 17.4545C6.68692 16.8671 7.01011 16.3406 7.47718 15.9631C7.94424 15.5856 8.5268 15.3801 9.12734 15.3809C9.80431 15.3784 10.4554 15.6408 10.9414 16.1121C12.7625 14.7973 15.2867 13.9605 18.0851 13.8902C18.0851 13.8551 19.393 7.61133 19.393 7.61133C19.4208 7.49048 19.4937 7.38481 19.5969 7.316C19.648 7.28182 19.7056 7.25857 19.7661 7.24768C19.8265 7.23679 19.8886 7.23851 19.9484 7.25273L24.3148 8.18085C24.5163 7.7702 24.8607 7.44713 25.2833 7.27218C25.7059 7.09723 26.1778 7.08241 26.6106 7.2305C27.0434 7.37859 27.4073 7.67943 27.6342 8.07663C27.861 8.47383 27.9352 8.94013 27.8429 9.38813C27.7506 9.83612 27.498 10.2351 27.1326 10.5102C26.7672 10.7853 26.314 10.9177 25.8579 10.8826C25.4018 10.8475 24.9742 10.6473 24.6552 10.3195C24.3362 9.9917 24.1477 9.5588 24.125 9.10195L20.2156 8.27226L19.0203 13.8973C21.7766 13.9957 24.2445 14.8324 26.0375 16.1262C26.3124 15.8604 26.6421 15.6579 27.0035 15.5329C27.3649 15.408 27.7492 15.3635 28.1296 15.4028C28.51 15.442 28.8772 15.5639 29.2054 15.76C29.5337 15.9561 29.8152 16.2216 30.03 16.5379C30.2449 16.8542 30.388 17.2137 30.4493 17.5911C30.5106 17.9686 30.4886 18.3549 30.3849 18.7229C30.2812 19.091 30.0982 19.4319 29.8489 19.7218C29.5995 20.0117 29.2898 20.2436 28.9414 20.4012Z" fill="url(#paint2_linear_8289_72938)" />
            <path d="M22.6786 18.0002C22.2971 18.0002 21.9243 18.1134 21.6071 18.3253C21.29 18.5372 21.0428 18.8384 20.8968 19.1908C20.7508 19.5432 20.7126 19.931 20.7871 20.3051C20.8615 20.6792 21.0452 21.0228 21.3149 21.2925C21.5846 21.5622 21.9282 21.7459 22.3023 21.8203C22.6764 21.8947 23.0642 21.8565 23.4166 21.7106C23.769 21.5646 24.0702 21.3174 24.2821 21.0003C24.494 20.6831 24.6071 20.3102 24.6071 19.9288C24.606 19.4177 24.4025 18.9278 24.041 18.5664C23.6796 18.2049 23.1897 18.0014 22.6786 18.0002Z" fill="url(#paint3_linear_8289_72938)" />
            <defs>
                <linearGradient id="paint0_linear_8289_72938" x1="18.3377" y1="24.1055" x2="18.3377" y2="26.3555" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF7B13" />
                    <stop offset="1" stop-color="#F1161A" />
                </linearGradient>
                <linearGradient id="paint1_linear_8289_72938" x1="14.3246" y1="18.0002" x2="14.3246" y2="21.8574" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF7B13" />
                    <stop offset="1" stop-color="#F1161A" />
                </linearGradient>
                <linearGradient id="paint2_linear_8289_72938" x1="18.5" y1="0" x2="18.5" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF7B13" />
                    <stop offset="1" stop-color="#F1161A" />
                </linearGradient>
                <linearGradient id="paint3_linear_8289_72938" x1="22.6786" y1="18.0002" x2="22.6786" y2="21.8574" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF7B13" />
                    <stop offset="1" stop-color="#F1161A" />
                </linearGradient>
            </defs>
        </svg>


    );
};
