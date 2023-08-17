const designationPATH = "./designation.json"
const { raw } = require('express')
const fs = require('fs')

class Designation {

    get() {
        return this.readData()
    }

    getIndividualDesignation(designationId) {
        const designations = this.readData()
        const designation = designations.find((d) => d.id === designationId)
        console.log(designation);
        return designation
    }

    add(newDesignation) {
        const currentDesignations = this.readData()
        currentDesignations.unshift(newDesignation)
        this.storeData(currentDesignations)
    }

    readData() {
        let rawData = fs.readFileSync(designationPATH)
        let designations = JSON.parse(rawData)
        return designations
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData)
        fs.writeFileSync(designationPATH, data)
    }

    static getPATH() {
        return designationPATH
    }
}

module.exports = { Designation, designationPATH }