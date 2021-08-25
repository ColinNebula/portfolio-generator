<<<<<<< HEAD
module.exports = (name, github) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
=======
const generatePage = require('./src/page-template.js');
const generatePage = (name, github) => {
  return `
  <!DOCTYPE html> 
  <html lang="en"> 
>>>>>>> generate-webpage
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>
<<<<<<< HEAD
  
=======

>>>>>>> generate-webpage
  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;
};
<<<<<<< HEAD
=======
module.exports = generatePage;
>>>>>>> generate-webpage
