import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/common.module.scss';
import StorageService from '../../../../services/storage/storage.service';
import { STORAGE_ENGINES } from '../../../../utils/constants';
import StudentCard from '../components/student-card.component';
import { search } from '../../../../utils/common';
import EmptyState from '../../../../components/empty-state/empty-state';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.storage = new StorageService(STORAGE_ENGINES.REDUX);
    this.students = [];
  }

  renderStudents() {
    const { application, term } = this.props;
    const cards = search(term, application?.students).map((student) => (
      <Col key={student.uniqueId} xs={12} md={4} lg={3}>
        <div className={styles['student-card']}>
          <StudentCard student={student} />
        </div>
      </Col>
    ));
    return cards.length ? cards : <EmptyState />;
  }

  render() {
    return (
      <div className={styles['container']}>
        <p className={styles['heading']}>Students</p>
        <Container fluid="true">
          <Row>{this.renderStudents()}</Row>
        </Container>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  application: PropTypes.object,
  term: PropTypes.string,
};

HomeContainer.defaultProps = {
  application: {},
  term: '',
};

const mapStateToProps = (state) => ({
  application: { ...state.application },
  term: state?.common?.term || '',
});

export default connect(mapStateToProps)(HomeContainer);
