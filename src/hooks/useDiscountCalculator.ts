import { round } from 'lodash';

type HandleChangeEvent = {
  target: {
    value: string;
  };
};

// The custom hook
export function useSyncedFields(formik, base = 0, amountKey: string, percentKey: string) {
  const onChangeAmount = (e: HandleChangeEvent) => {
    const { value: amount } = e.target;

    // Calculate the percentage based on the new amount and update the formik value for the percentage field
    const percent = (parseInt(amount) / base) * 100;
    formik.setFieldValue(percentKey, round(percent));
  };

  const onChangePercent = (e: HandleChangeEvent) => {
    const { value: percent } = e.target;

    // Calculate the amount based on the new percentage and update the formik value for the amount field
    const amount = (parseFloat(percent) * base) / 100;
    formik.setFieldValue(amountKey, amount);
  };

  return {
    onChangeAmount,
    onChangePercent,
  };
}
