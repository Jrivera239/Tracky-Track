const connection = require('./db/connect');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const addLog = () => {
console.log (`\n`)
}

const start = () => {
    addLine();
    inquirer.prompt({
        name: 'Select',
        type: 'Roles, Department, Employees',
        message: 'Pick one of the following:',
        choices: ['Add Employee','Remove Employee','View All Employees','Update Employee Role', 'Add Role','Remove Role','View All Roles','Add Department','Remove Department','View All Department','End Program']
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

 const viewAll = () => {
   addLog();
   connection.query(
    `SELECT 

    deparment.department_name AS Department
    
    roles.salaries AS Salaries,
    
    roles.id AS Id,
    
    employees.first_name AS First_Name,
    
    employees.last_name AS Last_Name,
    
    roles.title AS Title,

    employees.id AS Id,

    department.department_name AS Department,

    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
    FROM employees 
    LEFT JOIN roles on employees.role_id = roles.id 

    LEFT JOIN department on roles.department_id = department.id 

    LEFT JOIN employees manager on manager.id = employees.manager_id 
    
    ORDER BY department_name ASC;`, 
    (err, res) => {
        if (err) throw err;
        console.table(res)
    })}

    
const addEmployee = () => {
    addLog();
    connection.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: `Enter employee first name:`
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter employee last name:'
            },
            {
                name: 'role',
                type: 'input',
                message() {
                    const EmployeeArray = [];
                    res.forEach(({ title, id }) => {
                        EmployeeArray.push(id + ' = ' + title);
                    });
                    console.log('What is the employee Id number?\n')
                    return EmployeeArray.join(`\n`)
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Please enter the employee's role id number.";
                    }
                    return true;
                },
            },
























