import { ChangeEventHandler } from "react";

export function useSyncedFields(
  base = 0,
  amountKey: string,
  percentKey: string,
  set: (key: string, value: number) => void,
) {
  // console.log('🚀 ~', amountKey, percentKey, base);
  const onChangeAmount: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: amount } = e.target;
    set(amountKey, amount);

    // Calculate the percentage based on the new amount and update the formik value for the percentage field
    const percent = ((amount / base) * 100).toFixed(2);
    if (isNaN(amount) || parseInt(percent) === 100) {
      set(percentKey, 0);
    } else {
      set(percentKey, parseInt(percent));
    }
  };

  const onChangePercent: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: percent } = e.target;
    set(percentKey, percent);

    // Calculate the amount based on the new percentage and update the formik value for the amount field
    const amount = ((base * percent) / 100).toFixed(2);
    if (isNaN(percent) || parseInt(amount) > base) {
      set(amountKey, 0);
    } else {
      set(amountKey, parseInt(amount));
    }
  };

  return {
    onChangeAmount,
    onChangePercent,
  };
}
