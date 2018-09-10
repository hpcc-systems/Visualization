# iife + npm
This example uses "npm" to manage the versioning and downloading of the visualization libraries to the local folder.

To use you will need:
1. Install npm - the easiest way to do this is to install the latest LTS version of Node JS from: https://nodejs.org/en/download
2. Create a package.json file:
```
npm init
```
3. Install dependencies:
```
npm install -s @hpcc-js/chart @hpcc-js/layout @hpcc-js/phosphor
```

At which point the downloaded libraries can now be referenced directly from within the html file.
