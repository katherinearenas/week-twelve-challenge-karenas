const inquirer = require('inquirer')
const pool = require('./db/connections');

pool.connect();

init();

function init() {
   inquirer.prompt([
      {
         type: 'list',
         name: 'choice',
         message: 'What would you like to do?',
         choices: ['View All Departments', 'View All Roles','View All Employees','Add Department', 'Add Role','Add Employee', 'Update Employee', 'Quit']
      }
   ]).then(({ choice }) => {
      if (choice === 'View All Departments'){
         viewAllDepartments();
      } else if (choice === 'View All Roles') {
         viewAllRoles();
      } else if (choice === 'View All Employees') {
         viewAllEmployees();
      }  else if (choice === 'Add Department') {
         addDepartment();
      } else if (choice === 'Add Role') {
         addRole();
      } else if (choice === 'Add Employee') {
         addEmployee();
      } else if (choice === 'Update Employee') {
         updateEmployee();
      } else if (choice === 'Quit')
         return console.log(`You've quit your session.`)
   })
}

function viewAllDepartments() {
   pool.query(`SELECT * FROM departments;`, (err, { rows }) => {
     console.table(rows);
     init();
  })
}

function viewAllEmployees() {
    pool.query(`SELECT * FROM employees;`, (err, { rows }) => {
      console.table(rows);
      init();
   })
}

function viewAllRoles() {
   pool.query(`SELECT * FROM roles;`, (err, { rows }) => {
     console.table(rows);
     init();
  })
}

function addRole() {
   pool.query(`SELECT d.id, d.department_name FROM departments as d;`, (err, { rows }) => {
      console.log(rows);
      const departments = rows.map(departments => {
         return { value: departments.id, name: departments.department_name}; // { value: 1, name: 'IT'}
      })
      inquirer.prompt([
         {
            type: 'input',
            name: 'title',
            message: 'What is the title of this role?'
         },
         {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
         },
         {
            type: 'list',
            name: 'department_id',
            message: 'Which department does this role belong to?',
            choices: departments
         }
      ]).then(({ title, salary, department_id }) => {
         console.log({ title, salary, department_id });
         pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`, [title, parseInt(salary), department_id], (err, result) => {
            console.log('Role Added!');
            init();
         });
      });
   })
}


function addEmployee() {
   pool.query(`SELECT r.id, r.title, r.salary FROM roles as r;`, (err, { rows }) => { console.log(rows);
      const role = rows.map(roles => {
         return { value: roles.id, name: roles.title, salary: roles.salary};
      });
   pool.query(`SELECT e.id, e.first_name, e.last_name, e.role_id FROM employees AS e;`, (err, { rows }) => { console.log(rows);
      const employees = rows.map(employees => {
         return { value: employees.id, name: `${employees.first_name} ${employees.last_name}`}}
      );
      inquirer.prompt([
         {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of this employee?'
         },
         {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of this employee?'
         },
         {
            type: 'list',
            name: 'role_id',
            message: 'Which role does this employee have?',
            choices: role
         },
         {
            type: 'list',
            name: 'manager_id',
            message: `Who is this employee's manager?`,
            choices: employees
         }
      ]).then(({ first_name, last_name, role_id, manager_id }) => {
         console.log({ first_name, last_name, role_id, manager_id });
         pool.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [first_name, last_name, role_id, manager_id], (err, result) => {
            console.log('Employee Added!');
            init();
         });
      });
   })
   })
}

 function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Enter the name of the new department'
      }
      ]).then(({department_name}) => {console.log(department_name)
      pool.query(`INSERT INTO departments(department_name) VALUES($1)`,[department_name], (err, result) =>  {(console.log(`Department added!`));
      init();
      });
      })
   }
function updateEmployee(){
   pool.query(`SELECT r.id, r.title, r.salary FROM roles as r;`, (err, { rows }) => { console.log(rows);
      const role = rows.map(roles => {
         return { value: roles.id, name: roles.title, salary: roles.salary};
      });
   pool.query(`SELECT e.id, e.first_name, e.last_name, e.role_id FROM employees AS e;`, (err, { rows }) => { console.log(rows);
      const employees = rows.map(employees => {
         return { value: employees.id, name: `${employees.first_name} ${employees.last_name}`}}
      );
      inquirer.prompt([
         {
            type: 'list',
            name: 'employee_id',
            message: `Which employee would you like to update?`,
            choices: employees
         },
         {
            type: 'list',
            name: 'role_id',
            message: `What is this employee's new role?`,
            choices: role
         }
      ]).then(({ employee_id, role_id }) => {
         console.log({ employee_id, role_id});
         pool.query(`UPDATE employees SET employees.role_id WHERE id = ${employee_id} ;`, [employee_id, role_id], 
            (err, result) => {
            console.log('Employee Updated!');
            init();
         });
      });
   })
   })
}