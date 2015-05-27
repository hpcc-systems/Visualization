function jump_to_function(target) {
    $('a[name="'+target+'"]').closest('.doc-item').find('.doc-addl').toggle();
    setTimeout(scrollTo,100);

    function scrollTo() {
        $('#section_'+target).closest('.doc-item').show(); // if tag hidden expand it ( todo unexpand on next if not active tag )

        $(document).scrollTop($('#anchor_'+target).offset().top);

        // flash selection red so its easy to find
        $('#section_'+target).animate({ color: "red" }, 2000, null, function() { $('#section_'+target).animate({ color: "#428bca" }, 2000); });
    }
}

var callbackFunc = function(widget) {

    $("#hierarchy-wrapper .tree_Dendrogram .node > circle").mouseover(function() {
        var index = 'src/'+$(this).text();
        var content = '<ul style="list-style-type: none;padding-left:0;padding-top:10px;">';
        functionListObj[index].forEach(function(d){
            var stripped_d = d.replace('.','').replace('()','');

            content += '<li><a href="#" onClick="javascript:jump_to_function(\''+stripped_d+'\');" style="color:#fff;">'+d+'</a></li>';
        });
        content += '</ul>';

        $(this).popover({
            trigger: 'manual',
            html: true,
            content: content,
            container: 'body',
            placement: 'right'
        })
        .popover('show')
        .on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(this).siblings(".popover").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        })
        .on("mouseleave", function () {
            var _this = this;
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(_this).popover("hide");
                }
            }, 100);
        });

        $(".popover").on("mouseleave", function () { $(this).popover("hide") }); // hack so that mouseout of popover will work

    });
}

function createTreeObj(str,obj) {
    if (typeof str == "undefined" || str == null || typeof obj[str] == "undefined" || obj[str] == null) { return; }
    var arr = [];

    var child_class = (obj[str].hasOwnProperty("child_class") ? obj[str].child_class : null);
    if (child_class != null) {
        var ab = createTreeObj(child_class,obj);
        if (ab) {
            arr.push(ab);
        } else {
            arr.push({label:child_class});
        }
    }

    var class_interface = (obj[str].hasOwnProperty("class_interface") ? obj[str].class_interface : null);
    if (class_interface != null) { arr.push({label:class_interface}); }

    return { label: str, children:arr };
}

function parseHierarchyRepsponse(my_response, src, parentWidg, return_obj) {
    src = src.replace('../src/', '');
    var src_obj = src.split('/'),
        return_obj = return_obj || [];

    var child_class = my_response.split(/Object\.create\([ \t]*([^\n\r\.]*)/)[1];
    if (typeof child_class == "undefined" || child_class == null ) {
        renderHierarchy(return_obj, parentWidg);
        return;
    }

    var root_regex = new RegExp("(.+?root\." + src_obj[0] + "_" + src_obj[1] + ".+)"),
        line = my_response.match(root_regex);
    if (line == null) {
        root_regex = new RegExp("(.+?root\." + src_obj[1] + ".+)");
        line = my_response.match(root_regex);
    }

    line = line[1];

    var regex = new RegExp("root\\.\\(*([^\\n\\r\\.]*)_" + child_class),
        folder = line.match(regex),
        class_path = null;
    if (folder) {
        class_path = folder[1] + "/" + child_class;
    } else {
        class_path = src_obj[0] + "/" + child_class;
    }

    var class_interface = my_response.match(/prototype.implements\((.*)\.prototype/);
    if (class_interface) {
        class_interface = class_interface[1];
        var regex = new RegExp("root\\.\\(*([^\\n\\r\\.]*)_" + class_interface),
            interface_folder = line.match(regex)[1],
            interface_path = interface_folder + "/" + class_interface;

        return_obj[src] = {
            "child_class" : class_path,
            "class_interface" : interface_path
        };
    } else {
        return_obj[src] = {
            "child_class" : class_path
        };
    }

    getHierarchyDynamically('../src/' + class_path, parentWidg, return_obj);
}

function getHierarchyDynamically(src, parentWidg, return_obj) {
    if (typeof src == "undefined" || src == null ) { return false; }

    var client = new XMLHttpRequest();
    client.open('GET', src + '.js');
    client.onload = function() {
        parseHierarchyRepsponse(client.responseText, src, parentWidg, return_obj);
    };
    client.send();
}

function renderHierarchy(data, parentWidg) {
    require(["src/tree/Dendrogram", "src/common/Palette"], function (Dendrogram, Palette) {
        var dendrogramWidget = new Dendrogram()
            .size({width:400,height:400})
            .target("hierarchy-wrapper")
            .data(createTreeObj(parentWidg,data))
            .orientation("vertical")
            .render(callbackFunc);

            dendrogramWidget.click(function(d) { console.log('Override Click: ' + JSON.stringify(d)); }) // must be last, does not return widget object
        ;
        $('#hierarchy-wrapper').css( {
            'position':'relative',
            'top':$('#hierarchy-pane').height()/2 - $('#hierarchy-wrapper').find("svg").height()/2
        } );
    });
}