import { modal } from "@orderly.network/ui";
import { AccountSheetWidget } from "../../accountSheet";
import { useTradingPageContext } from "../../../../provider/context";
import { useAccount } from "@orderly.network/hooks";
import { useTranslation } from "@orderly.network/i18n";
import { AccountState as AccountStateType } from "@orderly.network/core";

export const useAccountScript = () => {
  const { t } = useTranslation();
  const { referral, tradingRewards, bottomSheetLeading } =
    useTradingPageContext();
  const { account, state } = useAccount();

  const onShowAccountSheet = () => {
    modal.sheet({
      title: t("common.account"),
      leading: bottomSheetLeading,
      content: <AccountSheetWidget {...referral} {...tradingRewards} />,
    });
  };

  return {
    onShowAccountSheet,
    address: account.address,
    state: state as AccountStateType,
  };
};

export type AccountState = ReturnType<typeof useAccountScript>;
