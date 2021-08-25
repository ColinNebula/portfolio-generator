
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


// refactor the current fs functionality to use Promises instead of callback functions
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

const [name, github] = profileDataArgs;

const generatePage = (name, github) => {
  return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;
};

fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});

// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     console.log(portfolioData);
// // const profileDataArgs = process.argv.slice(2);
//  const pageHTML = generatePage(portfolioData);
//  fs.writeFile('./dist/index.html', pageHTML, err => {
//    if (err) {
//     console.log(err);
//     return;
//    }
//    console.log('Page created! Check out index.html in this directory to see it!');
//    console.log('Page created! Check out index.html to see the output!');

//    fs.copyFile('./src/style.css', './dist/style.css', err => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('Style sheet copied successfully!');
//   });
// });
//  });
