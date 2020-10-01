// Set up employee class
class Employee {

    // Set up a constructor to define the the values the employee will have   
    constructor(name, id, email) {

        this.name = name
        this.id = id
        this.email = email
    }

    getName() {

        console.log(name)
        return this.name

    }


    getId() {

        return this.id

    }

    getEmail() {

        return this.email

    }

    getRole() {

        return "Employee"

    }
}

module.exports = Employee

