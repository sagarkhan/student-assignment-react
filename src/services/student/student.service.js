import {
  create,
  remove,
  edit,
} from '../../store/common/actions/student.actions';
import { search } from '../../store/common/actions/common.actions';

class StudentService {
  constructor() {
    this.store = window.store;
  }

  create(payload) {
    return new Promise((resolve) => {
      const { dispatch } = this.store;
      dispatch(create(payload));
      resolve(payload);
    });
  }

  edit(id, payload) {
    const request = {
      id,
      data: payload,
    };
    return new Promise((resolve) => {
      const { dispatch } = this.store;
      dispatch(edit(request));
      resolve(request);
    });
  }

  remove(uniqueId) {
    return new Promise((resolve) => {
      const { dispatch } = this.store;
      dispatch(remove(uniqueId));
      resolve(uniqueId);
    });
  }

  search(term) {
    return new Promise((resolve) => {
      const { dispatch } = this.store;
      dispatch(search(term));
      resolve(term);
    });
  }
}

export default StudentService;
