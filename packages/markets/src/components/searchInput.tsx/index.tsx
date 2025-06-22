import { useTranslation } from "@orderly.network/i18n";
import {
  Box,
  CloseCircleFillIcon,
  cn,
  Input,
  InputProps,
} from "@orderly.network/ui";
import { SearchIcon } from "../../icons";
import { useMarketsContext } from "../marketsProvider";

type SearchInputProps = Pick<InputProps, "classNames" | "suffix">;

export const SearchInput = (props: SearchInputProps) => {
  const { classNames, suffix } = props;

  const { t } = useTranslation();

  const { searchValue, onSearchValueChange, clearSearchValue } =
    useMarketsContext();

  return (
    <Input
      value={searchValue}
      onValueChange={onSearchValueChange}
      placeholder={t("markets.search.placeholder")}
      classNames={{
        ...classNames,
        // use mt-px to fix the top border issue
        root: cn("oui-mt-px oui-border oui-border-line", classNames?.root),
      }}
      size="sm"
      prefix={
        <Box pl={3} pr={1}>
          <SearchIcon className="oui-text-base-contrast-36" />
        </Box>
      }
      suffix={
        suffix ||
        (searchValue && (
          <Box mr={2}>
            <CloseCircleFillIcon
              size={14}
              className="oui-cursor-pointer oui-text-base-contrast-36"
              onClick={clearSearchValue}
            />
          </Box>
        ))
      }
      autoComplete="off"
    />
  );
};
