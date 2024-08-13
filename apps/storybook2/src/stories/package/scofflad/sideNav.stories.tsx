import type { Meta, StoryObj } from "@storybook/react";
import { OrderlyApp } from "@orderly.network/react-app";
import { Box, Flex, ModalProvider } from "@orderly.network/ui";
import { SideNavbarWidget } from "@orderly.network/ui-scaffold";
import { ConnectorProvider } from "@orderly.network/web3-onboard";

const meta = {
  title: "Package/ui-scaffold/SideNavbar",
  component: SideNavbarWidget,
  // subComponents: { AccountMenuWidget, AccountSummaryWidget, ChainMenuWidget },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ConnectorProvider>
        <OrderlyApp brokerId={"orderly"} brokerName={""} networkId={"testnet"}>
          <ModalProvider>
            <Story />
          </ModalProvider>
        </OrderlyApp>
      </ConnectorProvider>
    ),
  ],
  argTypes: {},
  args: {
    items: [
      {
        name: "Overview",
        href: "/",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.24316 2.19727C3.58641 2.19727 2.24316 3.54044 2.24316 5.19727V12.6973C2.24316 14.3541 3.58641 15.6973 5.24316 15.6973H12.7432C14.3999 15.6973 15.7432 14.3541 15.7432 12.6973V5.19727C15.7432 3.54044 14.3999 2.19727 12.7432 2.19727H5.24316ZM5.24316 3.69727H12.7432C13.5719 3.69727 14.2432 4.36882 14.2432 5.19727V12.6973C14.2432 13.2484 13.9319 13.734 13.4894 13.9947C13.3454 12.2235 11.4427 11.1973 8.99316 11.1973C6.54366 11.1973 4.60341 12.251 4.48566 13.9997C4.04241 13.739 3.74316 13.2484 3.74316 12.6973V5.19727C3.74316 4.36882 4.41441 3.69727 5.24316 3.69727ZM8.99316 5.19727C7.54341 5.19727 6.36816 6.37252 6.36816 7.82227C6.36816 9.27202 7.54341 10.4473 8.99316 10.4473C10.4429 10.4473 11.6182 9.27202 11.6182 7.82227C11.6182 6.37252 10.4429 5.19727 8.99316 5.19727Z"
              className="oui-fill-current group-data-[actived=true]:oui-fill-[url(#side-menu-gradient)]"
            />
          </svg>
        ),
      },
      {
        name: "Positions",
        href: "/positions",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5105 3.02124C2.85367 3.02124 1.5105 4.36449 1.5105 6.02124V12.0212C1.5105 13.678 2.85367 15.0212 4.5105 15.0212H13.5105C15.1674 15.0212 16.5105 13.678 16.5105 12.0212V6.02124C16.5105 4.36449 15.1674 3.02124 13.5105 3.02124H4.5105ZM6.7605 6.02124C6.9525 6.02124 7.15312 6.08574 7.2996 6.23199C7.59247 6.52524 7.59247 7.01724 7.2996 7.31049L6.5496 8.06049C6.4089 8.20074 6.20947 8.27124 6.0105 8.27124H5.2605C4.84635 8.27124 4.5105 7.93524 4.5105 7.52124C4.5105 7.10724 4.84627 6.77124 5.2605 6.77124H5.68237L6.22147 6.23199C6.36795 6.08574 6.56857 6.02124 6.7605 6.02124ZM9.7605 6.77124H12.7605C13.1747 6.77124 13.5105 7.10724 13.5105 7.52124C13.5105 7.93524 13.1747 8.27124 12.7605 8.27124H9.7605C9.34635 8.27124 9.0105 7.93524 9.0105 7.52124C9.0105 7.10724 9.34627 6.77124 9.7605 6.77124ZM6.7605 9.02124C6.9525 9.02124 7.15312 9.08574 7.2996 9.23199C7.59247 9.52524 7.59247 10.0172 7.2996 10.3105L6.5496 11.0605C6.4089 11.2007 6.20947 11.2712 6.0105 11.2712H5.2605C4.84635 11.2712 4.5105 10.9352 4.5105 10.5212C4.5105 10.1072 4.84627 9.77124 5.2605 9.77124H5.68237L6.22147 9.23199C6.36795 9.08574 6.56857 9.02124 6.7605 9.02124ZM9.7605 9.77124H12.7605C13.1747 9.77124 13.5105 10.1072 13.5105 10.5212C13.5105 10.9352 13.1747 11.2712 12.7605 11.2712H9.7605C9.34635 11.2712 9.0105 10.9352 9.0105 10.5212C9.0105 10.1072 9.34627 9.77124 9.7605 9.77124Z"
              className="oui-fill-current group-data-[actived=true]:oui-fill-[url(#side-menu-gradient)]"
            />
          </svg>
        ),
      },
      {
        name: "Orders",
        href: "/orders",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.69274 1.49902C4.22949 1.49902 3.02124 2.60902 3.02124 4.00703V13.9911C3.02124 15.3891 4.22949 16.4991 5.69274 16.4991H12.3497C13.813 16.4991 15.0212 15.3891 15.0212 13.9911C15.0212 13.5028 15.0212 8.14254 15.0212 6.74904C15.0212 6.74154 15.0212 6.73328 15.0212 6.72578C15.0212 4.05353 12.442 1.49902 9.77124 1.49902C6.61074 1.49902 6.60324 1.49902 5.69274 1.49902ZM10.5212 3.09278C11.8502 3.44528 13.0832 4.67378 13.4275 5.99904H11.6927C11.026 5.99904 10.5212 5.52654 10.5212 4.99104V3.09278ZM6.77124 5.99904H7.52124C7.93524 5.99904 8.27124 6.33504 8.27124 6.74904C8.27124 7.16304 7.93524 7.49904 7.52124 7.49904H6.77124C6.35724 7.49904 6.02124 7.16304 6.02124 6.74904C6.02124 6.33504 6.35724 5.99904 6.77124 5.99904ZM6.77124 8.99905H11.2712C11.6852 8.99905 12.0212 9.33505 12.0212 9.74905C12.0212 10.163 11.6852 10.4991 11.2712 10.4991H6.77124C6.35724 10.4991 6.02124 10.163 6.02124 9.74905C6.02124 9.33505 6.35724 8.99905 6.77124 8.99905ZM6.77124 11.9991H11.2712C11.6852 11.9991 12.0212 12.3351 12.0212 12.7491C12.0212 13.1631 11.6852 13.4991 11.2712 13.4991H6.77124C6.35724 13.4991 6.02124 13.1631 6.02124 12.7491C6.02124 12.3351 6.35724 11.9991 6.77124 11.9991Z"
              className="oui-fill-current group-data-[actived=true]:oui-fill-[url(#side-menu-gradient)]"
            />
          </svg>
        ),
      },
      {
        name: "Fee tier",
        href: "/fee",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99829 1.51062C4.34154 1.51062 2.99829 2.85387 2.99829 4.51062V13.5106C2.99829 15.1674 4.34154 16.5106 5.99829 16.5106H11.9983C13.655 16.5106 14.9983 15.1674 14.9983 13.5106V4.51062C14.9983 2.85387 13.655 1.51062 11.9983 1.51062H5.99829ZM5.99829 3.76062H11.9983C12.4123 3.76062 12.7483 4.09662 12.7483 4.51062V6.01062C12.7483 6.42462 12.4123 6.76062 11.9983 6.76062H5.99829C5.58429 6.76062 5.24829 6.42462 5.24829 6.01062V4.51062C5.24829 4.09662 5.58429 3.76062 5.99829 3.76062ZM5.99829 8.26062C6.41229 8.26062 6.74829 8.59662 6.74829 9.01062C6.74829 9.42462 6.41229 9.76062 5.99829 9.76062C5.58429 9.76062 5.24829 9.42462 5.24829 9.01062C5.24829 8.59662 5.58429 8.26062 5.99829 8.26062ZM8.99829 8.26062C9.41229 8.26062 9.74829 8.59662 9.74829 9.01062C9.74829 9.42462 9.41229 9.76062 8.99829 9.76062C8.58429 9.76062 8.24829 9.42462 8.24829 9.01062C8.24829 8.59662 8.58429 8.26062 8.99829 8.26062ZM11.9983 8.26062C12.4123 8.26062 12.7483 8.59662 12.7483 9.01062C12.7483 9.42462 12.4123 9.76062 11.9983 9.76062C11.5843 9.76062 11.2483 9.42462 11.2483 9.01062C11.2483 8.59662 11.5843 8.26062 11.9983 8.26062ZM5.99829 10.5106C6.41229 10.5106 6.74829 10.8466 6.74829 11.2606C6.74829 11.6746 6.41229 12.0106 5.99829 12.0106C5.58429 12.0106 5.24829 11.6746 5.24829 11.2606C5.24829 10.8466 5.58429 10.5106 5.99829 10.5106ZM8.99829 10.5106C9.41229 10.5106 9.74829 10.8466 9.74829 11.2606C9.74829 11.6746 9.41229 12.0106 8.99829 12.0106C8.58429 12.0106 8.24829 11.6746 8.24829 11.2606C8.24829 10.8466 8.58429 10.5106 8.99829 10.5106ZM11.9983 10.5106C12.4123 10.5106 12.7483 10.8466 12.7483 11.2606V13.5106C12.7483 13.9246 12.4123 14.2606 11.9983 14.2606C11.5843 14.2606 11.2483 13.9246 11.2483 13.5106V11.2606C11.2483 10.8466 11.5843 10.5106 11.9983 10.5106ZM5.99829 12.7606C6.41229 12.7606 6.74829 13.0966 6.74829 13.5106C6.74829 13.9246 6.41229 14.2606 5.99829 14.2606C5.58429 14.2606 5.24829 13.9246 5.24829 13.5106C5.24829 13.0966 5.58429 12.7606 5.99829 12.7606ZM8.99829 12.7606C9.41229 12.7606 9.74829 13.0966 9.74829 13.5106C9.74829 13.9246 9.41229 14.2606 8.99829 14.2606C8.58429 14.2606 8.24829 13.9246 8.24829 13.5106C8.24829 13.0966 8.58429 12.7606 8.99829 12.7606Z"
              className="oui-fill-current group-data-[actived=true]:oui-fill-[url(#side-menu-gradient)]"
            />
          </svg>
        ),
      },
      {
        name: "API key",
        href: "/api",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.02124 1.49915C7.77849 1.49915 6.77124 2.5064 6.77124 3.74915C6.77124 4.70015 7.40049 5.55517 8.26974 5.86942L8.27124 8.24915H5.27124C4.85724 8.24915 4.52124 8.58515 4.52124 8.99915L4.52048 12.1304C3.65723 12.4274 3.02124 13.2981 3.02124 14.2491C3.02124 15.4919 4.02849 16.4991 5.27124 16.4991C6.51399 16.4991 7.52124 15.4919 7.52124 14.2491C7.52124 13.2981 6.92499 12.4596 6.02949 12.1206L6.02124 9.74915H9.02124H12.0212L12.0265 12.1319C11.1257 12.4446 10.5212 13.2981 10.5212 14.2491C10.5212 15.4919 11.5285 16.4991 12.7712 16.4991C14.014 16.4991 15.0212 15.4919 15.0212 14.2491C15.0212 13.2981 14.407 12.4611 13.5272 12.1281L13.5212 8.99915C13.5212 8.58515 13.1852 8.24915 12.7712 8.24915H9.77124L9.76899 5.86639C10.642 5.55814 11.2712 4.70015 11.2712 3.74915C11.2712 2.5064 10.264 1.49915 9.02124 1.49915Z"
              className="oui-fill-current group-data-[actived=true]:oui-fill-[url(#side-menu-gradient)]"
            />
          </svg>
        ),
      },
      {
        name: "Setting",
        href: "/setting",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.72601 1.84159C5.66251 2.17834 4.74527 2.7296 3.93677 3.48185C3.68702 3.7151 3.61052 4.09534 3.77252 4.39609C4.37327 5.50684 3.74476 6.69484 2.39026 6.76309C2.05801 6.78034 1.76477 7.02559 1.68677 7.34884C1.55252 7.90759 1.49927 8.37559 1.49927 8.98984C1.49927 9.50509 1.55476 10.0878 1.66351 10.6068C1.73101 10.9308 2.01302 11.1641 2.34302 11.1933C3.70652 11.3111 4.38152 12.3506 3.77252 13.6773C3.63752 13.9721 3.69902 14.3246 3.93677 14.5443C4.73327 15.2816 5.64826 15.8006 6.72601 16.1381C7.03351 16.2348 7.38076 16.1186 7.56976 15.8568C8.40376 14.7033 9.61352 14.6988 10.4055 15.8568C10.5923 16.1298 10.9343 16.2611 11.2493 16.1613C12.2895 15.8343 13.2585 15.2771 14.0618 14.5443C14.3093 14.3193 14.3745 13.9541 14.226 13.6541C13.602 12.3948 14.3198 11.2383 15.6083 11.2166C15.9503 11.2106 16.2548 10.9856 16.335 10.6541C16.4648 10.1163 16.4993 9.64759 16.4993 8.98984C16.4993 8.42434 16.4325 7.86709 16.3118 7.32559C16.2353 6.98359 15.936 6.74059 15.585 6.73984C14.3168 6.73759 13.6058 5.49109 14.226 4.39609C14.3985 4.09084 14.3445 3.71735 14.085 3.48185C13.2675 2.73935 12.2708 2.15959 11.226 1.84159C10.905 1.74409 10.5638 1.86409 10.3823 2.14609C9.65776 3.27109 8.30477 3.29135 7.59302 2.16935C7.41077 1.8821 7.05001 1.73809 6.72601 1.84159ZM8.99927 5.98984C10.656 5.98984 11.9993 7.33309 11.9993 8.98984C11.9993 10.6466 10.656 11.9898 8.99927 11.9898C7.34252 11.9898 5.99927 10.6466 5.99927 8.98984C5.99927 7.33309 7.34252 5.98984 8.99927 5.98984Z"
              className="oui-fill-current group-data-[actived=true]:oui-fill-[url(#side-menu-gradient)]"
            />
          </svg>
        ),
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <Box width={args.open ? "160px" : "75px"} intensity={900} p={4} r={"2xl"}>
        <SideNavbarWidget {...args} />
      </Box>
    );
  },
  // decorators: [
  //   (Story) => (

  //   ),
  // ],
};