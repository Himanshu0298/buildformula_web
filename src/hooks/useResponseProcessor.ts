export function useResProcessor() {
  return {
    _err: error => {
      console.log('-----> error', error);
      const { response } = error;
      let errorMessage;
      if (response) {
        errorMessage = response?.data?.msg;
      }

      errorMessage = errorMessage || error.message;

      if (typeof errorMessage !== 'string') {
        if (typeof errorMessage === 'object') {
          // eslint-disable-next-line prefer-destructuring
          errorMessage = Object.values(errorMessage)[0];
        }
      }

      console.log('-----> errorMessage', errorMessage);
      return errorMessage;
    },

    _res: response => {
      const { data = {} } = response;
      const msg = data?.msg?.toLowerCase?.();

      if (
        data?.status ||
        (!data?.data?.length && typeof data?.msg === 'string' && msg?.includes('no')) ||
        msg?.includes('not')
      ) {
        return data;
      }
      console.log('-------->');
      // eslint-disable-next-line no-throw-literal
      throw { response };
    },
  };
}
