const fs = require('fs');
const packages = require('./packages.json');

let indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Package List</title>
</head>
<body>
<h1>Available Packages</h1>
<table>
<tr><th>Name</th><th>Description</th></tr>`;

for (const [key, value] of Object.entries(packages)) {
  indexContent += `<tr><td>${key}</td><td>${value.description}</td></tr>`;
}

indexContent += `</table>
</body>
</html>`;

fs.writeFileSync('index.html', indexContent);

for (const [key, value] of Object.entries(packages)) {
  let packageContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>${key}</title>
  </head>
  <body>
  <h1>${key}</h1>
  <p>${value.description}</p>
  <a href="${value.website}">Website</a> | <a href="${value.installer_url}">Installer Source</a>
  </body>
  </html>`;

  fs.writeFileSync(`${key}.html', packageContent);
}
