import {
  CloseCircleFillIcon,
  Input,
  toast,
} from "@orderly.network/ui";
import { FC, useRef, useState } from "react";
import { Checkbox } from "./checkbox";

export const Message: FC<{
  message: string;
  setMessage: any;
  check: boolean;
  setCheck: any;
}> = (props) => {
  const { message, setMessage, check, setCheck } = props;
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="oui-mt-3 oui-mb-6 oui-flex oui-items-center">
      <Checkbox
      className="oui-mt-[2px]"
        checked={check}
        onCheckedChange={(e: boolean) => {
          setCheck(e);
        }}
      />
      <div
        className="oui-text-xs oui-text-base-contrast-54 oui-ml-1 hover:oui-cursor-pointer"
        onClick={() => {
          setCheck(!props.check);
        }}
      >
        Your message
      </div>
      <div className="oui-bg-base-900 oui-mx-2 oui-rounded-sm">
        <Input
          ref={inputRef}
          placeholder="Max 25 characters"
          classNames={{
            root: "oui-w-[320px]"
          }}
          size="sm"
          value={message}
          autoFocus={false}
          suffix={
            focus && (
              <button
                className="oui-mr-3 oui-cursor-pointer"
                onMouseDown={(e) => {
                  console.log("set message to empty");

                  setMessage("");
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 50);
                  e.stopPropagation();
                }}
              >
                <CloseCircleFillIcon size={18} color="white" />
              </button>
            )
          }
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => {
            if (e.target.value.length > 25) {
              toast.error("Maximum support of 25 characters");
              return;
            }
            setCheck(e.target.value.length > 0);
            setMessage(e.target.value);
          }}
        />
      </div>
    </div>
  );
};