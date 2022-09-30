const inquirer = require("inquirer");
const db = require("../db/connection");
require("console.table");

class Organization {
  constructor() {}

  //launch app //

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
                if (userChoice === "Add Employee") this.addEmployee();
        if (userChoice === "View All Employees") this.viewAllEmployees();
        if (userChoice === "Add Role") this.addRoles();
        if (userChoice === "View All Roles") this.viewRoles();
        if (userChoice === "Add Department") this.addDepartment();
        if (userChoice === "View all Departments") this.viewDepartment();
        if (userChoice === "Exit") {
          console.log("lata");
          return;
        }
      });
  }

  //displays all employees //

  viewAllEmployees() {
    const query = `SELECT * FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department ON department.id = roles.department_id;`;

    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    });
  }
  addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first",
          message: "Name of Employee?",
        },
        {
          type: "input",
          name: "last",
          message: "Employee's last name?",
        },
        {
          type: "number",
          name: "roles_id",
          message: "What is the id role?",
        },
      ])
      .then(({ first, last, roles_id }) => {
        const query = `INSERT INTO employee (first_name, last_name, roles_id) VALUES (?,?,?);`;
        const params = [first, last, roles_id];

        db.query(query, params, (err, res) => {
          if (err) throw err;
          this.viewAllEmployees();
          this.init();
        });
      });
  }

  viewRoles() {
    const query = `SELECT * FROM roles`;

    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    });
  }

  addRoles() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary?",
        },
        {
          type: "number",
          name: "department",
          message: "What is the id  the department?",
        },
      ])
      .then(({ title, salary, department }) => {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);`;
        const params = [title, salary, department];

        db.query(query, params, (err, res) => {
          if (err) throw err;
          this.viewRoles();
          this.init();
        });
      });
  }

  viewDepartment() {
    const query = `SELECT * FROM department;`;

    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    });
  }

  addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the department?",
        },
      ])
      .then(({ title }) => {
        const query = `INSERT INTO department (title) VALUES (?)`;
        const params = [title];

        db.query(query, params, (err, res) => {
          if (err) throw err;
          this.viewDepartment();
          this.init();
        });
      });
  }

  removeDepartment = () => {
    connection.query(`SELECT * FROM departments;`,
    (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `departments`,
                type: `rawlist`,
                message: `Which department would you like to remove? \n`,
                choices() {
                    const departmentArray = [];
                    res.forEach(({ department_name }) => {
                        departmentArray.push(department_name);
                    });
                    return departmentArray;
                },
            },
        ])
            .then((answer) => {
                connection.query(`DELETE FROM departments WHERE ?`,
                {
                    department_name: (answer.departments)
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} Deleted \n`)
                    viewAllDepartments();
                }
                )
            })
    }
    )
};

  getEmployees() {}
}

module.exports = Organization;
