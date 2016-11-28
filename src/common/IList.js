export function IList() {
}

//  Properties  ---

//  Events  ---
IList.prototype.click = function (d) {
    console.log("Click:  " + d);
};

IList.prototype.dblclick = function (d) {
    console.log("Double click:  " + d);
};
