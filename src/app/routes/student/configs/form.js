import validator from 'validator';

const StudentForm = {
  name: {
    type: 'text',
    key: 'name',
    placeholder: 'Name',
    validate: (val) => {
      const value = String(val);
      if (validator.isEmpty(value)) {
        return 'This field is required';
      }
      return null;
    }
  },
  age: {
    type: 'text',
    key: 'age',
    placeholder: 'Age',
    validate: (val) => {
      const value = String(val);
      if (validator.isEmpty(value)) {
        return 'This field is required';
      }

      if (!validator.isNumeric(value)) {
        return 'Only numeric fields allowed';
      }

      if (value > 25) {
        return 'Age should be less than or equal to 25 years';
      }

      return null;
    }
  },
  class: {
    type: 'text',
    key: 'class',
    placeholder: 'Class',
    validate: (val) => {
      const value = String(val);
      if (validator.isEmpty(value)) {
        return 'This field is required';
      }
      return null;
    }
  },
  school: {
    type: 'text',
    key: 'school',
    placeholder: 'School',
    validate: (val) => {
      const value = String(val);
      if (validator.isEmpty(value)) {
        return 'This field is required';
      }
      return null;
    }
  },
  avatar: {
    type: 'text',
    key: 'avatar',
    placeholder: 'Avatar URL',
    validate: (val) => {
      const value = String(val);
      if (validator.isEmpty(value)) {
        return 'This field is required';
      }

      if (!validator.isURL(value)) {
        return 'Invalid URL';
      }
      return null;
    }
  }
};

export default StudentForm;
