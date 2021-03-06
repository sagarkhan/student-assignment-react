export function loader(action) {
  return {
    type: 'LOADER_VIEW',
    payload: action,
  };
}

export function errorHandler(error) {
  return {
    type: 'ERROR_HANDLER',
    payload: error,
  };
}

export function search(action) {
  return {
    type: 'SEARCH',
    payload: action,
  };
}
