// CSS für das Formular laden
import './UpdateUser.css';

// React-Funktionen holen
import { useState, useEffect } from 'react';

// Bootstrap-Komponenten für Formular und Button
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// Funktionen zum Navigieren und zum Lesen der ID aus der URL
import { useNavigate, useParams } from 'react-router-dom';

// Komponente zum Bearbeiten eines Mitarbeiters
const UpdateUser = () => {

    // ID des Mitarbeiters aus der URL holen (z. B. /employee/3 → id = 3)
    const { id } = useParams();

    // Zum Zurückspringen nach dem Speichern
    const navigate = useNavigate();

    // Hier speichern wir die Eingaben aus dem Formular
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    // Diese Funktion wird aufgerufen, wenn man ein Eingabefeld verändert
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Den aktuellen Wert im Zustand speichern
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Wenn die Seite geladen wird, hole die Daten vom Server
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // Mitarbeiterdaten vom Server holen
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();

                // Formular mit den vorhandenen Werten füllen
                setFormData(data);
            } catch (error) {
                console.error("Fehler beim Laden:", error.message);
            }
        };

        fetchEmployee(); // Funktion aufrufen
    }, [id]);

    // Diese Funktion wird aufgerufen, wenn das Formular abgesendet wird
    const handleSubmit = async (e) => {
        e.preventDefault(); // Seite nicht neu laden

        try {
            // Anfrage an den Server schicken, um Daten zu aktualisieren
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: 'PATCH', // PATCH = nur bestimmte Felder ändern
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData) // Daten als JSON senden
            });

            const data = await response.json(); // Antwort auslesen
            console.log("Mitarbeiter geändert:", data);

            // Zurück zur Startseite
            navigate(`/`);
        } catch (error) {
            console.error("Fehler beim Speichern:", error.message);
        }
    };

    // Alles, was im Browser angezeigt wird
    return (
        <>
            {/* Formular in der Mitte der Seite */}
            <div className="center-form">
                {/* Überschrift */}
                <h1>Edit Employee</h1>

                {/* Formular beginnt */}
                <Form onSubmit={handleSubmit}>

                    {/* Eingabefeld: Name */}
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"              // Eingabetyp: Text
                            name="name"              // Name des Feldes
                            placeholder="Enter name" // Platzhalter im Feld
                            value={formData.name}    // aktueller Wert
                            onChange={handleInputChange} // Funktion beim Tippen
                        />
                    </Form.Group>

                    {/* Eingabefeld: E-Mail */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* Eingabefeld: Telefon */}
                    <Form.Group controlId="formBasicPhone">
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* Eingabefeld: Abteilung */}
                    <Form.Group controlId="formBasicDepartment">
                        <Form.Control
                            type="text"
                            name="department"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* Button zum Speichern */}
                    <Button
                        variant="primary"     // Farbe: Blau
                        type="submit"         // Button ist zum Absenden da
                        className="w-100"     // 100 % Breite
                    >
                        Edit Employee
                    </Button>

                </Form>
                {/* Formular endet */}
            </div>
        </>
    );
};

// Komponente exportieren, damit sie in der App verwendet werden kann
export default UpdateUser;
