# Module-11-Profile-Generator
A command-line application that generates a HTML file from user input using the Inquirer npm package. The application prompts the user for information about a software engineering team, such as the team manager's name and email, and information about team members, including engineers and interns.

Functionality
The program is comprised of two main functions, generateHTML() and buildTeam(). generateHTML() returns a string of HTML code that displays the team members and their details, filtered by their role (Manager, Engineer or Intern). The buildTeam() function collects information from the user via a series of prompts using the inquirer npm package and populates the team array with objects representing each team member.

Requirements:
Node.js
npm packages: Inquirer, FS

Usage:
1. Clone the repository to your local machine
2. Run npm install in the terminal to install the required dependencies
3. Run node index.js in the terminal to start the program
4. Answer the prompts to build your team
5. The generated HTML file can be found in the output directory as team.html.
