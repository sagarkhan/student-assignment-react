export default function CommonReducer(
  state = {
    loader: false,
    snackbar: { show: false },
  },
  action,
) {
  switch (action.type) {
    case 'LOADER_VIEW':
      return { ...state, loader: action.payload };

    case 'ERROR_HANDLER':
      return { ...state, error: action.payload };

    case 'SEARCH':
      return { ...state, term: action.payload };
    default:
      return state;
  }
}
