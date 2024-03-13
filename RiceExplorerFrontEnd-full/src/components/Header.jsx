import { Button, Container, Nav, Navbar, NavDropdown, Stack } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, useLocation } from 'react-router-dom'
import { EmpiricalActions } from '../apps/empirical/EmpiricalActions';



export default () => {

  const appName = useSelector(state => state.appName);
  const location = useLocation();


  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='header' fixed='top'>
      <Container fluid>
        <Nav.Link href="/empirical" style={{ color: location.pathname === '/empirical' ? '#f7cd61' : 'white' }}>Empirical Thresholding</Nav.Link>
        <Nav.Link as={NavLink} to="/cropselection" style={{ color: location.pathname === '/cropselection' ? '#f7cd61' : 'white' }}>Crop Selection</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>

          <Stack direction="horizontal" gap={2}>
              <EmpiricalActions />

          </Stack>
          
        </Navbar.Collapse>
      </Container>


    </Navbar>
  )
}