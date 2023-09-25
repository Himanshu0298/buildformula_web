import { ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';

export function useSyncedFields(
  base = 0,
  amountKey: string,
  percentKey: string,
  set: (key: string, value: number) => void,
) {
  const onChangeAmount: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: amount } = e.target;

    // Fixing the amount
    const fixAmount = amount > base ? base : amount;
    // Set to zero if less than zero
    const newAmount = fixAmount < 0 ? 0 : fixAmount;
    set(amountKey, newAmount);

    // Calculate the percentage based on the new amount and update the formik value for the percentage field
    const percent = ((newAmount / base) * 100).toFixed(2);
    if (isNaN(newAmount) || parseInt(percent) >= 100) {
      toast.warning('Discount Amount cannot be more than Basic Amount');
      set(percentKey, 100);
    } else {
      set(percentKey, parseFloat(percent));
    }
  };

  const onChangePercent: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: percent } = e.target;
    // Fixing the percent
    const fixPercent = percent > 100 ? 100 : percent;
    // Set to zero if less than zero
    const newPercent = fixPercent < 0 ? 0 : fixPercent;
    set(percentKey, newPercent);

    // Calculate the amount based on the new percentage and update the formik value for the amount field
    const amount = ((base * newPercent) / 100).toFixed(2);
    if (isNaN(newPercent) || parseInt(amount) > base || newPercent >= 100) {
      toast.warning('Discount percentage should not be more than 100%');
      set(amountKey, base);
    } else {
      set(amountKey, parseInt(amount));
    }
  };

  return {
    onChangeAmount,
    onChangePercent,
  };
}
