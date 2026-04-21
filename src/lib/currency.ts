export const CURRENCY_RATES = {
  UGX: 1,
  USD: 0.000269, // Based on ~10.76 / 40000
  GBP: 0.0001985, // Based on ~7.94 / 40000
};

export const formatPrice = (price: number, currency: 'UGX' | 'USD' | 'GBP') => {
  const converted = price * CURRENCY_RATES[currency];
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(converted);
};
