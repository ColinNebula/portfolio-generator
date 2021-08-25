const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => { 
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      // Validate the properties to check if a valid value was provided by the user
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    },
  ])
}
  const promptProject = portfolioData => {
    
    console.log(`
  =================
  Add a New Project
  =================
  `);
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
}
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        // Validate the properties to check if a valid value was provided by the user
        validate: (value)=>{ if(value){return true} else {return 'we need a value here to continue please!'}},
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        // Validate the properties to check if a valid value was provided by the user
        validate: (value)=>{ if(value){return true} else {return 'we need a value here to continue please!'}},
        default: false
      }
    ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
// const profileDataArgs = process.argv.slice(2);
 const pageHTML = generatePage(portfolioData);
 fs.writeFile('./index.html', pageHTML, err => {
   if (err) throw new Error(err);
   console.log('Page created! Check out index.html to see the output!');
 });
});
