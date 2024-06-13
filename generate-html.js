const fs = require('fs');
const packages = require('./packages.json');

let indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Automatic installation script collection.">
    <title>EasyInstall - easyinstall.net</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">EasyInstall</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#usage">Usage</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#packages">Packages</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <h1 id="usage">Usage</h1>
        <p>To install a specific package using <code>EasyInstall</code>, use the following <code>curl</code> command:</p>
        <p><code>curl -s https://ezi.sh/[package_name] | sh</code></p>
        <p>Replace <code>[package_name]</code> with the name of the desired package. For example, to install <code>homebrew</code>, you would use:</p>
        <p><code>curl -s https://ezi.sh/homebrew | sh</code></p>
        <h1 id="packages">Available Packages List</h1>
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr><th>Package Name</th><th>Description</th></tr>
            </thead>
            <tbody>`;
Object.entries(packages).forEach(([key, value]) => {
    indexContent += `<tr><td><a href="/${key}.html">${key}</a></td><td>${value.description}</td></tr>`;
});
indexContent += `            </tbody>
        </table>
        <p>For more details, visit our <a href="https://github.com/woolflare/EasyInstall">GitHub repository</a>.</p>
    </div>
</body>
</html>`;

fs.writeFileSync('index.html', indexContent);

Object.entries(packages).forEach(([key, value]) => {
    let packageContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Automatic installation script collection.">
    <title>EasyInstall - ${key}</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">EasyInstall</a>
        </div>
    </nav>

    <div class="container">
        <h1 id="usage">${key}</h1>
        <p>${value.description}</p>
        <p><a href="${value.website}" target="_blank" rel="noopener noreferrer">Website</a> | <a href="${value.installer_source}" target="_blank" rel="noopener noreferrer">Installer Source</a></p>
        <h1>Install ${key}</h1>
        <p>Paste this into Terminal.app or a shell prompt, and press enter.</p>
        <p><code>curl -s https://ezi.sh/${key} | sh</code><p>
        <p>For more details, visit our <a href="https://github.com/woolflare/EasyInstall">GitHub repository</a>.</p>
    </div>
</body>
</html>`;

    fs.writeFileSync(`${key}.html`, packageContent);
});
