import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";

import "../src/tailwind.css";
// import "@orderly.network/chart/dist/styles.css";
import { withWalletConnect } from "./addons/withWalletConnect";
import { customViewports } from "./screenSizes";

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
  }),
  // withWalletConnect,
];

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "Dark", value: "#07080A"},
        { name: "Light", value: "#07080A"},
      ],
      default: "Dark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Design Tokens",
          "Base",
          ["Overview"],
          "Package",
          [
            "Overview",
            "ui-connector",
            "ui-leverage",
            "ui-scaffold",
            "ui-positions",
            "ui-orders",
            "ui-chain-selector",
          ],
        ],
      },
    },
    viewport: {
      viewports: {
        // ...INITIAL_VIEWPORTS,
        // ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
      // defaultViewport: 'iphone6 PRO',
    },
  },
};

export default preview;
