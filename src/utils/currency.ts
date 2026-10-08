/**
 * Currency formatting utility for Pakistani Rupees (PKR)
 */

export const CURRENCY_SYMBOL = 'PKR';

export const formatPKR = (amount: number): string => {
  if (isNaN(amount)) return 'PKR 0';
  return `PKR ${Math.round(amount).toLocaleString('en-PK')}`;
};

export const FREE_SHIPPING_THRESHOLD_PKR = 3500;
export const STANDARD_SHIPPING_PKR = 250;
