function generateHTML() {
  let html = `<!DOCTYPE html>
<html>
<head>
  <title>Team Profile</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Team Profile</h1>
    <div class="card">
      <h2>Manager</h2>
      <ul>
        <li>Name: ${team[0].name}</li>
        <li>ID: ${team[0].id}</li>
        <li>Email: <a href="mailto:${team[0].email}">${team[0].email}</a></li>
        <li>Office number: ${team[0].officeNumber}</li>
      </ul>
    </div>
    <div class="card">
      <h2>Engineers</h2>
      <ul>
        ${team.filter(member => member.role === 'Engineer').map(member => `
          <li>Name: ${member.name}</li>
          <li>ID: ${member.id}</li>
          <li>Email: <a href="mailto:${member.email}">${member.email}</a></li>
          <li>GitHub: <a href='https://github.com/${member.github}' target='_blank'>${member.github}</a></li>
        `).join('')}
      </ul>
    </div>
    <div class="card">
      <h2>Interns</h2>
      <ul>
        ${team.filter(member => member.role === 'Intern').map(member => `
          <li>Name: ${member.name}</li>
          <li>ID: ${member.id}</li>
          <li>Email: <a href="mailto:${member.email}">${member.email}</a></li>
          <li>School: ${member.school}</li>
        `).join('')}
      </ul>
    </div>
  </div>
</body>
</html>`;

  return html;
}

const inquirer = require('inquirer');
const fs = require('fs');

let team = [];

const managerPrompt = [
  {
    type: 'input',
    name: 'name',
    message: "Enter the team manager's name:"
  },
  {
    type: 'input',
    name: 'id',
    message: "Enter the team manager's employee ID:"
  },
  {
    type: 'input',
    name: 'email',
    message: "Enter the team manager's email address:"
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "Enter the team manager's office number:"
  }
];

const engineerPrompt = [
  {
    type: 'input',
    name: 'name',
    message: "Enter the engineer's name:"
  },
  {
    type: 'input',
    name: 'id',
    message: "Enter the engineer's employee ID:"
  },
  {
    type: 'input',
    name: 'email',
    message: "Enter the engineer's email address:"
  },
  {
    type: 'input',
    name: 'github',
    message: "Enter the engineer's GitHub username:"
  }
];

const internPrompt = [
  {
    type: 'input',
    name: 'name',
    message: "Enter the intern's name:"
  },
  {
    type: 'input',
    name: 'id',
    message: "Enter the intern's employee ID:"
  },
  {
    type: 'input',
    name: 'email',
    message: "Enter the intern's email address:"
  },
  {
    type: 'input',
    name: 'school',
    message: "Enter the intern's school:"
  }
];

const teamPrompt = [
  {
    type: 'list',
    name: 'memberType',
    message: "What type of team member would you like to add?",
    choices: ['Engineer', 'Intern', 'Finish building team']
  }
];

inquirer

inquirer.prompt(managerPrompt).then(managerData => {
    team.push({...managerData, role: 'Manager'});
  
    const buildTeam = function() {
      inquirer.prompt(teamPrompt).then(memberType => {
        if (memberType.memberType === 'Engineer') {
          inquirer.prompt(engineerPrompt).then(engineerData => {
            team.push({...engineerData, role: 'Engineer'});
            buildTeam();
          });
        } else if (memberType.memberType === 'Intern') {
          inquirer.prompt(internPrompt).then(internData => {
            team.push({...internData, role: 'Intern'});
            buildTeam();
          });
        } else {
          const html = generateHTML();
          console.log(html);
          fs.writeFile('team.html', html, err => {
            if (err) throw err;
            console.log('Team profile generated successfully!');
          });
        }
      });
    };
    buildTeam();
  });
  