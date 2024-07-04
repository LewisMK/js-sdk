import React from "react";
import { BaseIcon, BaseIconProps } from "./baseIcon";

export const EyeCloseIcon = React.forwardRef<SVGSVGElement, BaseIconProps>(
  (props, ref) => {
    const { opacity = 0.54, ...rest } = props;
    return (
      <BaseIcon ref={ref} {...rest}>
        <path
          fill="currentcolor"
          fillOpacity={opacity}
          d="M12.001 3.998c-2.959-.007-5.452 1.454-7.5 3.844a16.654 16.654 0 00-1.812 2.562c-.302.528-.486.936-.594 1.188a1.058 1.058 0 000 .812c.108.252.292.66.594 1.188.401.703.87 1.419 1.406 2.094.085.107.76.873 1.344 1.468l-1.157 1.125a1.03 1.03 0 000 1.438 1.03 1.03 0 001.438 0l14-14a1.03 1.03 0 000-1.438 1.014 1.014 0 00-.719-.281c-.256 0-.523.086-.719.28l-1.28 1.314c-1.654-1.106-3.298-1.59-5-1.594zm0 4c.518 0 1.31.137 2.031.562l-1.53 1.532c-.158-.082-.457-.094-.5-.094a2 2 0 00-2 2c0 .044-.015.347.03.53-.192.234-1.5 1.5-1.5 1.5a4.204 4.204 0 01-.53-2.03c-.012-2.21 1.79-4 4-4zm7.938.344s-9.755 9.718-11.063 11.03c1.44.572 2.918.626 3.125.626 2.96 0 5.452-1.454 7.5-3.844a16.652 16.652 0 001.812-2.562c.302-.528.486-.936.594-1.188a1.04 1.04 0 000-.812c-.227-.52-.654-1.347-1.312-2.313-.177-.26-.656-.937-.656-.937z"
        />
      </BaseIcon>
    );
  }
);

EyeCloseIcon.displayName = "EyeCloseIcon";