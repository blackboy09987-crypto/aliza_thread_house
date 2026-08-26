export const WHATSAPP_NUMBER = "923710122747";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const DELIVERY_FEE_CENTS = 30000; // Rs. 300

export const PAYMENT_METHODS = [
  {
    name: "EasyPaisa",
    accountName: "Aliza",
    accountNumber: WHATSAPP_NUMBER.replace(/^92/, "0"),
  },
  {
    name: "JazzCash",
    accountName: "Aliza",
    accountNumber: WHATSAPP_NUMBER.replace(/^92/, "0"),
  },
] as const;
