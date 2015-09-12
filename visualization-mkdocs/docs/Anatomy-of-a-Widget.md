













Every widget follows the following basic pattern:
* It is an object derived from either HTMLWidget or SVGWidget
* Implements an interface defined in the API folder (widgets typically fall into one of five categories based on the data they are displaying).
* Publish properties:  There is a special prototype.publish call which exposed properties to the consumer.  Once a property is published the object will auto-magically get a "setter/getter" method and it will be discoverable and serializable.
* Overrides the enter/update/exit methods:  This is where you write your rendering logic, enter is when the widget enters the page, update is when the widget needs to re-render itself and exit is when the widget is being removed from the web page.