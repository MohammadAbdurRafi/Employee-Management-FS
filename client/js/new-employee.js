const API_URL = 'http://localhost:4000/api/employee'

const submitNewEmployee = () => {
    const designation_id = document.getElementById('form-employee-designation-id').value
    const name = document.getElementById('form-employee-name').value
    const job_title = document.getElementById('form-employee-job-title').value
    const salary = document.getElementById('form-employee-salary').value
    const email_address = document.getElementById('form-employee-email').value
    const phone_number = document.getElementById('form-employee-phone-number').value
    const address = document.getElementById('form-employee-address').value
    const image = document.getElementById('form-employee-image')

    let data = new FormData()
    data.append("designation_id", designation_id)
    data.append("name", name)
    data.append("job_title", job_title)
    data.append("salary", salary)
    data.append("email_address", email_address)
    data.append("phone_number", phone_number)
    data.append("address", address)
    data.append("image", image.files[0])

    fetch(API_URL, {
        method: "POST",
        body: data
    }),then((response) => {
        console.log('response', response);
        if (response.ok) {
            window.location.href = '/client/index.html'
        } else {
            console.log('Error submitting employee data');
        }
    }).catch((err) => {
        console.log(err);
    })
}