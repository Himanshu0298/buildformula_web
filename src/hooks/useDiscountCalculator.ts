type HandleChangeEvent = {
  target: {
    value: string;
  };
};

// The custom hook
export function useSyncedFields(formik, base = 0, amountKey: string, percentKey: string) {
  const onChangeAmount = (e: HandleChangeEvent) => {
    const { value: amount } = e.target;
    formik.setFieldValue(amountKey, amount);

    // Calculate the percentage based on the new amount and update the formik value for the percentage field
    const percent = ((parseInt(amount) / base) * 100).toFixed(2);
    if (isNaN(parseInt(amount)) || parseInt(percent) === 100) {
      formik.setFieldValue(percentKey, 0);
    } else {
      formik.setFieldValue(percentKey, percent);
    }
  };

  const onChangePercent = (e: HandleChangeEvent) => {
    const { value: percent } = e.target;
    formik.setFieldValue(percentKey, percent);

    // Calculate the amount based on the new percentage and update the formik value for the amount field
    const amount = ((base * parseFloat(percent)) / 100).toFixed(2);
    if (isNaN(parseInt(percent)) || parseInt(amount) > base) {
      formik.setFieldValue(amountKey, 0);
    } else {
      formik.setFieldValue(amountKey, amount);
    }
  };

  return {
    onChangeAmount,
    onChangePercent,
  };
}
