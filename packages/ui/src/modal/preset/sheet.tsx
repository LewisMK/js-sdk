import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../sheet/sheet";
import { modalActions } from "../modalContext";
import { create } from "../modalHelper";
import { useModal } from "../useModal";
import React from "react";

export interface SheetProps {
  title: string | React.ReactNode;
  content?: React.ReactNode;
  // contentClassName?: string;
  classNames?: {
    content?: string;
    body?: string;
  };
}

const SimpleSheet = create<SheetProps>((props) => {
  const { classNames = {} } = props;
  const { visible, hide, resolve, onOpenChange } = useModal();
  return (
    <Sheet open={visible} onOpenChange={onOpenChange}>
      <SheetContent
        className={classNames.content}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <SheetHeader>
          <SheetTitle>{props.title}</SheetTitle>
        </SheetHeader>
        <div className={classNames.body}>{props.content}</div>
      </SheetContent>
    </Sheet>
  );
});

export const sheet = (props: SheetProps) => {
  return modalActions.show(SimpleSheet, props);
};