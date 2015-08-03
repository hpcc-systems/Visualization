require(["apps/SampleSite/tempsrc/Popup", "src/chart/Pie", "src/google/Column", "src/amchart/Line", "src/layout/Surface", "src/amchart/Gauge", "src/amchart/Polar", "src/amchart/FloatingColumn"],
    function (Popup, Pie, Column, Line, Surface, Gauge, Polar, Floating) {
        
        var dropdown = new Popup()
            .size({width:400, height:400})
            .target("dropdown")
            .position("absolute")
            .widget(new Surface().title("Dropdown Example").widget(new Pie().testData()).surfaceBackgroundColor("rgb(234, 249, 255)"))
            .render(function(d) {
                d3.select("#dropdown button")
                .on("click", function() {
                    dropdown.updateState(!(dropdown.popupState()));
                });
            })
        ;
        
        var dropup = new Popup()
            .size({width:400, height:400})
            .target("dropup")
            .position("absolute")
            .top(-390)
            .widget(new Surface().title("Dropup Example").widget(new Line().testData()).surfaceBackgroundColor("rgb(234, 249, 255)"))
            .render(function(d) {
                d3.select("#dropup button")
                .on("click", function() {
                    dropup.updateState(!(dropup.popupState()));
                });
            })
        ;
        
        var dropleft = new Popup()
            .size({width:400, height:400})
            .target("dropleftright")
            .position("absolute")
            .top(10)
            .left(120)
            .widget(new Surface().title("Dropleft Example").widget(new Column().testData()).surfaceBackgroundColor("rgb(234, 249, 255)"))
            .render(function(d) {
                d3.select("#dropleftright button.btn-left")
                .on("click", function() {
                    dropleft.updateState(!(dropleft.popupState()));
                });
            })
        ;
        
        var dropright = new Popup()
            .size({width:400, height:400})
            .target("dropleftright")
            .position("absolute")
            .top(10)
            .right(134)
            .widget(new Surface().title("Dropright Example").widget(new Column().testData()).surfaceBackgroundColor("rgb(234, 249, 255)"))
            .render(function() {
                d3.select("#dropleftright button.btn-right")
                .on("click", function() {
                    dropright.updateState(!(dropright.popupState()));
                });               
            })
        ;

        var modalx = new Popup()
            .size({width:600,height:500})
            .target("main")
            .position("fixed")
            .widget(new Surface()
                .title("Modal Dialog With Close Button")
                .widget(new Gauge().testData())
                .surfaceBackgroundColor("rgb(234, 249, 255)")
                .buttonAnnotations([
                    {
                        id:"",
                        label:"\uf00d",
                        width:20,
                        padding:"0px 5px",
                        class: "close",
                        font: "FontAwesome",
                        callback: function(domNode) {
                            console.log("Click Override on button " + domNode);
                        }
                    }
                ])
                .on("click", function(obj) {
                    if (obj.class !== "close") {return;}
                    modalx.updateState(false);
                    d3.select("#mask2").style("display", "none");
                })
            )
            .render(function(d) {
                d3.select("#modal_x button")
                    .on("click", function() {
                        modalx.updateState(true);
                        d3.select("#mask2").style("display", "block");
                    });
            })
        ;         
        modalx.left(document.documentElement.clientWidth / 2 - modalx._size.width / 2);
        modalx.top(document.documentElement.clientHeight / 2 - modalx._size.height / 2);
        
        var dialog = new Popup()
            .size({width:400,height:500})
            .target("main")
            .position("fixed")
            .widget(new Surface()
                .title("Modeless Dialog Example")
                .widget(new Floating().testData())
                .surfaceBackgroundColor("rgb(234, 249, 255)")
                .buttonAnnotations([
                    {
                        id:"",
                        label:"\uf00d",
                        width:20,
                        padding:"0px 5px",
                        class: "close",
                        font: "FontAwesome"
                    }
                ])
                .on("click", function(obj) {
                    if (obj.class !== "close") {return;}
                    dialog.updateState(false);
                })
            )
            .render(function(d) {
                d3.select("#dialog button")
                .on("click", function() {
                    dialog.updateState(true);
                });
            })
        ;
        dialog.left(document.documentElement.clientWidth / 2 - dialog._size.width / 2);
        dialog.top(document.documentElement.clientHeight / 2 - dialog._size.height / 2);

        var modal = new Popup()
            .size({width:500,height:500})
            .target("main")
            .position("fixed")
            .widget(new Surface().title("Modal Dialog Example").widget(new Polar().testData()).surfaceBackgroundColor("rgb(234, 249, 255)"))
            .render(function(d) {
                d3.select("#modal button")
                .on("click", function() {
                    modal.updateState(!(modal.popupState()));
                    d3.select("#mask")
                        .style("display", "block")
                        .on("click", function(d){
                            modal.updateState(false);
                            d3.select(this).style("display", "none");
                        });

                });
            })
        ;
        modal.left(document.documentElement.clientWidth / 2 - modal._size.width / 2);
        modal.top(document.documentElement.clientHeight / 2 - modal._size.height / 2);
    }
);

$(function(){
    function doresize() { 
        $('#graph-container').css({
            'height':$(window).height() - $('#graph-container').offset().top - 10
        });

        $(".cell").height($("#graph-container").height() / 2 - 20);
        $(".cell").width($("#graph-container").width() / 3 - 20);   
    }
    
    doresize();
    $(window).resize(function() {
        doresize();
    });
});