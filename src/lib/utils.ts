export const formatBigInt = (val: number | bigint) => {
  return new Intl.NumberFormat("en-GB", { useGrouping: true }).format(val);
};
