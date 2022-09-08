const connection = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require("mysql2");
const consoleTable = require('console.table');
console.log("Welcome to Employee Tracker, please select as you go.");

//Prompt begins//
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
              case 'End Program':
                endProgram()
                break;
            }
    })
}

//View all employees//

function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

  //View all employees by department//

  function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  }

//View all roles//

function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  }

  //Title for employee prompt//

  var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}

//Updating employees//

function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
     inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "Employee last name",
          },
          {
            name: "role",
            type: "rawlist",
            message: "Employee new title",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE?", 
        {
         role_id: roleId
        }, 
        {
           last_name: val.lastName
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            startPrompt()
        })
    });
  });
  }
  
var managersArr = [];
// Function manager//
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }})
  return managersArr;
}

// Adding employee //

function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter the first name"
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter the last name"
        },
        {
          name: "role",
          type: "list",
          message: "What's the role?",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Who is the manager?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
        {
        first_name: val.firstName, last_name: val.lastName, manager_id: managerId, role_id: roleId

      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })
  })}

    //adding department//
    function addDepartment() { 
        inquirer.prompt([
            {
              name: "name",
              type: "input",
              message: "Add department if needed."
            }
        ]).then(function(res) {
            var query = connection.query(
                "INSERT INTO department SET ? ",
                {
                  name: res.name
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
          )
        }
    )
}
 //adding role for employee//

 function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",
    function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "ROLE title"
          },
          {
            name: "Salary",
            type: "input",
            message: "ROLE SALARY?"
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
      });
    });
}