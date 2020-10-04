const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

let teamMembers = []
// Write code to use inquirer to gather information about the development team members,
async function promptUser() {
    
        const choice = await inquirer.prompt([

            {
                type: "list",
                message: "What type of employee would you like to add?",
                name: "employeeRole",
                choices: [
                    { name: "Manager", value: "Manager" },
                    { name: "Intern", value: "Intern" },
                    { name: "Engineer", value: "Engineer" }
                ]
            },
        ])

        if (choice.employeeRole === "Manager") {

            await promptManager()

        }

        else if (choice.employeeRole === "Engineer") {

            await promptEngineer()

        }

        else {

            await promptIntern()

        }

    }



async function promptEngineer() {


}


async function promptManager() {

    let manager = await inquirer.prompt([

        {
            type: "input",
            message: "What is your manager's name?",
            name: "managerName",
            default: "Bill Bob Sr."
        },

        {
            type: "input",
            message: "What is your manager's ID?",
            name: "managerId",
            default: "1234-4321"
        },

        {
            type: "input",
            message: "What is your manager's email address?",
            name: "managerEmail",
            default: "Bill.Bob.Sr@billbob.net"
        },

        {
            type: "input",
            message: "What is your manager's office number?",
            name: "managerOffice",
            default: "Big office on the corner"
        },

    ]);
    const NewManager = new Manager(

        manager.managerName,
        manager.managerId,
        manager.managerEmail,
        manager.managerOffice

    )

    teamMembers.push(NewManager)
    


}


async function promptIntern() {



}

promptUser()

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
