// Paket, zu dem diese Klasse gehört
package com.codeWithProject.employee.entity;

// JPA-Importe für Entity, ID, automatische Generierung
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// Lombok-Import für automatische Getter, Setter usw.
import lombok.Data;

// Diese Klasse wird als Datenbank-Tabelle behandelt
@Entity

// Lombok erzeugt automatisch:
// - Getter und Setter
// - toString()
// - equals() und hashCode()
// - Konstruktor
@Data
public class Employee {

    // Das ist die eindeutige ID des Mitarbeiters (Primärschlüssel)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // wird automatisch generiert (z. B. 1, 2, 3, …)
    private Long id;

    // Weitere Felder der Tabelle (Spalten)
    private String name;       // Name des Mitarbeiters
    private String email;      // E-Mail-Adresse
    private String phone;      // Telefonnummer
    private String department; // Abteilung
}
