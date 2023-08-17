const API_BASE_URL = 'http://localhost:4000'
const API_URL = 'http://localhost:4000/api/employees'

window.onload = () => {
    getEmployees()
}

const getEmployees = () => {
    fetch(API_URL, {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        buildEmployee(data)
    })
}

const buildEmployee = (employees) => {
    let employeeContent = ''
    for(employee of employees) {
        const hireDate = new Date(employee.date_employed).toDateString();
        const employeeImg = employee.image !== undefined 
            ? `${API_BASE_URL}/${employee.image.replace("\\", "/")}`
            : "/client/assets/default-employee-image.jpg"
        console.log(employeeImg);
        const employeeLink = `/client/employee.html?id=${employee.id}`

        employeeContent += 
        `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-4">
                        <img src="${employeeImg}" class="card-img-top">
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h5 class="card-title">${employee.name}</h5>
                            <p class="card-text">Employed on ${hireDate}</p>
                            <p class="card-text">Designation ID: ${employee.designation_id}</p>
                            <p class="card-text">Job Title: ${employee.job_title}</p>
                            <a href="${employeeLink}" class="btn btn-primary">More Details</a>
                        </div>
                    </div>
                </div>
                
                
            </div>
        `
    }
    document.querySelector('#employees').innerHTML = employeeContent
}