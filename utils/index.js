const inquirer = require("inquirer");
const db = require("../db/connection");
require("console.table");

class Organization {
  constructor() {}
  //initiates program
  async init() {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "userChoice",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "Add Employee",
            "View All Roles",
            "Add Role",
            "View all Departments",
            "Add Department",
            "Exit",
          ],
        },
      ])
      .then(({ userChoice }) => {
        if (userChoice === "View All Employees") this.viewAllEmployees();
        if (userChoice === "Add Employee") this.addEmployee();
        if (userChoice === "View All Roles") this.viewRoles();
        if (userChoice === "Add Role") this.addRoles();
        if (userChoice === "View all Departments") this.viewDepartment();
        if (userChoice === "Add Department") this.addDepartment();
        if (userChoice === "Exit") {
          console.log("Bye");
          return;
        }
      });
  }