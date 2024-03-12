import { Button, Container, Nav, Navbar, NavDropdown, Stack } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom'
import { EmpiricalActions } from '../apps/empirical/EmpiricalActions';




export default () => {
  
  const appName = useSelector(state => state.appName)

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='header' fixed='top'>
      <Container fluid>
        <Navbar.Brand href="/">Empirical Thresholding</Navbar.Brand>
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