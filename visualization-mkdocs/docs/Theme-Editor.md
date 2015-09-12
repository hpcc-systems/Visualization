The [Theme Editor](https://cdn.rawgit.com/mlzummo/Visualization/DEMO_CODE_4/apps/SampleSite/themeeditor.html) is an online, dynamical toolkit that enables users to visually alter widgets by changing their publish parameters in the browser, and to integrate the selected widgets into dynamic dashboards that can be used in projects and also downloaded into static image files. 

## Structure of the Theme Editor
The editor is broken into two sections. The main section (to the left of the page) is where the widgets are visualised and in the right-side table menu are some editor options, which relate to being in ThemeMode or not and the publish parameters. Contained in the main section is also a menu-bar that enables us to manipulate the widgets in different ways. The menu-bar consists of the following options [Widgets](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#widgets), [Colors](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#colors), [Fonts](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#fonts) and [Layouts](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#layouts), and each option will be explained. 


### Main Section

### Widgets
By selecting the widgets option initialises the new sub-menu-bar that reads [Theme Editor](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#theme-editor), [View Themes](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#view-themes), [View Serials](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#view-serials) which have the following purposes

##### Theme Editor 
This opens a box from where we can decide what widgets we want to include in the dashboard. By selecting a widget it simply will add that widget to the dashboard. 

##### View Themes
This opens a new window with a selection of saved themes in JSON format. 

##### View Serials
This opens a new window with serialised themes in JSON format.

##### Colors
By selecting the Colors option initialises the new sub-menu-bar that reads [Container Colors](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#container-colors), [Ordinal Palette](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#ordinal-palette), [Rainbow Palette](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#rainbow-palette) which have the following purposes
##### Container Colors
In choosing this option, the user can customise the colors of the container within which the widget is contained, whether by using built-in themes or building them from scratch.

##### Ordinal Palette
This will change the colors of, say, the columns in a bar chart but in this case we can choose discrete, unrelated colours from the palette. There are number of options that if chosen will change the components of each individual widget.


##### Rainbow Palette
This has the same function as the Ordinal Palette but instead of unrelated colours the palette follows a continuous color change, making visualisations sometimes easier to interpret.


### Fonts
By selecting the Fonts option initialises the new sub-menu-bar that reads [Title Font Family](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#title-font-family), [Title Font Size](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#title-font-size), [Font Family](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#font-family) and [Font Size]((https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#font-size) which have the following purposes


##### Title Font Family 
Changes the font of the title of each widget - available are most standardly used fonts.

##### Title Font Size
Changes the font size of the title of each widget.

##### Font Family 
Changes the font type of text within each widget.
##### Font Size
Changes the font size of the text within each widget.




### Layout
By selecting the Layout option initialises the new sub-menu-bar that reads [Cell Density](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#cell-density). Also, inside the layout page, there is a "drag" and "drop" option where the position of the chosen widgets in the dashboard can be interchanged, extended and moved into entirely new positions. Just drag and drop! 

##### Cell Density
The cell density is simply a tool to control the number of widgets that are allowed in the dashboard. By increasing the density, it increases the density of each widget, and so decreases the number of allowed widgets within the dashboard. By decreasing the density, more widgets are allowed in the dashboard, though readability issues may occur if the density is too small.


### Right-Side Table Menu
Here I will explain the structure of the right-side table menu. The first drop-down menu here is "Editor Options" and depending on whether ThemeMode is selected or not the rest of right-side table menu is different. Effectively, the Theme Editor has two main modes

1. [ThemeMode](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#thememode)
2. [Non-ThemeMode](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#non-thememode)

and depending on the selection of either, the structure of the page is different, and such what follows is a discussion of the structure of the right-side table menu in both different modes. 

## ThemeMode
By selecting this option the editor enters a mode where all the widgets are interacted with at once and properties such as container styles and font styles across the dashboard can be changed all at once. The following drop-down menus appear when this option is chosen [Save/Load Theme](https://github.com/hpcc-systems/Visualization/wiki/Them-editor#saveload-theme), [Grid Options](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#grid-options), [Chart Colors](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#chart-colors), [Container Styles/Colors](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#container-stylescolors) and [Font Styles/Colors](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#font-stylescolors)

#### Save/Load Theme
Here the user can either load a previously saved theme or save their own one which they have just constructed.


#### Grid Options
Here the user can change certain style aspects with respect to grids such as the colors of the XAxis and YAxis Gridline colors.

#### Chart Colors
Here the chart palettes can be changed in much the same way as [Colors](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#colors).

#### Container Styles/Colors
The user can change style aspects in relation to the Container in this section.

#### Font Styles/Colors
The user can change the font in a similar way to [Fonts](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#fonts) but with a number of added options.

## Non-ThemeMode
By unselecting ThemeMode the user enters into Non-ThemeMode. Non-ThemeMode is characterised by the following drop- down menus [Save/Load Serial](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#saveload-serial) and [Chart Properties](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#chart-properties). Conceptually, the main difference in this mode is that the user can make changes that can individually effect each of the widgets and so properties like the column width in a specific bar chart can be changed. 

#### Save/Load Serial
This operates much in the same way as [Save/Load Theme](https://github.com/hpcc-systems/Visualization/wiki/Theme-Editor#saveload-theme) but what can be saved in this case are not themes but the serial code that is related to the specific changes that the user will make in this editing mode. Users can also load up previously saved serials.


#### Chart Properties
In this drop-down menu the user can change very specific attributes to each widget as mentioned above. There are some technical aspects to being in ThemeMode and Non-ThemeMode from a developers point of view but for now, this is as far as the documentation takes us. 
