const connection = require('./db/connect');
const inquirer = require('inquirer');
const mysql = require("mysql2");
const consoleTable = require('console.table');
console.log("Welcome to Employee Tracker, please select as you go.");


function startPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select one the the following.",
            name: "choice",
            choices: [
                "View all employees",
                "Add employee",
                "View all roles",
                "Add role",
                "View all departments",
                "Add department"
            ]
        }
    ]).then(function(val){
        switch (val.choice){
            case "View all employees":
              viewAllEmployees();
            break;
    
          case "View all roles":
              viewAllRoles();
            break;
          case "View all departments":
              viewAllDepartments();
            break;
          
          case "Add employee":
                addEmployee();
              break;

          case "Update employee":
                updateEmployee();
              break;
      
            case "Add role":
                addRole();
              break;
      
            case "Add department":
                addDepartment();
              break;
            }
    })}

//View all employees

function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}