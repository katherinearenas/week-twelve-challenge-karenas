const inquirer = require('inquirer')
const data = require('./db/db.json')


async function addDepartment() {
   let newDept = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department'
   });
   await data.query('Adding department', newDept.name)
   console.log(`Department ${newDept.name} added!`)
}


console.log('this is a test')
// addDepartment();

// async function addRole() {
//     let newRole = await inquirer.prompt(
//     {
//         type: 'input',
//         name: 'title',
//         message: 'What role are you adding?'
//     },
//     {
//         type:'input',
//         name:'salary',
//         message: 'What is the salary?'
//     },
//     {
//         type: 'list',
//         choice:
//     }
// )
// }