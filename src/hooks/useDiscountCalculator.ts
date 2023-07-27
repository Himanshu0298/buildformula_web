import { ChangeEventHandler } from "react";

export function useSyncedFields(
  base = 0,
  amountKey: string,
  percentKey: string,
  set: (key: string, value: number) => void,
) {
  const onChangeAmount: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: amount } = e.target;

    //Fixing the amount 
    const fixAmount = amount > base ? base:amount
    set(amountKey, fixAmount);

    // Calculate the percentage based on the new amount and update the formik value for the percentage field
    const percent = ((fixAmount / base) * 100).toFixed(2);
    if (isNaN(fixAmount) || parseInt(percent) >= 100) {
      set(percentKey, 100);
    } else {
      set(percentKey, parseInt(percent));
    }
  };

  const onChangePercent: ChangeEventHandler<HTMLInputElement> = e => {
    const { valueAsNumber: percent } = e.target;
    //Fixing the percent 
    const fixPercent = percent > 100 ? 100 : percent;
    set(percentKey, fixPercent);

    // Calculate the amount based on the new percentage and update the formik value for the amount field
    const amount = ((base * fixPercent) / 100).toFixed(2);
    if (isNaN(fixPercent) || parseInt(amount) > base) {
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
