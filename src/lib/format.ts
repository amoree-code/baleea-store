// Prices in Western digits with thousands separators, the convention Iraqi shoppers use online.
const iqd = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatIQD(amount: number): string {
  return `${iqd.format(amount)} د.ع`;
}
