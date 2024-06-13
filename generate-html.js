const fs = require('fs');
const packages = require('./packages.json');

const generateIndexContent = (packages) => {
    let packageRows = Object.entries(packages).map(([key, value]) => {
        return `<tr><td><a href="/${key}.html">${key}</a></td><td>${value.description}</td></tr>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="One-Click Script Installation Assembly.">
    <title>EasyInstall - easyinstall.net</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/1.0.1/css/bulma.min.css">
</head>
<body>
    <div class="hero is-fullheight">
        <div class="hero-head">
            <header>
                <nav class="navbar has-shadow">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="/">
                                <span class="title">📦 EasyInstall</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">
                        <div class="content">
                            <h1>Usage</h1>
                            <p>To install a specific package using <code>EasyInstall</code>, use the following <code>curl</code> command:</p>
                            <pre>sh <(curl -s https://ezi.sh/[package_name])</pre>
                            <p>Replace <code>[package_name]</code> with the name of the desired package. For example, to install <code>homebrew</code>, you would use:</p>
                            <pre>sh <(curl -s https://ezi.sh/homebrew)</pre>
                            <h1>Available Packages List</h1>
                            <table class="table is-bordered">
                                <thead>
                                    <tr><th>Package Name</th><th>Description</th></tr>
                                </thead>
                                <tbody>
                                    ${packageRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-foot">
            <div class="footer has-text-centered">
                <p>For more details, visit our <a href="https://github.com/woolflare/EasyInstall">GitHub repository</a>.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

const generatePackageContent = (key, value) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="One-Click Script Installation Assembly.">
    <title>${key} - EasyInstall</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/1.0.1/css/bulma.min.css">
</head>
<body>
    <div class="hero is-fullheight">
        <div class="hero-head">
            <header>
                <nav class="navbar has-shadow">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="/">
                                <span class="title">📦 EasyInstall</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">
                        <div class="content">
                            <h1>${key}</h1>
                            <p>${value.description}</p>
                            <p><a href="${value.website}" target="_blank" rel="noopener noreferrer">Website</a> | <a href="${value.installer_source}" target="_blank" rel="noopener noreferrer">Installer Source</a></p>
                            <h1>Install ${key}</h1>
                            <p>Paste this into Terminal.app or a shell prompt, and press enter.</p>
                            <pre>sh <(curl -s https://ezi.sh/${key})</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-foot">
            <div class="footer has-text-centered">
                <p>For more details, visit our <a href="https://github.com/woolflare/EasyInstall">GitHub repository</a>.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

const indexContent = generateIndexContent(packages);
fs.writeFileSync('index.html', indexContent);

Object.entries(packages).forEach(([key, value]) => {
    const packageContent = generatePackageContent(key, value);
    fs.writeFileSync(`${key}.html`, packageContent);
});
