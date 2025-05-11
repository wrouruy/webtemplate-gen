#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const extensions = [
    [
        '.html',
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<body>
     
</body>
</html>`
    ],
    [
        '.css',
        `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}`
    ]
];

// add to .html file connection to styles and scripts
let htmlContent = extensions[0][1].split('\n');
for (let i = 0; i < args.length; i++) {
    if (args[i].endsWith('.css')) {
        htmlContent[6] += `<link rel="stylesheet" href="${args[i]}">`;
    }
    if (args[i].endsWith('.js')) {
        htmlContent[9] += `\n<script src="./${args[i]}"></script>`;
    }
}
extensions[0][1] = htmlContent.join('\n');

// create files
for (let i = 0; i < args.length; i++) {
    let content = '';
    
    for (let j = 0; j < extensions.length; j++) {
        if (args[i].endsWith(extensions[j][0])) {
            content = extensions[j][1];
            break;
        }
    }

    const filePath = path.join(process.cwd(), args[i]);

    fs.writeFile(filePath, content, err => {
        if (err) console.log(err);
    });
}
