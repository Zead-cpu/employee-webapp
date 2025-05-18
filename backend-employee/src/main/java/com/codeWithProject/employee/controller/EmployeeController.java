// Paketname: gehört zum Controller-Teil der Anwendung
package com.codeWithProject.employee.controller;

// Imports für benötigte Klassen und Annotations
import java.util.List;
import com.codeWithProject.employee.entity.Employee;
import com.codeWithProject.employee.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Diese Klasse ist ein REST-Controller → verarbeitet HTTP-Anfragen
@RestController

// Alle Endpunkte beginnen mit /api, z. B. /api/employees
@RequestMapping("/api")

// Erstellt automatisch einen Konstruktor für alle final-Felder (durch Lombok)
@RequiredArgsConstructor

// Erlaubt Anfragen von allen Domains (Frontend → Backend)
@CrossOrigin("*")
public class EmployeeController {

    // Service-Schicht wird eingebunden (Dependency Injection)
    private final EmployeeService employeeService;

    // POST-Endpunkt → Neuen Mitarbeiter erstellen
    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee) {
        // Aufruf der Service-Methode zum Speichern
        return employeeService.postEmployee(employee);
    }

    // GET-Endpunkt → Alle Mitarbeiter abrufen
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // DELETE-Endpunkt → Mitarbeiter mit bestimmter ID löschen
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            // Versuch, den Mitarbeiter zu löschen
            employeeService.deleteEmployee(id);
            // Erfolgsmeldung zurückgeben
            return new ResponseEntity<>("Employee with ID " + id + " deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            // Wenn Mitarbeiter nicht gefunden, Fehler zurückgeben
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // GET-Endpunkt → Einzelnen Mitarbeiter anhand der ID abrufen
    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);

        // Wenn kein Mitarbeiter gefunden → 404 zurückgeben
        if (employee == null) return ResponseEntity.notFound().build();

        // Ansonsten: Mitarbeiterdaten als Antwort zurückgeben
        return ResponseEntity.ok(employee);
    }

    // PATCH-Endpunkt → Mitarbeiterdaten aktualisieren (nur bestimmte Felder)
    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        // Aktualisierter Mitarbeiter wird zurückgegeben
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);

        // Wenn null zurückkommt → Fehler
        if (updatedEmployee == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        // Sonst: aktualisierter Mitarbeiter zurückgeben
        return ResponseEntity.ok(updatedEmployee);
    }
}
