CREATE TABLE department (
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    VARCHAR (30)
);

CREATE TABLE roles(
    department_id INTEGER,
    title VARCHAR(30),
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    salary DECIMAL,
    FOREIGN KEY (department_id)
    REFERENCES  department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER.
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role_id,
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);