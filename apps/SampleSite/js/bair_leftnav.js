var lnavArr = [
    {
        icon:'glyphicon glyphicon-unchecked',
        label:'DASHBOARD',
        isActive:true
    },
    {
        icon:'glyphicon glyphicon-unchecked',
        label:'SEARCH RESULTS',
        isActive:false,
    },
    {
        icon:'glyphicon glyphicon-unchecked',
        label:'CASES',
        isActive:false
    },
    {
        icon:'glyphicon glyphicon-unchecked',
        label:'REPORT MANAGER',
        isActive:false
    },
    {
        icon:'glyphicon glyphicon-unchecked',
        label:'ACCURINT LE',
        isActive:false
    },
];

function html_leftNav(){
    var html = '';
    for(var i in lnavArr){
        html += _li(lnavArr[i]);
    }
    return html;
    
    function _li(liObj){
        var isActive = liObj.isActive ? ' class="active"' : '';
        var ret = '<li'+isActive+'>'+
                    '<a href="#">'+
                        '<span class="'+liObj.icon+'"></span>'+
                        '<span class="nav-label">'+liObj.label+'</span>'+
                    '</a>'+
                '</li>';
        return ret;
    }
}