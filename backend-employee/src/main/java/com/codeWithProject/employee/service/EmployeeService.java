// Paket, in dem sich diese Klasse befindet
package com.codeWithProject.employee.service;

// Notwendige Klassen importieren
import java.util.Optional;
import java.util.List;

import com.codeWithProject.employee.entity.Employee;
import com.codeWithProject.employee.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// Diese Klasse ist ein Service (Geschäftslogik)
@Service

// Erstellt automatisch einen Konstruktor für das finale Feld employeeRepository
@RequiredArgsConstructor
public class EmployeeService {

    // Das Repository, um auf die Datenbank zuzugreifen
    private final EmployeeRepository employeeRepository;

    // Mitarbeiter speichern (POST)
    public Employee postEmployee(Employee employee) {
        // Speichert einen neuen oder aktualisierten Mitarbeiter
        return employeeRepository.save(employee);
    }

    // Alle Mitarbeiter holen (GET)
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Mitarbeiter löschen (DELETE)
    public void deleteEmployee(Long id) {
        // Prüfen, ob Mitarbeiter mit dieser ID existiert
        if (!employeeRepository.existsById(id)) {
            // Falls nicht, werfen wir einen Fehler (für den Controller)
            throw new EntityNotFoundException("Employee with ID " + id + " not found");
        }

        // Wenn vorhanden: Mitarbeiter löschen
        employeeRepository.deleteById(id);
    }

    // Mitarbeiter nach ID holen (GET /employee/{id})
    public Employee getEmployeeById(Long id) {
        // Suche nach der ID – wenn nicht vorhanden, gib null zurück
        return employeeRepository.findById(id).orElse(null);
    }

    // Mitarbeiterdaten aktualisieren (PATCH /employee/{id})
    public Employee updateEmployee(Long id, Employee employee) {
        // Prüfen, ob Mitarbeiter mit der ID existiert
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);

        if (optionalEmployee.isPresent()) {
            // Vorhandenen Mitarbeiter holen
            Employee existingEmployee = optionalEmployee.get();

            // Neue Werte übernehmen
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());

            // Änderungen speichern
            return employeeRepository.save(existingEmployee);
        }

        // Falls ID nicht existiert, gib null zurück
        return null;
    }
}
