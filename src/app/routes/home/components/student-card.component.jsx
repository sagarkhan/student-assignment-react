import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styles from '../styles/card.module.scss';
import StudentService from '../../../../services/student/student.service';
import { ROUTES } from '../../../../utils/constants';

class StudentCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.studentService = new StudentService();
  }

  remove(uniqueId) {
    this.studentService.remove(uniqueId);
  }

  edit(student) {
    const { history } = this.props;
    const route = ROUTES.STUDENT.replace(':id?', student?.uniqueId);
    history.push(route, {
      student,
      action: 'edit'
    });
  }

  renderStudent(student = {}) {
    const temp = { ...student };
    delete temp.avatar;
    const keys = Object.keys(temp);
    return keys.map((key) => (
      <section key={key} className={styles['section']}>
        <p className={styles['label']}> {key.toUpperCase()}: </p>
        <p className={styles['value']}> {temp[key]} </p>
      </section>
    ));
  }

  render() {
    const { student } = this.props;
    const avatarStyles = {
      background: `url(${student?.avatar || this.defaultAvatar})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
    return (
      <div className={styles['container']}>
        <div className={styles['card_actions']}>
          <Button
            className={styles['action']}
            variant="outline-primary"
            size="sm"
            onClick={() => this.edit(student)}
          >
            <i className="material-icons"> edit </i>
          </Button>
          <Button
            className={styles['action']}
            variant="outline-danger"
            size="sm"
            onClick={() => this.remove(student?.uniqueId)}
          >
            <i className="material-icons"> delete </i>
          </Button>
        </div>
        <div className={styles['avatar']} style={avatarStyles} />
        <div className={styles['details']}>{this.renderStudent(student)}</div>
      </div>
    );
  }
}

StudentCard.propTypes = {
  student: PropTypes.object,
  history: PropTypes.any,
};

StudentCard.defaultProps = {
  student: {},
  history: {},
};

export default withRouter(StudentCard);
