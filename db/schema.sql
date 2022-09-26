DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    title VARCHAR (30) unique NOT NULL
);

CREATE TABLE roles(
    
    title VARCHAR(30) unique NOT NULL,
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    salary DECIMAL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY(department_id)
    REFERENCES  department(id)
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER NOT NULL,
    manager_id INTEGER NULL,
    CONSTRAINT fk_roles FOREIGN KEY(roles_id) REFERENCES roles(id) 
);

