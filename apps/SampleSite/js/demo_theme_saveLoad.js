$(function(){
    $('#saveLoadWrapper > button').click(function(){
        fillThemeDropdown();
    });
});
function fillThemeDropdown(){
    var arr = g_themeEditor.getDefaultThemes();
    var optionHTML = '';
    var currentTheme = g_themeEditor.loadedTheme();
    arr.forEach(function(themeName){
        optionHTML += '<option value="'+themeName+'">'+themeName+'</option>';
    });
    $('#load-theme').html(optionHTML);
    $('#load-theme').val(currentTheme);
}
function _save_theme(){
    var saveName = $('#save-name').val();
    g_themeEditor.save(saveName);
    fillThemeDropdown();
}
function _load_theme(name){
    g_themeEditor.load(name);
}
function _delete_theme(name){
    var arr = g_themeObj;
    if(typeof (arr[name]) !== 'undefined'){
        delete arr[name];
    }
    localStorage.themeEditorThemes = JSON.stringify(arr);
    fillThemeDropdown();
}