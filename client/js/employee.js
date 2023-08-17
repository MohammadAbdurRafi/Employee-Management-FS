const API_BASE_URL = 'http://localhost:4000/'
const API_URL = 'http://localhost:4000/api/employee/'

window.onload = () => {
    getEmployeeIdParam()
    getEmployee()
}

const getEmployeeIdParam = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("id")
}

const getEmployee = () => {
    const employeeId = getEmployeeIdParam()
    const url = `${API_URL}${employeeId}`
    fetch(url, {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        buildEmployee(data)
    })
}

const buildEmployee = (employee) => {
    const employeeImage = employee.image !== undefined
        ? `${API_BASE_URL}${employee.image.replace("\\", "/")}`
        : "/client/assets/default-employee-image.jpg"
    console.log(employeeImage);
    document.querySelector('.rounded').style.backgroundImage = `url(${employeeImage})`
    document.getElementById('individual-employee-designation-id').innerText = `Designation ID: ${employee.designation_id}`
    document.getElementById('individual-employee-name').innerText = `Name: ${employee.name}`
    document.getElementById('individual-employee-date-employed').innerText = `Date Employed: ${new Date(employee.date_employed).toDateString()}`
    document.getElementById('individual-employee-job-title').innerText = `Job Title: ${employee.job_title}`
    document.getElementById('individual-employee-salary').innerText = `Salary: ${employee.salary}`
    document.getElementById('individual-employee-address').innerText = `Address: ${employee.address}`
    document.getElementById('individual-employee-phone-number').innerText = `Phone Number: ${employee.phone_number}`
    document.getElementById('individual-employee-email').innerText = `Email: ${employee.email}`
}