-- Active: 1723505728050@@127.0.0.1@5432@jobs_db
INSERT INTO department (department_name)
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
VALUES  ('Mark','Smith', 3, 2),
        ('Marie','Sanderson', 2, NULL),
        ('Ellen','Cooper', 1, NULL),
        ('Matthew','Martin', 4, NULL),
        ('Samantha','Collins', 5, NULL),
        ('Micah','Kline', 6, NULL)