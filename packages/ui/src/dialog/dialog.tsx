import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VariantProps, tv } from "tailwind-variants";
import { CloseIcon } from "../icon/close";

const dialogVariants = tv({
  slots: {
    overlay: [
      "oui-fixed",
      "oui-inset-0",
      "oui-z-50",
      "oui-bg-black/80",
      "data-[state=open]:oui-animate-in",
      "data-[state=closed]:oui-animate-out",
      "data-[state=closed]:oui-fade-out-0",
      "data-[state=open]:oui-fade-in-0",
    ],
    content: [
      "oui-fixed",
      "oui-left-[50%]",
      "oui-top-[50%]",
      "oui-z-50",
      "oui-grid",
      "oui-w-full",
      "oui-max-w-lg",
      "oui-translate-x-[-50%]",
      "oui-translate-y-[-50%]",
      // "oui-gap-4",
      "oui-bg-base-8",
      "oui-text-base-contrast-54",
      // "oui-py-4",
      "oui-px-5",

      "oui-shadow-lg",
      "oui-duration-200",
      "data-[state=open]:oui-animate-in",
      "data-[state=closed]:oui-animate-out",
      "data-[state=closed]:oui-fade-out-0",
      "data-[state=open]:oui-fade-in-0",
      "data-[state=closed]:oui-zoom-out-95",
      "data-[state=open]:oui-zoom-in-95",
      "data-[state=closed]:oui-slide-out-to-left-1/2",
      "data-[state=closed]:oui-slide-out-to-top-[48%]",
      "data-[state=open]:oui-slide-in-from-left-1/2",
      "data-[state=open]:oui-slide-in-from-top-[48%]",
      "sm:oui-rounded-lg",
    ],
    body: ["oui-py-5", "oui-text-xs"],
    close: [
      "oui-absolute",
      "oui-right-4",
      "oui-top-4",
      "oui-opacity-70",
      "oui-ring-offset-background",
      "oui-transition-opacity",
      "hover:oui-opacity-100",
      "focus:oui-outline-none",
      "focus:oui-ring-2",
      "focus:oui-ring-ring",
      "focus:oui-ring-offset-2",
      "disabled:oui-pointer-events-none",
      "data-[state=open]:oui-bg-accent",
      "data-[state=open]:oui-text-muted-foreground",
    ],
    header: [
      "oui-flex",
      "oui-flex-col",
      // "oui-pb-4"
    ],
    footer: [
      "oui-flex",
      "oui-flex-row",
      "oui-justify-end",
      "oui-space-x-2",
      // "has-[&>*:nth-child(1)]:oui-bg-red-400",
      // "oui-has-[:checked]:oui-bg-indigo-50",
      "has-[button]:oui-bg-red-50",
    ],
    title: ["oui-text-base", "oui-py-4"],
    desc: [
      "oui-text-xs",
      "oui-text-warning",
      "oui-pt-2",
      "oui-text-center",
      "oui-pb-3",
      "has-[&_+_div]:oui-pb-3",
    ],
  },
  variants: {
    size: {
      sm: {
        content: ["oui-max-w-sm"],
      },
      md: {
        content: ["oui-max-w-md"],
      },
      lg: {
        // content: ["oui-max-w-2xl"],
      },
    },
  },
});

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { overlay } = dialogVariants();
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={overlay({ className })}
      {...props}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogVariants> & {
      closable?: boolean;
    }
>(({ className, children, size, closable = true, ...props }, ref) => {
  const { content, close } = dialogVariants({ className, size });
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={content({ className })}
        {...props}
      >
        {children}
        {closable && (
          <DialogPrimitive.Close className={close()}>
            <CloseIcon size={16} color="white" />
            <span className="oui-sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { header } = dialogVariants();
  return <div className={header({ className })} {...props} />;
};
DialogHeader.displayName = "DialogHeader";

const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { body } = dialogVariants();
  return <div className={body({ className })} {...props} />;
};

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { footer } = dialogVariants();
  return <div className={footer({ className })} {...props} />;
};
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  const { title } = dialogVariants();
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={title({ className })}
      {...props}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  const { desc } = dialogVariants();
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={desc({ className })}
      {...props}
    />
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};