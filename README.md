# Image Processing
This program is for processing the images in many different sizes.

# How to use it
Make sure you have installed node in your operating system.
Run `npm install`.
Put your images folder into the project folder and change its name to images.
Run `node index.js`,  allconverted images will be in the dist folder

# Configuration File
The config file is image-config.json, the content is following:
```
{
    "targets": [{
        "suffix": "lg",
        "width": "200"
    }, {
        "suffix": "md",
        "width": "150"
    }, {
        "suffix": "sm",
        "width": "100"
    }]
}
```
As above, you could add as many as objects in `targets` array, for each object, you can give it the `suffix` and the width. The ratio will be the same.