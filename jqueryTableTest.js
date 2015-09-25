function fixTable(){
    var t = $('table').last();
    var thtml = t.find('thead').clone().wrap('<div>').parent().html();
    t.find('thead').before(thtml);
    t.find('thead').last().css({
        'position':'absolute',
        'top':'0px',
        'left':'0px'
    });
}