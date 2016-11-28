export function IMenu() {
}

//  Properties  ---

//  Events  ---
IMenu.prototype.click = function (d) {
    console.log("Click:  " + d);
};
IMenu.prototype.preShowMenu = function () {
    console.log("preShowMenu");
};
IMenu.prototype.postHideMenu = function (d) {
    console.log("postHideMenu");
};
