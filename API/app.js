const express = require("express")
const { v4: uuid4 } = require("uuid")
const fs = require("fs")
const multer = require("multer")
const { Designation, designationPATH } = require("./models/designations")
const { Employee, employeePATH } = require("./models/employees")
const designationObject = new Designation()
const employeeObject = new Employee()


const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`)
  }
})

const getExtension = (mimeType) => {
  switch(mimeType) {
    case "image/png":
      return ".png"
    case "image/jpeg":
      return ".jpeg"
    case "image/jpg":
      return ".jpg"
  }
}

const app = express()
const upload = multer({ storage: storage })

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next()
})
app.use("/uploads", express.static("uploads"))

/**
 * GET: All Designations API endpoint
 * http://localhost:4000/api/designations
 */
app.get("/api/designations", (req, res) => {
    res.status(200).json(designationObject.get())
})

/**
 * GET: Retrieving a specific designation from the API
 * http://localhost:4000/api/designation/:designation_id
 */
app.get("/api/designation/:designation_id", (req, res) => {
    const designationId = req.params.designation_id
    const designation = designationObject.getIndividualDesignation(designationId)
    if (designation) {
        res.status(200).send(designation)
    } else {
        res.status(404).send('No designation found!')
    }
})

/**
 * POST: Adding a new designation to the API
 * http://localhost:4000/api/designation
 */
app.post("/api/designation", (req, res) => {
    const newDesignation = {
        id: uuid4(),
        designation: req.body.designation,
        date_created: new Date().toString()
    }
    designationObject.add(newDesignation)
    res.status(201).send({ message: "Designation successfully created", newDesignation: newDesignation })
})

/**
 * DELETE: Delete an existing designation from the API
 * http://localhost:4000/api/designations/:designation_id
 */
app.delete('/api/designations/:designation_id', (req, res) => {
    const id = req.params.designation_id;
    const designations = designationObject.get();
    const designationToDelete = designations.find((el) => el.id === id);
  
    if (!designationToDelete) {
      res.status(404).json({ message: 'Designation not found!' });
      return;
    }
  
    // Remove the designated designation from the array
    const updatedDesignations = designations.filter((el) => el.id !== id);
  
    // Save the updated data back to the file
    fs.writeFile(designationPATH, JSON.stringify(updatedDesignations), (err) => {
      if (err) {
        res.status(500).json({ message: 'Failed to delete the designation.' });
        return;
      }
  
      res.status(200).json({ message: 'Designation successfully deleted' });
    });
  });

/**
 * GET: All Employees API endpoint
 * http://localhost:4000/api/employees
 */
app.get("/api/employees", (req, res) => {
  res.status(200).json(employeeObject.get())
})

/**
 * GET: Retrieving a specific Employee from the API
 * http://localhost:4000/api/employee/:employee_id
 */
app.get("/api/employee/:employee_id", (req, res) => {
  const employeeId = req.params.employee_id
    const employee = employeeObject.getIndividualEmployee(employeeId)
    if (employee) {
        res.status(200).send(employee)
    } else {
        res.status(404).send('No employee found!')
    }
})

/**
 * POST: Adding a new employee to the API
 * http://localhost:4000/api/employee
 */
// Need to figure out designation_id and photo
app.post("/api/employee", upload.single("image"), (req, res) => {
  const newEmployee = {
    id: uuid4(),
    designation_id: req.body.designation_id,
    name: req.body.name,
    job_title: req.body.job_title,
    salary: req.body.salary,
    image: req.file.path,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
    date_employed: new Date().toString()
  }

  employeeObject.add(newEmployee)
  res.status(201).send({ message: "Employee successfully created", newEmployee: newEmployee})
})

/**
 * DELETE: Delete an existing Employee from the API
 * http://localhost:4000/api/employees/:employee_id
 */
app.delete('/api/employees/:employee_id', (req, res) => {
  const id = req.params.employee_id;
  const employees = employeeObject.get();
  const employeeToDelete = employees.find((el) => el.id === id);

  if (!employeeToDelete) {
    res.status(404).json({ message: 'Employee not found!' });
    return;
  }

  // Remove the designated employee from the array
  const updatedEmployees = employees.filter((el) => el.id !== id);

  // Save the updated data back to the file
  fs.writeFile(employeePATH, JSON.stringify(updatedEmployees), (err) => {
    if (err) {
      res.status(500).json({ message: 'Failed to delete the employee.' });
      return;
    }

    res.status(204).json({ message: 'Employee successfully deleted' });
  });
});

app.listen(4000, () => console.log("API is listening on http://localhost:4000"))