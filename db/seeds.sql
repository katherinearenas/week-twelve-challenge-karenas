INSERT INTO department (name)
VALUES ('IT'),
       ('Legal'),
       ('Marketing'),
       ('Accounting'),
       ('Product Development');

INSERT INTO roles (title, salary, department_id)
VALUES ('IT Specialist', 70000, 1),
       ('Legal Team Lead', 250000, 2),
       ('Lawyer', 150000, 2),
       ('Marketing Analyst', 75000, 3),
       ('Accountant', 140000, 4),
       ('Developer', 90000, 5)
       

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES  ('Mark','Smith', 3),
        ('Marie','Sanderson', 2),
        ('Ellen','Cooper', 1),
        ('Matthew','Martin', 4),
        ('Samantha','Collins', 5),
        ('Micah','Kline', 6),