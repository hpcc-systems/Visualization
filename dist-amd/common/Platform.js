!function(e,t){"function"==typeof define&&define.amd?define(["d3","es6-promise"],t):(e.require=e.require||function(t,i){"function"==typeof t&&(i=t,t=[]);var r=t.map(function(t){var i=0===t.indexOf("src/")?"src/".length:0===t.indexOf("hpcc-viz/")?"hpcc-viz/".length:0===t.indexOf("../")?"../".length:0,r=t.substring(i).split("/").join("_");return e[r]});i.apply(null,r)},e.common_Platform=t(e.d3))}(this,function(e){function t(){}var i="1.20.7-rc1";return t.prototype.version=function(){return i},t.prototype.ieVersion=function(){var e,t=navigator.userAgent,i=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(i[1])?(e=/\brv[ :]+(\d+)/g.exec(t)||[],parseFloat(e[1])):/msie/i.test(i[1])?parseFloat(i[2]):null}(),t.prototype.isIE=null!==t.prototype.ieVersion,t.prototype.svgMarkerGlitch=t.prototype.isIE&&t.prototype.ieVersion<=12,t.prototype.MutationObserver=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver||function(e){this.callback=e,this.listeners=[];var t=function(e,t,i){this.callback=e,this.domNode=t,this.type=i};t.prototype={handleEvent:function(e){var t={type:this.type,target:this.domNode,addedNodes:[],removedNodes:[],previousSibling:e.target.previousSibling,nextSibling:e.target.nextSibling,attributeName:null,attributeNamespace:null,oldValue:null};this.callback([t])}},this.observe=function(e,i){var r=null;i.attributes&&(r=new t(this.callback,e,"attributes"),this.listeners.push(r),e.addEventListener("DOMAttrModified",r,!0)),i.characterData&&(r=new t(this.callback,e,"characterData"),this.listeners.push(r),e.addEventListener("DOMCharacterDataModified",r,!0)),i.childList&&(r=new t(this.callback,e,"childList"),this.listeners.push(r),e.addEventListener("DOMNodeInserted",r,!0),e.addEventListener("DOMNodeRemoved",r,!0))},this.disconnect=function(){this.listeners.forEach(function(e){switch(e.type){case"attributes":e.domNode.removeEventListener("DOMAttrModified",e,!0);break;case"characterData":e.domNode.removeEventListener("DOMCharacterDataModified",e,!0);break;case"childList":e.domNode.removeEventListener("DOMNodeRemoved",e,!0),e.domNode.removeEventListener("DOMNodeInserted",e,!0)}}),this.listeners=[]}},window.MutationObserver||(window.MutationObserver=t.prototype.MutationObserver),t.prototype._scrollBarWidth=null,t.prototype.getScrollbarWidth=function(){if(null===t.prototype._scrollBarWidth){var e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",e.style.msOverflowStyle="scrollbar",document.body.appendChild(e);var i=e.offsetWidth;e.style.overflow="scroll";var r=document.createElement("div");r.style.width="100%",e.appendChild(r);var o=r.offsetWidth;e.parentNode.removeChild(e),t.prototype._scrollBarWidth=i-o}return t.prototype._scrollBarWidth},t.prototype.debounce=function(e,t,i){return function(){function r(){i||e.apply(o,n),o.__hpcc_debounce_timeout=null}var o=this||{},n=arguments;o.__hpcc_debounce_timeout?clearTimeout(o.__hpcc_debounce_timeout):i&&e.apply(o,n),o.__hpcc_debounce_timeout=setTimeout(r,t||100)}},Math.sign=Math.sign||function(e){return e=+e,0===e||isNaN(e)?e:e>0?1:-1},t});