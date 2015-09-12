This page is aimed at developers who wish to build the framework from sources i.e build their own widgets etc. into the framework. To begin this discussion, the most appropriate place to begin is the file system. 

## File Structure

The structure is organised in the following manner

 ``` apps demos src extra_files ```

and changing into
 
     cd src 

will bring us into all of the source files for each of the widgets. The widgets all use the d3 javascript library for the visualisation, the framework is not restricted to this paradigm and other libraries like Raphael and Paper can be used, depending on your own preference. Bear in mind, if using new libraries the dependencies will have to be listed in config.js and updated by bower. 

To build your own widgets, just create your own directory and add as much as you would like. 

Changing into 

     cd demos 

will bring us into the (current) demo webpages hosted on RawGit. To add content to your own webpage follow the examples in the [https://github.com/hpcc-systems/Visualization/wiki#getting-started](Getting Started) section and it shouldn't be too difficult to add your own custom widgets. 