import { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

function Inicio() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>Coche-Concesionario</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {/*Coche*/}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Coche
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="altaCoche" link>Alta de Coche</MDBDropdownItem>
                  <MDBDropdownItem href="listaCoches" link>Lista de Coches</MDBDropdownItem>
                  <MDBDropdownItem href="" link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            {/*Concesionario*/}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Concesionario
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="altaConcesionario" link>Alta de Concesionario</MDBDropdownItem>
                  <MDBDropdownItem href="listaConcesionarios" link>Lista de Concesionarios</MDBDropdownItem>
                  <MDBDropdownItem href="" link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Inicio;