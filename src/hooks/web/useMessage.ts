import { DialogOptions, showDialog, showToast, ToastOptions } from "vant";
import "vant/es/dialog/style";
// import { showDialog } from "vant";
// import "vant/lib/dialog/style";

function createConfirm(options: DialogOptions): Promise<unknown> {
  const opt: DialogOptions = { messageAlign: "left", ...options };
  return showDialog(opt) as unknown as Promise<unknown>;
}

function infoToast(options: ToastOptions): Promise<unknown> {
  const opt: ToastOptions = { message: "toast", icon: "none", ...options };
  return showToast(opt) as unknown as Promise<unknown>;
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createConfirm,
    infoToast,
  };
}
