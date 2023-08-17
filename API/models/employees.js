const employeePATH = "./employee.json"
const fs = require('fs')

class Employee {

    get() {
        return this.readData()
    }

    getIndividualEmployee(employeeId) {
        const employees = this.readData()
        const employee = employees.find((e) => e.id === employeeId)
        console.log(employee);
        return employee
    }

    add(newEmployee) {
        const currentEmployees = this.readData()
        currentEmployees.unshift(newEmployee)
        this.storeData(currentEmployees)
    }
    
    readData() {
        let rawData = fs.readFileSync(employeePATH)
        let employees = JSON.parse(rawData)
        return employees
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData)
        fs.writeFileSync(employeePATH, data)
    }

    static getPATH() {
        return employeePATH
    }
}

module.exports = { Employee, employeePATH }