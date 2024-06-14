import { ExtensionSlot } from "../../plugin/slot";
import { Box } from "../../box";
import { Spinner } from "../../spinner/spinner";

export const TablePlaceholder = (props: {
  visible?: boolean;
  loading?: boolean;
}) => {
  const { visible, loading } = props;

  if (!visible) return null;

  return (
    <Box
      position="absolute"
      zIndex={10}
      left={0}
      top={0}
      right={0}
      bottom={0}
      className="oui-backdrop-blur-md oui-flex oui-justify-center oui-items-center"
    >
      {loading ? <Spinner /> : <ExtensionSlot position={"emptyDataState"} />}
    </Box>
  );
};
