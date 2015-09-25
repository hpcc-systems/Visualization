var graph;
var propEditor = {};
var currWidget = {};
var main = {};
var FormWidget = {};
var formFieldValue;

function resizeGraph() {
	if(graph){
		graph.resize();
	}
}

function createDashboardVisualization(target, params, editable) {	
	var frame = null;
	$('#'+target).addClass("VisualizationChartWrapper");	
	jq('#'+target)
		.html('<div class="z-apply-loading-indicator" style="width:80px;height:25px;position:fixed;top: 50%;left: 50%;margin-top:0px;margin-left:50px;border:1px solid #ccc;vertical-align:middle;"><span class="z-apply-loading-icon"></span>Loading...</div><div id="chartHolder_'+target+'" class="chartHolder"></div><div id="propHolder_'+target+'" class="propertyEditor"></div>');
	params = jq.parseJSON(params);	
	var visualizeRoxie = false;
	var layout = "Hierarchy";
	var proxyMappings = null; 
    
	if (!window.location.origin)
		window.location.origin = window.location.protocol + "//" + window.location.host;

	var hostUrl = window.location.origin + "/DSP/" + params.hpccId;
    
	proxyMappings = jq.parseJSON('{"' +  params.WsWorkunits + '/WUResult.json":"' + hostUrl + '/proxy-WUResult.do","' +
			params.WsWorkunits + '/WUInfo.json":"' + hostUrl + '/proxy-WUInfo.do","' + 
			params.WsEcl + '/submit/query/":"' + hostUrl + '/proxy-WsEcl.do"}');	
	
	require(["js/Visualization/src/config"], function () {    	
    	requirejs.config({
            baseUrl: "js/Visualization/src"
        });
    	require(["src/marshaller/HTML", "src/other/Persist", "src/other/PropertyEditor", "src/form/Form"], function (HTMLMarshaller, Persist, PropertyEditor, Form) {    		
    		
    		if(params.layout){   
    			var parsedParams=jq.parseJSON(params.layout);    			
            	Persist.create(parsedParams.LayoutText, function(persistWidget) {            		
            		currWidget[target] = persistWidget;
            		if(parsedParams.formText != null){	            		
	    					formFieldValue=parsedParams.formText;	    					
            		}
            		
        	    	persistWidget.target('chartHolder_'+target)        	    			
                    		.render(function (m) { 
                    			Persist.widgetWalker(m,function(w) {
                    				if (w._class.indexOf("form_Form") !== -1 && Object.keys(w.values()).length) { // form and has default value
                    					var timeoutCounter = 0;
                    					var intervalHandler = setInterval(function() {
                    						if (timeoutCounter >= 50) {
                            					clearInterval(intervalHandler);
                        					}

                    						if (m.marshaller.commsDataLoaded()) {
                    							clearInterval(intervalHandler);
                    							w.submit();
                    						}
                    					}, 100)
                    				}
                    			});
								jq('#'+target+' .z-apply-loading-indicator').remove();	
					});        	    	
            	 });            	
        	}else{        		
	    		main[target] = new HTMLMarshaller();	    		    
	            main[target].ddlUrl(params.url)
								.proxyMappings(proxyMappings)								
								.target('chartHolder_'+target)
								.render(function (m) {
									Persist.widgetWalker(m,function(w) {
	                    				if (w._class.indexOf("form_Form") !== -1 && Object.keys(w.values()).length) { // form and has default value
	                    					var timeoutCounter = 0;
	                    					var intervalHandler = setInterval(function() {
	                    						if (timeoutCounter >= 50) {
	                            					clearInterval(intervalHandler);
	                        					}

	                    						if (m.marshaller.commsDataLoaded()) {
	                    							clearInterval(intervalHandler);
	                    							w.submit();
	                    						}
	                    					}, 100)
	                    				}
	                    			});
									jq('#'+target+' .z-apply-loading-indicator').remove();					            	
										
								});
	    		currWidget[target] = main[target];
        	}
    		propEditor[target] = new PropertyEditor()
			.show_settings(false)
			.showColumns(false)
			.showData(false)
			.target("propHolder_"+target);
		});     
            
            
            
    	});	
	
}

function displayProperties(sourceWidget,target) { 
	jq('#'+target+' .z-apply-loading-indicator').remove(); 
	propEditor[target]
        .data([sourceWidget])
        .render(function(){        	
        	jq("#propHolder_"+target+" div").css("overflow","");
        })
    ;
}

function showProperties(show,chartDivId) {
	if(show){					
		currWidget[chartDivId].designMode(true);
		displayProperties(currWidget[chartDivId],chartDivId);		
		jq('#propHolder_'+chartDivId).show();		
		 var styles = {
				 width:"71%",
				 overflow:"hidden"
			    };
		jq('#chartHolder_'+chartDivId).css(styles);
		currWidget[chartDivId].resize().render();			
	}else{				
		jq('#propHolder_'+chartDivId).hide();
		var styles = {
				 width:"100%",
				 overflow:"hidden"
			    };
		jq('#chartHolder_'+chartDivId).css(styles);
		currWidget[chartDivId].designMode(false).resize().render();		
	}	
		
}	