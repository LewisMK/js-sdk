import { FavoritesTab } from "./favoritesTabs.ui";
import {
  useFavoritesTabScript,
  UseFavoritesTabScriptOptions,
} from "./favoritesTabs.script";

export type FavoritesTabWidgetProps = UseFavoritesTabScriptOptions & {
  className?: string;
};

export const FavoritesTabWidget: React.FC<FavoritesTabWidgetProps> = (
  props
) => {
  const { className, ...rest } = props;
  const state = useFavoritesTabScript(rest);
  return <FavoritesTab {...state} size={props.size} className={className} />;
};
