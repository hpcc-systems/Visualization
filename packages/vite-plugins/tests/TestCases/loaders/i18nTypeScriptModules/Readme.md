# What is the test about?
typescript generates with the settings AMD/es2015 module defines having two
parameters, require and exports. The exports weill be filled with the exported
data.

This needs to be addressed by dojo-webpack-plugin.

# How to generate out of the *.ts typescript files?
Install Typescript (>3) and call tsc here.

# EsLintIgnore
The generated files nls/* are ignored for eslint, because otherwise 
no-unused-vars will error.
