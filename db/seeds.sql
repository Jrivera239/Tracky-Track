INSERT INTO department (name_of_department)
VALUE

("Sales")
("Security")
("Logistics")
("Inventory")
("Legal")
("Accounting")
("Human Resources")
("Customer Service")

  INSERT INTO  roles (title, salaries, department_id)
  VALUE

 ("Sales Director",95000,1)
 ("Head of Security",80000,1)
 ("Supply Chain Chief Officer",120000,2)
 ("Lawyer",14000,2)
 ("Chief Finance Officer",170000,2)
 ("Human Resources Director",90000,2)
 ("Customer Service Manager",75000,3)
("Warehouse Manager",75000,3)

INSERT INTO Employee(first_name, last_name, manager_id, role_id)
VALUE

('Melissa','Castillo', '1','null'),
('Joel','Rivera', '2','null'),
('Demont','Rein', '3','1'),
('Edward','Gonzales', '4','2'),
('Ryan','Ogden', '5','1'),
('Olivia','Khan', '6','2'),
('Robert','Teyira', '7','3'),
('Carl','Andersen', '8','3'),

SELECT * FROM role;
SELECT * FROM department;
SELECT * FROM employee;