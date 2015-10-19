"use strict";
var createExampleCode = function(category, widget, url, callback) {
	var factory = category + "Factory";
	require(["./test/DataFactory", "./test/" + factory], function (DataFactory, thisFactory) {

    	var fact = d3.map(thisFactory[widget]);
    	var entry = d3.map(fact.entries()[0]);
    	var dataset = entry.entries()[0].value;

    	var func = String(thisFactory[widget][dataset]);

    	func = String(func.replace("function (callback) {", ""));
    	func = func.substr(0, func.length-1);
    	func = func.replace("\"test/DataFactory\", ", "");
    	func = func.replace("(DataFactory, ", "(");
		func = func.replace("callback(", "");
		func = func.replace("     \);", "         .target(\"target\")\n                        .render()\n                    ;");

		var regex = /\((DataFactory\..*)\)/g;
		var m;
		while ((m = regex.exec(func)) !== null) {
			var newline = "";
		    var paramText = "";
		    if (m.index === regex.lastIndex) {
		        regex.lastIndex++;
		    }

			var split = m[1].split(".");
			var xx = DataFactory[split[1]][split[2]][split[3]];
			var isarr = Array.isArray(xx) ? false : true;
			xx = stringifyObject(xx, isarr) + newline + "]";
			func = func.replace(m[1], xx);
		}

		if (func.indexOf("retVal);")) {
			func = func.replace("retVal);", "retVal.target(\"target\").render();");
		}

		var html = '<html>\n';
		html += '<head>\n';
		html += '    <meta charset="utf-8">\n';
		html += '    <script src="http://viz.hpccsystems.com/v1.6.6/dist-amd/hpcc-viz.js"></script>\n';
		html += '    <script src="http://viz.hpccsystems.com/v1.6.6/dist-amd/hpcc-bundles.js"></script>\n';
		html += '    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.css">\n';
		html += '    <script>\n';
		html += '        require.config({\n';
		html += '            paths: {\n';
		html += '                "src": "http://viz.hpccsystems.com/v1.6.6/dist-amd"\n';
		html += '            }\n';
		html += '        });\n';
		html += '    </script>\n';
		html += '</head>\n';
		html += '<body>\n';
		html += '    <div id="target" style="width:100%; height:100vh">\n';
		html += '    </div>\n';
		html += '    <script>\n';
		html += func + "\n";
		html += '    </script>\n';
		html += '</body>\n';
		html += '</html>\n';

		callback(html);

		function stringifyObject(obj, isObj) {	
			if (!isObj) {
				paramText += "[";
			} else {
				paramText += "{";
			}
			var i = 0;
			for (var key in obj) {
				// console.log(key, obj[key]);
				if (key === "parent") { return; }
				switch (typeof(obj[key])) {
					case "string":
						var y = obj[key].replace(/\n/g, "\\n");
						// y = y.replace(/\u/g, "\\u");
						if (isObj) { 
							paramText += key + ":" + '"' +y +'",';
 						} else {
							paramText += '"' + y +'"';
						}
						break;
					case "number":
						if (isObj) { 
							paramText += key + ":" + '"' + obj[key] +'",';
 						} else {
							paramText += obj[key];
 						} 
						break;
					case "object":
						if (obj[key] === null) {
							paramText += "null"; 
						} else {
							if (!Array.isArray(obj[key])) {
								// paramText += "{";
								if (isObj) {paramText += key + ":"; }
								stringifyObject(obj[key], true);
								paramText = paramText.substr(0, paramText.length - 1);
								paramText += "}";
							} else {
								paramText += "\n                            ";
								// paramText += key + ":\n                            ";
								stringifyObject(obj[key], false);
								paramText += "]";
								newline = "\n                        ";
							}
						}
						break;
					default:
				}
				++i;
				if (i < obj.length) {
					paramText += ",";
				}
			}
			return paramText;
		}


        
           
        	var data = {
        		title: category + ": " + widget,
				html: '<div id="target" style="width:100%; height:100vh"></div>',
				head: '<script src="http://viz.hpccsystems.com/v1.6.6/dist-amd/hpcc-viz.js"></script>\n'+'<script src="http://viz.hpccsystems.com/v1.6.6/dist-amd/hpcc-bundles.js"></script>\n'+'<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.css">\n'+' <script>\n'+'    require.config({\n'+'        paths: {\n'+'            "src": "http://viz.hpccsystems.com/v1.6.6/dist-amd"\n'+'        }\n'+ '    });\n'+'</script>\n',
				js: func
            };
           	$("#get_example_code input[type='hidden']").attr("value", JSON.stringify(data));
	});	
};