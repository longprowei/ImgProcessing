const sharp = require('sharp');
const fs = require("fs");

const imagesDir = "images";
const distDir = "dist";

// create target directory
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

let allImages = [];

fs.readdirSync(imagesDir).forEach(file => {
    let filename = `${imagesDir}/${file}`;
    if (fs.statSync(filename).isFile()) {
        allImages.push(file);
    }
});

let content = fs.readFileSync("image-config.json");
let jsonContent = JSON.parse(content);

for (let i of allImages) {
    let pos = i.lastIndexOf('.');
    let name = i.substr(0, pos);
    let ext = i.substr(pos + 1);
    for (let j of jsonContent.targets) {
        sharp(`images/${i}`).resize(parseInt(j.width)).toFile(`dist/${j.prefix}-${name}.${ext}`, (error) => {
            if (error) {
                console.log('Errors:');
                console.log(error);
                return;
            }
        });
    }
}

console.log('==================Finished!========================');