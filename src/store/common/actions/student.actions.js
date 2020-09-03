export function create(action) {
  return {
    type: 'CREATE',
    payload: action,
  };
}

export function edit(action) {
  return {
    type: 'EDIT',
    payload: action,
  };
}

export function remove(action) {
  return {
    type: 'REMOVE',
    payload: action,
  };
}
