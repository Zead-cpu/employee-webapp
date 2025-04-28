package com.codeWithProject.employee.service;

import java.util.Optional;

import java.util.List;
import com.codeWithProject.employee.entity.Employee;
import com.codeWithProject.employee.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // Methode Daten posten
    public Employee postEmployee (Employee employee) {
        return employeeRepository.save(employee);
    }

    // Methode Daten holen
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Methode Daten löschen
    public void deleteEmployee (Long id) {
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee with ID " +  id + "not found");
        }
        employeeRepository.deleteById(id);
    }

    // Methode Get Daten By ID
    public Employee getEmployeeById (Long id){
        return employeeRepository.findById(id).orElse(null);
    }


    // Methode Update Data
    public Employee updateEmployee (Long id, Employee employee){
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            Employee existingEmployee = optionalEmployee.get();

            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());

            return employeeRepository.save(existingEmployee);
        }
        return null;
    }
}

