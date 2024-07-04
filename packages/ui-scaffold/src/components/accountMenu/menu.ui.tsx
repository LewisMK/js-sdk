import {
  Button,
  Divider,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  EVMAvatar,
  Flex,
  Text,
} from "@orderly.network/ui";

export type AccountMenuProps = {
  address: string;
};

export const AccountMenu = (props: AccountMenuProps) => {
  const { address } = props;
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button
          size="md"
          variant="gradient"
          angle={45}
          className="wallet-connect-button"
        >
          <Text.formatted rule="address" className="oui-text-[rgba(0,0,0,.88)]">
            {address}
          </Text.formatted>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          size={"xl"}
          align={"end"}
          onCloseAutoFocus={(e) => e.preventDefault()}
          style={{ width: "280px" }}
          className={"oui-py-5 oui-font-semibold"}
          sideOffset={12}
        >
          <DropdownMenuGroup>
            <Flex px={4}>
              <Flex gap={2} className={"oui-flex-1"}>
                <EVMAvatar address={address} size={"md"} />
                <Text.formatted rule={"address"} size={"base"}>
                  {address}
                </Text.formatted>
              </Flex>
              <Flex gap={2}>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M5.249 2.243a3 3 0 0 0-3 3v4.5a3 3 0 0 0 3 3 3 3 0 0 0 3 3h4.5a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3 3 3 0 0 0-3-3zm7.5 4.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5h3a3 3 0 0 0 3-3z"
                      fill="#fff"
                      fillOpacity=".36"
                      // className={''}
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M12.7432 15.7432C14.3999 15.7432 15.7432 14.3999 15.7432 12.7432V5.24316C15.7432 3.58641 14.3999 2.24316 12.7432 2.24316H5.24316C3.58641 2.24316 2.24316 3.58641 2.24316 5.24316V12.7432C2.24316 14.3999 3.58641 15.7432 5.24316 15.7432H12.7432ZM6.74316 11.9932C6.55116 11.9932 6.35092 11.9287 6.20392 11.7824C5.91142 11.4892 5.91142 10.9972 6.20392 10.7039L9.20392 7.70392L7.49316 5.99316H11.9932V10.4932L10.2824 8.78241L7.28241 11.7824C7.13616 11.9287 6.93516 11.9932 6.74316 11.9932Z"
                      fill="white"
                      fillOpacity="0.36"
                    />
                  </svg>
                </button>
              </Flex>
            </Flex>
          </DropdownMenuGroup>
          <Divider className={"oui-mx-4 oui-my-3"} intensity={8} />
          <DropdownMenuGroup>
            <DropdownMenuItem size={"xl"}>
              <Flex gap={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    opacity=".998"
                    d="M5.243 2.197a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-7.5a3 3 0 0 0-3-3zm0 1.5h7.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.52 1.52 0 0 1-.754 1.298c-.144-1.771-2.046-2.798-4.496-2.798S4.603 12.251 4.486 14a1.52 1.52 0 0 1-.743-1.303v-7.5a1.5 1.5 0 0 1 1.5-1.5m3.75 1.5a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25"
                    fill="#fff"
                    fillOpacity=".8"
                  />
                </svg>
                <span>Overview</span>
              </Flex>
            </DropdownMenuItem>
            <DropdownMenuItem size={"xl"}>
              <Flex gap={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M5.693 1.499c-1.463 0-2.672 1.11-2.672 2.508v9.984c0 1.398 1.209 2.508 2.672 2.508h6.657c1.463 0 2.672-1.11 2.672-2.508V6.726c0-2.672-2.58-5.227-5.25-5.227zm4.829 1.594c1.329.352 2.562 1.58 2.906 2.906h-1.735c-.667 0-1.171-.472-1.171-1.008zm-3.75 2.906h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1 0-1.5m0 3h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5m0 3h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5"
                    fill="#fff"
                    fillOpacity=".8"
                  />
                </svg>
                <span>Orders</span>
              </Flex>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <Divider className={"oui-mx-4 oui-my-3"} intensity={8} />
          <DropdownMenuGroup>
            <DropdownMenuItem size={"xl"}>
              <Flex gap={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.97 14.03a.75.75 0 0 1 0-1.06l.262-.263C2.594 12.354 1.5 11.108 1.5 9.06c0-2.447 1.563-3.75 3.75-3.75H6a.75.75 0 0 1 0 1.5h-.75C3.837 6.81 3 7.508 3 9.06s.837 2.25 2.25 2.25h.38l1.188-1.188a.75.75 0 0 1-.068-.312v-.75c0-1.162.381-2.19 1.172-2.883.645-.565 1.512-.867 2.578-.867h1.13l1.34-1.34a.75.75 0 0 1 1.061 1.06l-9 9a.75.75 0 0 1-1.06 0m6.14-7.2L8.27 8.668c.065-.583.281-1.056.635-1.367.289-.253.684-.419 1.205-.473M7.825 12.8l3.414-3.415c-.126 2.12-1.496 3.297-3.414 3.415m7.705-6.58a.75.75 0 0 0-1.06 1.06c.508.509.53 1.202.53 1.72 0 .739-.014 1.203-.53 1.72-.165.164-.455.307-.825.405a3.8 3.8 0 0 1-.895.125H12a.75.75 0 0 0 0 1.5h.75c.31 0 .787-.045 1.28-.175.48-.127 1.065-.36 1.5-.795.97-.97.97-1.991.97-2.75v-.06c0-.51.002-1.778-.97-2.75"
                    fill="#FF447C"
                  />
                </svg>
                <span className={"oui-text-danger-light"}>Disconnect</span>
              </Flex>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};