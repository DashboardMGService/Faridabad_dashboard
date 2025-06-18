export const formatIndianCurrency = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return '₹0';
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
};
