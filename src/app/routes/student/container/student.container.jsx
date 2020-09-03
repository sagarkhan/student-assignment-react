import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import styles from '../styles/common.module.scss';
import StudentForm from '../configs/form';
import FormError from '../../../../components/form-error/form-error';
import StudentService from '../../../../services/student/student.service';

class StudentContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formInitialValues: {},
      initialized: false,
      action: 'create',
      alert: {
        visible: false,
        variant: 'success',
        message: '',
      },
    };
    this.studentService = new StudentService();
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.init();
  }

  showAlert = (message, variant = 'success') => {
    this.setState({
      alert: {
        visible: true,
        variant,
        message,
      }
    }, () => {
      setTimeout(() => {
        this.setState({
          alert: {
            visible: false,
          }
        });
      }, 2000);
    });
  }

  init = (form = {}) => {
    const { location } = this.props;
    const student = location?.state?.student || {};
    if (!Object.keys(form).length) {
      Object.keys(StudentForm).forEach((key) => {
        // eslint-disable-next-line no-param-reassign
        form[key] = student[key] || '';
      });
    }
    this.setState({
      formInitialValues: form,
      initialized: true,
      action: location?.state?.action || 'create',
    });
  };

  onSubmit = (values, { resetForm }) => {
    const { action } = this.state;
    switch (action) {
      case 'edit':
        const { match } = this.props;
        const { params = {} } = match;
        this.studentService.edit(params?.id, values).then((response) => {
          this.init(response?.data);
          this.showAlert('Record updated successfully');
        });
        break;
      case 'create':
        this.studentService.create(values).then(() => {
          resetForm();
          this.showAlert('Record created successfully');
        });
        break;
      default:
        break;
    }
  };

  onValidate = (values) => {
    const errors = {};
    Object.keys(values).forEach((key) => {
      const hasError = StudentForm[key]?.validate(values[key]);
      if (hasError) {
        errors[key] = hasError;
      }
    });
    return errors;
  };

  renderFormError = (errors, touched, key) => {
    if (errors[key] && touched[key]) {
      return <FormError>{errors[key]}</FormError>;
    }
    return [];
  };

  render() {
    const { formInitialValues, initialized, alert } = this.state;
    return initialized ? (
      <div className={styles['container']}>
        <p className={styles['heading']}> Create Student </p>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={formInitialValues}
          onSubmit={this.onSubmit}
          validate={this.onValidate}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                {Object.keys(StudentForm).map((key) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    key={key}
                    style={{ margin: '8px 0px' }}
                  >
                    <Form.Control
                      type={StudentForm[key].type}
                      placeholder={StudentForm[key].placeholder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[key]}
                      name={key}
                    />
                    {this.renderFormError(errors, touched, key)}
                  </Col>
                ))}
              </Row>
              <div className={styles['form-action']}>
                <Button
                  type="submit"
                  style={{ marginTop: '4px' }}
                  disabled={!isValid}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {alert?.visible ? (
          <Alert variant={alert?.variant}>{alert?.message}</Alert>
        ) : (
          []
        )}
      </div>
    ) : (
      []
    );
  }
}

StudentContainer.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
};

StudentContainer.defaultProps = {
  location: {},
  match: {},
};

export default StudentContainer;
