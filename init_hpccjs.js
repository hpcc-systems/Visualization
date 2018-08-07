window.hpccjs = {};
Object.keys(window).filter(n=>n.indexOf("@hpcc-js/")===0).forEach(function(n,i){
    package_name = n.split('/')[1];
    hpccjs[package_name] = window[n];
});
document.body.addEventListener("click", function(e) {
    if(e.ctrlKey && e.altKey){
        var widget_obj = {};
        for(var i = 0;i<e.path.length;i++){
            var datum = e.path[i].__data__;
            if(datum && datum._id && typeof widget_obj[datum._id] === "undefined"){
                widget_obj[datum._id] = datum;
                console.group(datum.classID() + ` [id=${datum._id}]`);
                console.table(datum._publishedProperties);
                console.groupEnd();
            }
        }
        var ph = document.createElement("div");
        ph.id = "hpccjs_modal_placeholder";
        document.body.appendChild(ph)
        new hpccjs.layout.Modal()
            .target("hpccjs_modal_placeholder")
            .title("Widget Published Properties")
            .widget(
                new hpccjs.other.Html()
                    .html(`
                        <ul>
                            <li>${Object.keys(widget_obj).map(widget_id=>`
                                <span>${widget_obj[widget_id].classID() + " [id=" + widget_id + "]"}</span>
                                <ul>
                                    <li>${
                                        widget_obj[widget_id]._publishedProperties.map(prop=>`
                                        <span>${prop.id}</span>
                                        <ul>
                                            <li><i>origDefaultValue: </i><b>${prop.origDefaultValue}</b></li>
                                            <li><i>defaultValue: </i><b>${prop.defaultValue}</b></li>
                                            <li><i>value: </i><b>${widget_obj[widget_id][prop.id]()}</b></li>
                                        </ul>`)
                                        .join('</li><li>')
                                    }</li>
                                </ul>
                            `).join('</li><li>')}</li>
                        </ul>
                    `)
            )
            .render()
            ;
    }
});