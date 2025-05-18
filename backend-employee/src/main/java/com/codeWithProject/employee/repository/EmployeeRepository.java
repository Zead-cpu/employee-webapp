// Paket, in dem sich die Klasse befindet
package com.codeWithProject.employee.repository;

// Importiere die Entity-Klasse, auf die sich dieses Repository bezieht
import com.codeWithProject.employee.entity.Employee;

// Importiere das Spring-Data-JPA Repository
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Kennzeichnet diese Schnittstelle als Repository-Komponente für Spring
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Diese Schnittstelle erbt alle Standardmethoden von JpaRepository:
    // - findAll() → Alle Mitarbeiter holen
    // - findById(Long id) → Mitarbeiter nach ID suchen
    // - save(Employee e) → neuen Mitarbeiter speichern oder aktualisieren
    // - deleteById(Long id) → Mitarbeiter löschen
    // → Man muss nichts selber programmieren!
}
