-- Active: 1723505728050@@127.0.0.1@5432@courses_db
DROP DATABASE IF EXISTS jobs_db;
CREATE DATABASE jobs_db;

\c jobs_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) UNIQUE NOT NULL,
  last_name VARCHAR(30) UNIQUE NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  manager_id INTEGER
);

 

