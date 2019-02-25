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
    for (let target of jsonContent.targets) {
        // use suffix to create subfolder
        let suffixFolder = distDir + `/${target.suffix}`;
        if (!fs.existsSync(suffixFolder)) {
            fs.mkdirSync(suffixFolder);
        }
        let imageName = `${suffixFolder}/${name}${target.noSuffixOnImage ? "" : "-" + target.suffix}.${ext}`
        sharp(`images/${i}`).resize(parseInt(target.width)).toFile(imageName, (error) => {
            if (error) {
                console.log('Errors:');
                console.log(error);
                return;
            }
        });
    }
}

console.log('==================Finished!========================');