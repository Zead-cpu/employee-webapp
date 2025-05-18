// Wir holen uns Funktionen und Komponenten, die wir brauchen
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";  // für das Layout
import Row from "react-bootstrap/Row";              // eine Zeile
import Col from "react-bootstrap/Col";              // eine Spalte
import Table from "react-bootstrap/Table";          // die Tabelle
import Button from "react-bootstrap/Button";        // die Buttons
import { useNavigate } from "react-router-dom";     // für Weiterleitung zur Bearbeitungsseite

// Das ist die Hauptkomponente für die Mitarbeiter-Übersicht
const Dashboard = () => {
    // Hier speichern wir die Mitarbeiterdaten, die vom Server kommen
    const [employees, setEmployees] = useState([]);

    // Damit können wir zu einer anderen Seite springen (z. B. zum Bearbeiten)
    const navigate = useNavigate();

    // Diese Funktion wird automatisch einmal beim Start ausgeführt
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // Wir holen uns die Liste der Mitarbeiter vom Backend
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json(); // Wir wandeln die Antwort in Daten um

                // Wir speichern die Daten in unsere Variable "employees"
                setEmployees(data);
            } catch (error) {
                console.error("Fehler beim Laden der Mitarbeiter:", error.message);
            }
        };

        fetchEmployees(); // Wir rufen die Funktion auf
    }, []); // [] bedeutet: nur beim ersten Laden der Seite ausführen

    // Diese Funktion löscht einen Mitarbeiter, wenn der Button geklickt wird
    const handleDelete = async (employeeId) => {
        try {
            // Sende eine Anfrage an das Backend, um den Mitarbeiter zu löschen
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE",
            });

            // Wenn das Löschen geklappt hat, aktualisieren wir die Tabelle
            if (response.ok) {
                setEmployees((alteListe) =>
                    alteListe.filter((mitarbeiter) => mitarbeiter.id !== employeeId)
                );
            }

            console.log(`Mitarbeiter mit ID ${employeeId} wurde gelöscht`);
        } catch (error) {
            console.error("Fehler beim Löschen:", error.message);
        }
    };

    // Wenn man auf "Update" klickt, springt man zur Bearbeitungsseite
    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    };

    // Hier beginnt der sichtbare Teil (JSX): Was auf der Webseite angezeigt wird
    return (
        <>
            {/* Außenrahmen mit Abstand oben */}
            <Container className="mt-5">
                <Row>
                    <Col>
                        {/* Überschrift */}
                        <h1 className="text-center">Employees</h1>

                        {/* Tabelle mit allen Mitarbeitern */}
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Wir gehen alle Mitarbeiter durch und zeigen sie in Zeilen an */}
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            {/* Wenn man klickt, wird Bearbeitungsfunktion aufgerufen */}
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => handleUpdate(employee.id)}
                                            >
                                                Update
                                            </Button>{" "}
                                            {/* Wenn man klickt, wird Löschen-Funktion aufgerufen */}
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => handleDelete(employee.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

// Wir exportieren die Komponente, damit wir sie in der App verwenden können
export default Dashboard;
