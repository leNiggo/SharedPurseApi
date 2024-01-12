import * as currency from 'currency.js';

export const EURO = (value: currency.Any) =>
  currency(value, { symbol: '€', decimal: ',', separator: '.' });
