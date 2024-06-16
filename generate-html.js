const fs = require('fs');
const packages = require('./easyinstall.json');
const currentYear = new Date().getFullYear();

const generateIndexContent = (packages) => {
    let packageRows = Object.entries(packages).map(([key, value]) => {
        return `<tr><td><a href="/${key}">${key}</a></td><td>${value.description}</td></tr>`;
    }).join('');
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="One-Click Script Installation Assembly.">
    <title>EasyInstall - easyinstall.net</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
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
                                <img src="/logo.png" alt="logo">
                                <span class="title has-text-weight-light">EasyInstall</span>
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
                            <h1 class="has-text-weight-light">Usage</h1>
                            <p>To install a specific package using <code>EasyInstall</code>, use the following <code>curl</code> command:</p>
                            <pre>curl -fsSL https://ezi.sh/[package_name] | sh</pre>
                            <p>Replace <code>[package_name]</code> with the name of the desired package. For example, to install <code>homebrew</code>, you would use:</p>
                            <pre>curl -fsSL https://ezi.sh/homebrew | sh</pre>
                            <h1 class="has-text-weight-light">Available Packages List</h1>
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
                <p class="block">For more details, visit our <a href="https://github.com/woolflare/EasyInstall">GitHub repository</a>.</p>
                <p>&copy; ${currentYear} easyinstall.net</p>
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
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/1.0.1/css/bulma.min.css">
    <style>
        .copy-button {
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
        }
        .pre-container {
            position: relative;
        }
    </style>
</head>
<body>
    <div class="hero is-fullheight">
        <div class="hero-head">
            <header>
                <nav class="navbar has-shadow">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="/">
                                <img src="/logo.png" alt="logo">
                                <span class="title has-text-weight-light">EasyInstall</span>
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
                            <h1 class="has-text-weight-light">${key}</h1>
                            <p>${value.description}</p>
                            <p><a href="${value.website}" target="_blank" rel="noopener noreferrer">Website</a> | <a href="${value.installer_source}" target="_blank" rel="noopener noreferrer">Installer Source</a></p>
                            <h1 class="has-text-weight-light">Install ${key}</h1>
                            <p>Paste this into Terminal.app or a shell prompt, and press enter.</p>
                            <div class="pre-container">
                            <pre id="command">curl -fsSL https://ezi.sh/${key} | sh</pre>
                            <button class="button is-small copy-button" id="copyButton" onclick="copyCommand()">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-foot">
            <div class="footer has-text-centered">
                <p class="block">For more details, visit our <a href="https://github.com/woolflare/EasyInstall">GitHub repository</a>.</p>
                <p>&copy; ${currentYear} easyinstall.net</p>
            </div>
        </div>
    </div>
    <script>
        function copyCommand() {
            const commandText = document.getElementById('command').textContent;
            navigator.clipboard.writeText(commandText).then(() => {
                const copyButton = document.getElementById('copyButton');
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 1000);
            });
        }
    </script>
</body>
</html>`;
};

const indexContent = generateIndexContent(packages);
fs.writeFileSync('index.html', indexContent);

Object.entries(packages).forEach(([key, value]) => {
    const packageContent = generatePackageContent(key, value);
    fs.writeFileSync(`${key}.html`, packageContent);
});
