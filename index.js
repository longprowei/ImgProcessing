'use strict';

const sharp = require('sharp');
const fs = require("fs");
const imagesDir = "images";
const distDir = "dist";
const supportedExts = ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'gif', 'svg'];

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

let jsonContent = "";
try {
    let content = fs.readFileSync("image-config.json");
    jsonContent = JSON.parse(content);
    if (!jsonContent || !jsonContent.targets || jsonContent.targets.length === 0) {
        console.log('config file has issue, please check!');
        return;
    }
} catch(e) {
    console.log('config file does not exist or has issue, please check');
    return;
}

for (let i = 0; i < allImages.length; i++) {
    let fullName = allImages[i];
    let pos = fullName.lastIndexOf('.');
    if (pos <= 0 || pos === fullName.length - 1) {
        console.error(`<${fullName}> is not a correct file name!`);
        continue;
    }

    let name = fullName.substring(0, pos);
    let ext = fullName.substring(pos + 1);

    if (supportedExts.indexOf(ext.toLowerCase()) === -1) {
        console.error(`<${ext}> file is not supported!`);
        continue;
    }

    jsonContent.targets.forEach(target => {
        // use suffix to create subfolder
        let suffixFolder = distDir + `/${target.suffix}`;
        if (!fs.existsSync(suffixFolder)) {
            fs.mkdirSync(suffixFolder);
        }
        let imageName = `${suffixFolder}/${name}${target.noSuffixOnImage ? "" : "-" + target.suffix}.${ext}`
        sharp(`images/${fullName}`).resize(parseInt(target.width)).toFile(imageName, (error) => {
            if (error) {
                console.log('Errors:');
                console.log(error);
                return;
            }
        });
    });
}

console.log('==================Finished!========================');