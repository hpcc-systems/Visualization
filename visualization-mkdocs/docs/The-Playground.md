The [Playground](https://cdn.rawgit.com/mlzummo/Visualization/DEMO_CODE_4/apps/SampleSite/playground.html) is an online, dynamic and user-friendly tool that allows users to alter widgets, primarily with a view to being able to manipulate the data-input into those widgets in an easy manner without having to edit the source code. 

# Structure of the Widget Page

The page is divided into two views, on the left being the widget currently being examined and on the right an editing interface where publish parameters can be manipulated with other features that will now be explained. 

## Widget View
This is located to the left hand side of the page and it is where the widget is primarily displayed with the following options. 

#### Select a Chart
Opens a drop-down menu from where the user can choose what widget to interact with.

#### Show Documentation
This will redirect the user to a completely new page with a comprehensive set of documentation on each widget and their members and methods so that the user can easily add or change functionality to the widget that they would like.

#### Selected Widget
A view of the chosen widget.


#### Serialization Test
By selecting this tab, the user refreshes the widget if they have made any changes to it in the editing section. 


#### Seriaizsation JSON

Displays a JSON file with a list of publish parameters that control how the widget should look. This JSON file is dynamic and is changed every time an edit to one of the publish parameters is made. Effectively, when we switch to the [Serialization Tab]() tab, it is this JSON file that is refreshed and the view of the new widget can be then seen.






## Editing View 
This is located to the right hand side of the page and comprises of the following tabs that are related to editing the widget that is currently in the view.

#### Discover Params
A long list of publish parameters that are specific to each widget that can be manipulated and upon manipulation will change the Serialization JSON so that the changes can be viewed when the Serialization tab is refreshed. Of particular interest here may be to change the input data into a specific widget, which can be proved to be quite useful and easier than editing the source code. 


#### Example Code
Here the user is presented with the HTML source code that generates the widget so that they can copy and paste it into their own project if they would like or view it in browser by selecting the "Demo Example Code (Plain)" option at the bottom of the page. 


#### Object Hierarchy
This tab presents the user with a visualisation that details the dependencies of the currently displayed widget in a linking format. 


#### Live Edit CSS 
This is a Live Edit CSS interactive view.

