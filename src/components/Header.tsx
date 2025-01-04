"use client";

import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link href={"/"} className="navbar-brand">
            DuyKa
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/blogs" className="nav-link">
              Blogs
            </Link>
            <Link href="/facebook" className="nav-link">
              Facebook
            </Link>
            <Link href="/youtube" className="nav-link">
              Youtube
            </Link>
            <Link href="/tiktok" className="nav-link">
              Tik Tok
            </Link>
            <Link href="/admin" className="nav-link">
              Admin
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
