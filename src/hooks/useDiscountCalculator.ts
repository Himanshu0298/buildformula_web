import { ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';
import { DECIMAL_REGEX } from 'utils/constant';

export function useSyncedFields(
  base = 0,
  amountKey: string,
  percentKey: string,
  set: (key: string, value: number) => void,
) {
  const onChangeAmount: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: amount = 0 } = e.target;

    // Fixing the amount if it is greater than base amount
    const fixAmount = amount > base ? base : amount;
    // Set to zero if less than zero
    const newAmount = isNaN(fixAmount) || fixAmount < 0 ? 0 : fixAmount;
    // matches for two decimals
    if (DECIMAL_REGEX.test(String(newAmount))) {
      set(amountKey, newAmount);

      // Calculate the percentage based on the new amount and update the formik value for the percentage field
      const percent = parseFloat(((newAmount / base) * 100).toFixed(2));

      if (newAmount === 0) {
        set(amountKey, null);
        set(percentKey, 0);
      } else if (percent >= 100 || fixAmount > base) {
        toast.warning('Discount Amount cannot be more than Basic Amount');
        set(percentKey, 100);
      } else {
        set(percentKey, percent);
      }
    }
  };

  const onChangePercent: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: percent = 0 } = e.target;
    // Fixing the percent
    const fixPercent = percent > 100 ? 100 : percent;
    // Set to zero if less than zero
    const newPercent = isNaN(fixPercent) || percent < 0 ? 0 : fixPercent;

    if (newPercent === 0) {
      set(percentKey, null);
    }

    // matches for two decimals
    if (DECIMAL_REGEX.test(String(percent))) {
      set(percentKey, newPercent);

      // Calculate the amount based on the new percentage and update the formik value for the amount field
      const amount = parseFloat(((base * newPercent) / 100).toFixed(2));

      if (newPercent === 0) {
        set(percentKey, null);
        set(amountKey, 0);
      } else if (amount > base || newPercent > 100) {
        toast.warning('Discount percentage should not be more than 100%');
        set(amountKey, base);
      } else {
        set(amountKey, amount);
      }
    }
  };

  return {
    onChangeAmount,
    onChangePercent,
  };
}
