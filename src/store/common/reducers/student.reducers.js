import { v4 as uuidv4 } from 'uuid';

export default function StudentReducer(
  state = {
    students: [],
  },
  action,
) {
  const students = [...state.students];
  const { payload } = action;
  switch (action.type) {
    case 'CREATE':
      payload.uniqueId = uuidv4();
      students.push(payload);
      return { ...state, students };
    case 'EDIT':
      students.forEach((student, index) => {
        if (student.uniqueId === payload?.id) {
          payload.data.uniqueId = payload?.id;
          students.splice(index, 1, payload?.data);
        }
      });
      return { ...state, students };
    case 'REMOVE':
      const { payload: id } = action;
      for (let i = 0; i < students.length; i++) {
        const item = students[i];
        if (item.uniqueId === id) {
          students.splice(i, 1);
          break;
        }
      }
      return { ...state, students };
    default:
      return state;
  }
}
