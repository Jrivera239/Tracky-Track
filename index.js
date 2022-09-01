const connection = require('./db/connect');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const start = () => {
    addLine();
    inquirer.prompt({
        name: 'Select',
        type: 'Roles, Departments, Employees',
        message: 'Pick one of the following:',
        choices: ['Add Employee','Remove Employee','View All Employees','Update Employee Role', 'Add Role','Remove Role','View All Roles','Add Department','Remove Department','View All Departments','End Program']
        })
        .then (function (res) {
            switch(answer.action) {
                case 'Add Employee':
                    addEmployee()
                    break;
                case 'Remove Employee':
                    RemoveEmployee()
                    break;
                case 'View All Employees':
                ViewAllEmployees()
                    break;
                case 'Update Employee Role':
                    UpdateEmployeeRole()
                    break;
                case 'Add Role':
                    AddRole()
                    break;
                case 'Remove Role':
                    RemoveRole()
                    break;
                case 'View All Roles':
                    ViewAllRoles()
                    break;
                case 'Add Department':
                    AddDepartment()
                    break;
                case 'View All Department':
                    ViewAllDepartment()
                    break;
                case 'Remove Department':
                    RemoveDepartment()
                    break;
                case 'End Program':
                    EndProgram()
                    break;


            }
        })
    }

