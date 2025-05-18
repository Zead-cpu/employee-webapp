// Wir holen uns React-Funktion zum Verwalten von Zuständen (useState)
import { useState } from "react";

// CSS-Datei für das Styling des Formulars
import "./PostUser.css";

// Bootstrap-Komponenten für Formulare und Buttons
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Hook zum Weiterleiten auf eine andere Seite (z. B. zurück zur Startseite)
import { useNavigate } from "react-router-dom";


// Die Komponente zum Erstellen eines neuen Mitarbeiters
const PostUser = () => {

    // Zustand für die Formulardaten: Anfangswert ist leer für jedes Feld
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    // Diese Funktion wird aufgerufen, wenn ein Eingabefeld verändert wird
    const handleInputChange = (event) => {
        const { name, value } = event.target; // Hole Feldname (z. B. "name") und Wert

        // Aktualisiere nur das veränderte Feld im Zustand
        setFormData({
            ...formData,         // vorherige Werte behalten
            [name]: value        // neues Feld aktualisieren
        });
    };

    // Zum Navigieren nach dem Absenden
    const navigate = useNavigate();

    // Diese Funktion wird aufgerufen, wenn das Formular abgeschickt wird
    const handleSubmit = async (e) => {
        e.preventDefault(); // Verhindert, dass die Seite neu lädt

        console.log(formData); // Zeigt die Formulardaten in der Konsole

        try {
            // Sende eine POST-Anfrage ans Backend mit den eingegebenen Daten
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST", // HTTP-Methode POST (zum Erstellen)
                headers: { "Content-Type": "application/json" }, // Sagen, dass wir JSON senden
                body: JSON.stringify(formData) // Formulardaten als JSON umwandeln
            });

            const data = await response.json(); // Server-Antwort auslesen
            console.log("Mitarbeiter erstellt:", data);

            // Nach erfolgreichem Erstellen zurück zur Startseite ("/")
            navigate("/");
        } catch (error) {
            console.log("Fehler beim Erstellen:", error.message);
        }
    };

    // Jetzt kommt das, was im Browser angezeigt wird (JSX)
    return (
        <>
            {/* Container-Div mit zentriertem Formular (wird über CSS gesteuert) */}
            <div className="center-form">
                {/* Überschrift über dem Formular */}
                <h1>Post New Employee</h1>

                {/* Das eigentliche Formular */}
                <Form onSubmit={handleSubmit}>
                    
                    {/* Eingabefeld: Name */}
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"           // Eingabe-Typ: Text
                            name="name"           // Name des Feldes
                            placeholder="Enter name" // Platzhaltertext
                            value={formData.name}     // aktueller Wert
                            onChange={handleInputChange} // bei Änderung neue Daten setzen
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

                    {/* Eingabefeld: Telefonnummer */}
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

                    {/* Abschicken-Button – sendet das Formular ab */}
                    <Button
                        variant="primary"   // Farbe/Stil vom Button (Bootstrap)
                        type="submit"       // Typ ist "submit" = Formular absenden
                        className="w-100"   // 100 % Breite (Bootstrap-Klasse)
                    >
                        Post Employee
                    </Button>

                </Form>
            </div>
        </>
    );
};

// Komponente exportieren, damit sie in der App verwendet werden kann
export default PostUser;
