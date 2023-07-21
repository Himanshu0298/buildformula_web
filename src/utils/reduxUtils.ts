export function handleLoading(state: any) {
  state.loading = true;
}

export function handleFulfilled(state: any) {
  state.loading = false;
}

export function handleReject(state: any, { payload }: any) {
  state.loading = false;
  state.errorMessage = payload?.error;
}
