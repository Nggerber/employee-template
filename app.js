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

    let engineer = await inquirer.prompt([

        {
            type: "input",
            message: "What is your engineer's name?",
            name: "engineerName",
            default: "Space Man"
        },

        {
            type: "input",
            message: "What is your engineer's ID?",
            name: "engineerId",
            default: "0101011010101101"
        },

        {
            type: "input",
            message: "What is your engineer's email address?",
            name: "engineerEmail",
            default: "space.com"
        },

        {
            type: "input",
            message: "What is your engineer's Github?",
            name: "engineerGithub",
            default: "Spacemanhub"
        },

    ]);
    const NewEngineer = new Engineer(

        engineer.engineerName,
        engineer.engineerId,
        engineer.engineerEmail,
        engineer.engineerGithub

    )

    teamMembers.push(NewEngineer)

    await promptNewEmp()

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
    const NewManager = new Manager (

        manager.managerName,
        manager.managerId,
        manager.managerEmail,
        manager.managerOffice

    )

    teamMembers.push(NewManager)

    await promptNewEmp()
}


async function promptIntern() {

    let intern = await inquirer.prompt([

        {
            type: "input",
            message: "What is your intern's name?",
            name: "internName",
            default: "Jimbo"
        },

        {
            type: "input",
            message: "What is your intern's ID?",
            name: "internId",
            default: "1111111"
        },

        {
            type: "input",
            message: "What is your intern's email address?",
            name: "internEmail",
            default: "jimbo@jimbo.net"
        },

        {
            type: "input",
            message: "What School did your intern go to?",
            name: "internSchool",
            default: "Cool School"
        },

    ]);
    const NewIntern = new Intern(

        intern.internName,
        intern.internId,
        intern.internEmail,
        intern.internSchool

    )

    teamMembers.push(NewIntern)

    await promptNewEmp()


}

async function promptNewEmp() {

    let addEmployee = await inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add more employee's to your team?",
            name: "addMore"

        }
    ])
console.log(addEmployee)
    if (addEmployee.addMore === true) {

        await promptUser()
        
    }
    else {

        const html = await render(teamMembers);
        await writeFileAsync(outputPath, html);

    }

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
