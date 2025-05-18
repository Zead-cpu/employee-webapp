// Bootstrap-Komponenten für Navbar
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

// Link aus React Router, damit du Seiten wechseln kannst, ohne neu zu laden
import { Link } from "react-router-dom";

// CSS für die Navbar (Farbe, Abstand, Text usw.)
import "./Header.css";

// Komponente "Header" (oben im Browser sichtbar)
const Header = () => {
    return (
        <>
            {/* Bootstrap-Navigationsleiste mit blauer Farbe (primary) und dunklem Textstil */}
            <Navbar bg="primary" variant="dark">
                <Container>
                    {/* Link mit dem Titel ganz links */}
                    <Navbar.Brand to="/">
                        <strong>Employee Management System</strong>
                    </Navbar.Brand>

                    {/* Navigationslinks (rechts in der Leiste) */}
                    <Nav className="ml-auto">
                        {/* Link zur Startseite (Tabelle mit Mitarbeitern) */}
                        <Nav.Link as={Link} to="/" className="nav-link">
                            Employees
                        </Nav.Link>

                        {/* Link zur Seite zum neuen Mitarbeiter hinzufügen */}
                        <Nav.Link as={Link} to="/employee" className="nav-link">
                            Post Employee
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

// Komponente exportieren, damit sie in App.js verwendet werden kann
export default Header;
