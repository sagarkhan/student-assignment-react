import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, FormControl, Nav } from 'react-bootstrap';
import logo from '../../assets/images/favicon.ico';
import { ROUTES } from '../../utils/constants';
import StudentService from '../../services/student/student.service';

const Header = () => {
  const studentService = new StudentService();
  const navLinkStyles = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0px 8px',
  };

  const handleChange = (e) => {
    const term = e?.target?.value;
    studentService.search(term);
  };

  return (
    <Navbar className="bg-dark justify-content-between" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Link to={ROUTES.HOME} style={navLinkStyles}>
              {' '}
              Home{' '}
            </Link>
          </Nav>
          <Nav>
            <Link to={ROUTES.STUDENT} style={navLinkStyles}>
              {' '}
              Create{' '}
            </Link>
          </Nav>
        </Nav>
      </Navbar.Collapse>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search Student"
          className="mr-sm-2"
          onChange={handleChange}
        />
      </Form>
    </Navbar>
  );
};

export default Header;
