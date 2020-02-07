export interface Node {
    id: string;
    text: string;
}

export interface Link {
    id: string;
    source: Node;
    target: Node;
}

export interface Data {
    nodes: Node[];
    links: Link[];
}

export interface Options {
    alpha: number;
    alphaMin: number;
    alphaDecay: number;
    velocityDecay: number;
    repulsionStrength: number;
    linkDistance: number;
    linkStrength: number;
    iterations: number;
}

export function forceDirected(data: Data, options: Options) {
    return new Promise(resolve => {
        // tslint:disable-next-line
        const workerCode = `var forceDirected=function(t){"use strict";function n(t,n,e,r){if(isNaN(n)||isNaN(e))return t;var i,o,s,u,a,l,c,f,h,v=t._root,y={data:r},_=t._x0,p=t._y0,d=t._x1,x=t._y1;if(!v)return t._root=y,t;for(;v.length;)if((l=n>=(o=(_+d)/2))?_=o:d=o,(c=e>=(s=(p+x)/2))?p=s:x=s,i=v,!(v=v[f=c<<1|l]))return i[f]=y,t;if(u=+t._x.call(null,v.data),a=+t._y.call(null,v.data),n===u&&e===a)return y.next=v,i?i[f]=y:t._root=y,t;do{i=i?i[f]=new Array(4):t._root=new Array(4),(l=n>=(o=(_+d)/2))?_=o:d=o,(c=e>=(s=(p+x)/2))?p=s:x=s}while((f=c<<1|l)==(h=(a>=s)<<1|u>=o));return i[h]=v,i[f]=y,t}function e(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i}function r(t){return t[0]}function i(t){return t[1]}function o(t,n,e){var o=new s(null==n?r:n,null==e?i:e,NaN,NaN,NaN,NaN);return null==t?o:o.addAll(t)}function s(t,n,e,r,i,o){this._x=t,this._y=n,this._x0=e,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function u(t){for(var n={data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}var a=o.prototype=s.prototype;function l(t){return function(){return t}}function c(){return 1e-6*(Math.random()-.5)}function f(t){return t.index}function h(t,n){var e=t.get(n);if(!e)throw new Error("missing: "+n);return e}a.copy=function(){var t,n,e=new s(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=u(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,target:r.target[i]=new Array(4)}):r.target[i]=u(n));return e},a.add=function(t){var e=+this._x.call(null,t),r=+this._y.call(null,t);return n(this.cover(e,r),e,r,t)},a.addAll=function(t){var e,r,i,o,s=t.length,u=new Array(s),a=new Array(s),l=1/0,c=1/0,f=-1/0,h=-1/0;for(r=0;r<s;++r)isNaN(i=+this._x.call(null,e=t[r]))||isNaN(o=+this._y.call(null,e))||(u[r]=i,a[r]=o,i<l&&(l=i),i>f&&(f=i),o<c&&(c=o),o>h&&(h=o));for(f<l&&(l=this._x0,f=this._x1),h<c&&(c=this._y0,h=this._y1),this.cover(l,c).cover(f,h),r=0;r<s;++r)n(this,u[r],a[r],t[r]);return this},a.cover=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var e=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(e))i=(e=Math.floor(t))+1,o=(r=Math.floor(n))+1;else{if(!(e>t||t>i||r>n||n>o))return this;var s,u,a=i-e,l=this._root;switch(u=(n<(r+o)/2)<<1|t<(e+i)/2){case 0:do{(s=new Array(4))[u]=l,l=s}while(o=r+(a*=2),t>(i=e+a)||n>o);break;case 1:do{(s=new Array(4))[u]=l,l=s}while(o=r+(a*=2),(e=i-a)>t||n>o);break;case 2:do{(s=new Array(4))[u]=l,l=s}while(r=o-(a*=2),t>(i=e+a)||r>n);break;case 3:do{(s=new Array(4))[u]=l,l=s}while(r=o-(a*=2),(e=i-a)>t||r>n)}this._root&&this._root.length&&(this._root=l)}return this._x0=e,this._y0=r,this._x1=i,this._y1=o,this},a.data=function(){var t=[];return this.visit(function(n){if(!n.length)do{t.push(n.data)}while(n=n.next)}),t},a.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},a.find=function(t,n,r){var i,o,s,u,a,l,c,f=this._x0,h=this._y0,v=this._x1,y=this._y1,_=[],p=this._root;for(p&&_.push(new e(p,f,h,v,y)),null==r?r=1/0:(f=t-r,h=n-r,v=t+r,y=n+r,r*=r);l=_.pop();)if(!(!(p=l.node)||(o=l.x0)>v||(s=l.y0)>y||(u=l.x1)<f||(a=l.y1)<h))if(p.length){var d=(o+u)/2,x=(s+a)/2;_.push(new e(p[3],d,x,u,a),new e(p[2],o,x,d,a),new e(p[1],d,s,u,x),new e(p[0],o,s,d,x)),(c=(n>=x)<<1|t>=d)&&(l=_[_.length-1],_[_.length-1]=_[_.length-1-c],_[_.length-1-c]=l)}else{var g=t-+this._x.call(null,p.data),w=n-+this._y.call(null,p.data),m=g*g+w*w;if(m<r){var b=Math.sqrt(r=m);f=t-b,h=n-b,v=t+b,y=n+b,i=p.data}}return i},a.remove=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(s=+this._y.call(null,t)))return this;var n,e,r,i,o,s,u,a,l,c,f,h,v=this._root,y=this._x0,_=this._y0,p=this._x1,d=this._y1;if(!v)return this;if(v.length)for(;;){if((l=o>=(u=(y+p)/2))?y=u:p=u,(c=s>=(a=(_+d)/2))?_=a:d=a,n=v,!(v=v[f=c<<1|l]))return this;if(!v.length)break;(n[f+1&3]||n[f+2&3]||n[f+3&3])&&(e=n,h=f)}for(;v.data!==t;)if(r=v,!(v=v.next))return this;return(i=v.next)&&delete v.next,r?(i?r.next=i:delete r.next,this):n?(i?n[f]=i:delete n[f],(v=n[0]||n[1]||n[2]||n[3])&&v===(n[3]||n[2]||n[1]||n[0])&&!v.length&&(e?e[h]=v:this._root=v),this):(this._root=i,this)},a.removeAll=function(t){for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this},a.root=function(){return this._root},a.size=function(){var t=0;return this.visit(function(n){if(!n.length)do{++t}while(n=n.next)}),t},a.visit=function(t){var n,r,i,o,s,u,a=[],l=this._root;for(l&&a.push(new e(l,this._x0,this._y0,this._x1,this._y1));n=a.pop();)if(!t(l=n.node,i=n.x0,o=n.y0,s=n.x1,u=n.y1)&&l.length){var c=(i+s)/2,f=(o+u)/2;(r=l[3])&&a.push(new e(r,c,f,s,u)),(r=l[2])&&a.push(new e(r,i,f,c,u)),(r=l[1])&&a.push(new e(r,c,o,s,f)),(r=l[0])&&a.push(new e(r,i,o,c,f))}return this},a.visitAfter=function(t){var n,r=[],i=[];for(this._root&&r.push(new e(this._root,this._x0,this._y0,this._x1,this._y1));n=r.pop();){var o=n.node;if(o.length){var s,u=n.x0,a=n.y0,l=n.x1,c=n.y1,f=(u+l)/2,h=(a+c)/2;(s=o[0])&&r.push(new e(s,u,a,f,h)),(s=o[1])&&r.push(new e(s,f,a,l,h)),(s=o[2])&&r.push(new e(s,u,h,f,c)),(s=o[3])&&r.push(new e(s,f,h,l,c))}i.push(n)}for(;n=i.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this},a.x=function(t){return arguments.length?(this._x=t,this):this._x},a.y=function(t){return arguments.length?(this._y=t,this):this._y};var v={value:function(){}};function y(){for(var t,n=0,e=arguments.length,r={};n<e;++n){if(!(t=arguments[n]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}return new _(r)}function _(t){this._=t}function p(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function d(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=v,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}_.prototype=y.prototype={constructor:_,on:function(t,n){var e,r,i=this._,o=(r=i,(t+"").trim().split(/^|\\s+/).map(function(t){var n="",e=t.indexOf(".");if(e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),t&&!r.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:n}})),s=-1,u=o.length;if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++s<u;)if(e=(t=o[s]).type)i[e]=d(i[e],t.name,n);else if(null==n)for(e in i)i[e]=d(i[e],t.name,null);return this}for(;++s<u;)if((e=(t=o[s]).type)&&(e=p(i[e],t.name)))return e},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new _(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=0,e=(r=this._[t]).length;o<e;++o)r[o].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}};var x,g,w=0,m=0,b=0,A=1e3,N=0,M=0,k=0,E="object"==typeof performance&&performance.now?performance:Date,T="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function j(){return M||(T(q),M=E.now()+k)}function q(){M=0}function S(){this._call=this._time=this._next=null}function D(t,n,e){var r=new S;return r.restart(t,n,e),r}function O(){M=(N=E.now())+k,w=m=0;try{!function(){j(),++w;for(var t,n=x;n;)(t=M-n._time)>=0&&n._call.call(null,t),n=n._next;--w}()}finally{w=0,function(){var t,n,e=x,r=1/0;for(;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:x=n);g=t,z(r)}(),M=0}}function P(){var t=E.now(),n=t-N;n>A&&(k-=n,N=t)}function z(t){if(!w){m&&(m=clearTimeout(m));var n=t-M;n>24?(t<1/0&&(m=setTimeout(O,n)),b&&(b=clearInterval(b))):(b||(N=M,b=setInterval(P,A)),w=1,T(O))}}function C(t){return t.x}function F(t){return t.y}S.prototype=D.prototype={constructor:S,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?j():+e)+(null==n?0:+n),this._next||g===this||(g?g._next=this:x=this,g=this),this._call=t,this._time=e,z()},stop:function(){this._call&&(this._call=null,this._time=1/0,z())}};var I=10,Y=Math.PI*(3-Math.sqrt(5));var K="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var L;(function(t,n){t.exports=function(){function t(t){return"function"==typeof t}var n=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},e=0,r=void 0,i=void 0,o=function(t,n){h[e]=t,h[e+1]=n,2===(e+=2)&&(i?i(v):x())},s="undefined"!=typeof window?window:void 0,u=s||{},a=u.MutationObserver||u.WebKitMutationObserver,l="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),c="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function f(){var t=setTimeout;return function(){return t(v,1)}}var h=new Array(1e3);function v(){for(var t=0;t<e;t+=2){var n=h[t],r=h[t+1];n(r),h[t]=void 0,h[t+1]=void 0}e=0}var y,_,p,d,x=void 0;function g(t,n){var e=this,r=new this.constructor(b);void 0===r[m]&&z(r);var i=e._state;if(i){var s=arguments[i-1];o(function(){return O(i,r,s,e._result)})}else S(e,r,t,n);return r}function w(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var n=new this(b);return E(n,t),n}l?x=function(){return process.nextTick(v)}:a?(_=0,p=new a(v),d=document.createTextNode(""),p.observe(d,{characterData:!0}),x=function(){d.data=_=++_%2}):c?((y=new MessageChannel).port1.onmessage=v,x=function(){return y.port2.postMessage(0)}):x=void 0===s?function(){try{var t=Function("return this")().require("vertx");return void 0!==(r=t.runOnLoop||t.runOnContext)?function(){r(v)}:f()}catch(t){return f()}}():f();var m=Math.random().toString(36).substring(2);function b(){}var A=void 0,N=1,M=2;function k(n,e,r){e.constructor===n.constructor&&r===g&&e.constructor.resolve===w?function(t,n){n._state===N?j(t,n._result):n._state===M?q(t,n._result):S(n,void 0,function(n){return E(t,n)},function(n){return q(t,n)})}(n,e):void 0===r?j(n,e):t(r)?function(t,n,e){o(function(t){var r=!1,i=function(t,n,e,r){try{t.call(n,e,r)}catch(t){return t}}(e,n,function(e){r||(r=!0,n!==e?E(t,e):j(t,e))},function(n){r||(r=!0,q(t,n))},t._label);!r&&i&&(r=!0,q(t,i))},t)}(n,e,r):j(n,e)}function E(t,n){if(t===n)q(t,new TypeError("You cannot resolve a promise with itself"));else if(function(t){var n=typeof t;return null!==t&&("object"===n||"function"===n)}(n)){var e=void 0;try{e=n.then}catch(n){return void q(t,n)}k(t,n,e)}else j(t,n)}function T(t){t._onerror&&t._onerror(t._result),D(t)}function j(t,n){t._state===A&&(t._result=n,t._state=N,0!==t._subscribers.length&&o(D,t))}function q(t,n){t._state===A&&(t._state=M,t._result=n,o(T,t))}function S(t,n,e,r){var i=t._subscribers,s=i.length;t._onerror=null,i[s]=n,i[s+N]=e,i[s+M]=r,0===s&&t._state&&o(D,t)}function D(t){var n=t._subscribers,e=t._state;if(0!==n.length){for(var r=void 0,i=void 0,o=t._result,s=0;s<n.length;s+=3)r=n[s],i=n[s+e],r?O(e,r,i,o):i(o);t._subscribers.length=0}}function O(n,e,r,i){var o=t(r),s=void 0,u=void 0,a=!0;if(o){try{s=r(i)}catch(t){a=!1,u=t}if(e===s)return void q(e,new TypeError("A promises callback cannot return that same promise."))}else s=i;e._state!==A||(o&&a?E(e,s):!1===a?q(e,u):n===N?j(e,s):n===M&&q(e,s))}var P=0;function z(t){t[m]=P++,t._state=void 0,t._result=void 0,t._subscribers=[]}var C=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(b),this.promise[m]||z(this.promise),n(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?j(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&j(this.promise,this._result))):q(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var n=0;this._state===A&&n<t.length;n++)this._eachEntry(t[n],n)},t.prototype._eachEntry=function(t,n){var e=this._instanceConstructor,r=e.resolve;if(r===w){var i=void 0,o=void 0,s=!1;try{i=t.then}catch(t){s=!0,o=t}if(i===g&&t._state!==A)this._settledAt(t._state,n,t._result);else if("function"!=typeof i)this._remaining--,this._result[n]=t;else if(e===F){var u=new e(b);s?q(u,o):k(u,t,i),this._willSettleAt(u,n)}else this._willSettleAt(new e(function(n){return n(t)}),n)}else this._willSettleAt(r(t),n)},t.prototype._settledAt=function(t,n,e){var r=this.promise;r._state===A&&(this._remaining--,t===M?q(r,e):this._result[n]=e),0===this._remaining&&j(r,this._result)},t.prototype._willSettleAt=function(t,n){var e=this;S(t,void 0,function(t){return e._settledAt(N,n,t)},function(t){return e._settledAt(M,n,t)})},t}(),F=function(){function n(t){this[m]=P++,this._result=this._state=void 0,this._subscribers=[],b!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof n?function(t,n){try{n(function(n){E(t,n)},function(n){q(t,n)})}catch(n){q(t,n)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return n.prototype.catch=function(t){return this.then(null,t)},n.prototype.finally=function(n){var e=this.constructor;return t(n)?this.then(function(t){return e.resolve(n()).then(function(){return t})},function(t){return e.resolve(n()).then(function(){throw t})}):this.then(n,n)},n}();return F.prototype.then=g,F.all=function(t){return new C(this,t).promise},F.race=function(t){var e=this;return n(t)?new e(function(n,r){for(var i=t.length,o=0;o<i;o++)e.resolve(t[o]).then(n,r)}):new e(function(t,n){return n(new TypeError("You must pass an array to race."))})},F.resolve=w,F.reject=function(t){var n=new this(b);return q(n,t),n},F._setScheduler=function(t){i=t},F._setAsap=function(t){o=t},F._asap=o,F.polyfill=function(){var t=void 0;if(void 0!==K)t=K;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var e=null;try{e=Object.prototype.toString.call(n.resolve())}catch(t){}if("[object Promise]"===e&&!n.cast)return}t.Promise=F},F.Promise=F,F}()}(L={exports:{}},L.exports),L.exports).polyfill();function U(t,n){var e=t.nodes,r=t.links,i=function(t){var n,e,r,i,o,s=f,u=function(t){return 1/Math.min(i[t.source.index],i[t.target.index])},a=l(30),v=1;function y(r){for(var i=0,s=t.length;i<v;++i)for(var u,a,l,f,h,y,_,p=0;p<s;++p)a=(u=t[p]).source,f=(l=u.target).x+l.vx-a.x-a.vx||c(),h=l.y+l.vy-a.y-a.vy||c(),f*=y=((y=Math.sqrt(f*f+h*h))-e[p])/y*r*n[p],h*=y,l.vx-=f*(_=o[p]),l.vy-=h*_,a.vx+=f*(_=1-_),a.vy+=h*_}function _(){if(r){var u,a,l=r.length,c=t.length,f=new Map(r.map((t,n)=>[s(t,n,r),t]));for(u=0,i=new Array(l);u<c;++u)(a=t[u]).index=u,"object"!=typeof a.source&&(a.source=h(f,a.source)),"object"!=typeof a.target&&(a.target=h(f,a.target)),i[a.source.index]=(i[a.source.index]||0)+1,i[a.target.index]=(i[a.target.index]||0)+1;for(u=0,o=new Array(c);u<c;++u)a=t[u],o[u]=i[a.source.index]/(i[a.source.index]+i[a.target.index]);n=new Array(c),p(),e=new Array(c),d()}}function p(){if(r)for(var e=0,i=t.length;e<i;++e)n[e]=+u(t[e],e,t)}function d(){if(r)for(var n=0,i=t.length;n<i;++n)e[n]=+a(t[n],n,t)}return null==t&&(t=[]),y.initialize=function(t){r=t,_()},y.links=function(n){return arguments.length?(t=n,_(),y):t},y.id=function(t){return arguments.length?(s=t,y):s},y.iterations=function(t){return arguments.length?(v=+t,y):v},y.strength=function(t){return arguments.length?(u="function"==typeof t?t:l(+t),p(),y):u},y.distance=function(t){return arguments.length?(a="function"==typeof t?t:l(+t),d(),y):a},y}(r).id(function(t){return t.id}).distance(n.linkDistance).strength(n.linkStrength),s=function(){var t,n,e,r,i=l(-30),s=1,u=1/0,a=.81;function f(r){var i,s=t.length,u=o(t,C,F).visitAfter(v);for(e=r,i=0;i<s;++i)n=t[i],u.visit(y)}function h(){if(t){var n,e,o=t.length;for(r=new Array(o),n=0;n<o;++n)e=t[n],r[e.index]=+i(e,n,t)}}function v(t){var n,e,i,o,s,u=0,a=0;if(t.length){for(i=o=s=0;s<4;++s)(n=t[s])&&(e=Math.abs(n.value))&&(u+=n.value,a+=e,i+=e*n.x,o+=e*n.y);t.x=i/a,t.y=o/a}else{(n=t).x=n.data.x,n.y=n.data.y;do{u+=r[n.data.index]}while(n=n.next)}t.value=u}function y(t,i,o,l){if(!t.value)return!0;var f=t.x-n.x,h=t.y-n.y,v=l-i,y=f*f+h*h;if(v*v/a<y)return y<u&&(0===f&&(y+=(f=c())*f),0===h&&(y+=(h=c())*h),y<s&&(y=Math.sqrt(s*y)),n.vx+=f*t.value*e/y,n.vy+=h*t.value*e/y),!0;if(!(t.length||y>=u)){(t.data!==n||t.next)&&(0===f&&(y+=(f=c())*f),0===h&&(y+=(h=c())*h),y<s&&(y=Math.sqrt(s*y)));do{t.data!==n&&(v=r[t.data.index]*e/y,n.vx+=f*v,n.vy+=h*v)}while(t=t.next)}}return f.initialize=function(n){t=n,h()},f.strength=function(t){return arguments.length?(i="function"==typeof t?t:l(+t),h(),f):i},f.distanceMin=function(t){return arguments.length?(s=t*t,f):Math.sqrt(s)},f.distanceMax=function(t){return arguments.length?(u=t*t,f):Math.sqrt(u)},f.theta=function(t){return arguments.length?(a=t*t,f):Math.sqrt(a)},f}().strength(n.repulsionStrength);return function(t){var n,e=1,r=.001,i=1-Math.pow(r,1/300),o=0,s=.6,u=new Map,a=D(c),l=y("tick","end");function c(){f(),l.call("tick",n),e<r&&(a.stop(),l.call("end",n))}function f(r){var a,l,c=t.length;void 0===r&&(r=1);for(var f=0;f<r;++f)for(e+=(o-e)*i,u.forEach(function(t){t(e)}),a=0;a<c;++a)null==(l=t[a]).fx?l.x+=l.vx*=s:(l.x=l.fx,l.vx=0),null==l.fy?l.y+=l.vy*=s:(l.y=l.fy,l.vy=0);return n}function h(){for(var n,e=0,r=t.length;e<r;++e){if((n=t[e]).index=e,null!=n.fx&&(n.x=n.fx),null!=n.fy&&(n.y=n.fy),isNaN(n.x)||isNaN(n.y)){var i=I*Math.sqrt(e),o=e*Y;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}function v(n){return n.initialize&&n.initialize(t),n}return null==t&&(t=[]),h(),n={tick:f,restart:function(){return a.restart(c),n},stop:function(){return a.stop(),n},nodes:function(e){return arguments.length?(t=e,h(),u.forEach(v),n):t},alpha:function(t){return arguments.length?(e=+t,n):e},alphaMin:function(t){return arguments.length?(r=+t,n):r},alphaDecay:function(t){return arguments.length?(i=+t,n):+i},alphaTarget:function(t){return arguments.length?(o=+t,n):o},velocityDecay:function(t){return arguments.length?(s=1-t,n):1-s},force:function(t,e){return arguments.length>1?(null==e?u.delete(t):u.set(t,v(e)),n):u.get(t)},find:function(n,e,r){var i,o,s,u,a,l=0,c=t.length;for(null==r?r=1/0:r*=r,l=0;l<c;++l)(s=(i=n-(u=t[l]).x)*i+(o=e-u.y)*o)<r&&(a=u,r=s);return a},on:function(t,e){return arguments.length>1?(l.on(t,e),n):l.on(t)}}}(e).force("link",i).force("charge",s).force("center",function(t,n){var e;function r(){var r,i,o=e.length,s=0,u=0;for(r=0;r<o;++r)s+=(i=e[r]).x,u+=i.y;for(s=s/o-t,u=u/o-n,r=0;r<o;++r)(i=e[r]).x-=s,i.y-=u}return null==t&&(t=0),null==n&&(n=0),r.initialize=function(t){e=t},r.x=function(n){return arguments.length?(t=+n,r):t},r.y=function(t){return arguments.length?(n=+t,r):n},r}()).alpha(n.alpha).alphaMin(n.alphaMin).alphaDecay(n.alphaDecay).velocityDecay(n.velocityDecay).stop().tick(n.iterations),{nodes:e,links:r}}return self.onmessage=function(t){var n=U.apply(void 0,t.data);self.postMessage(n)},t.forceDirected=U,t}({});`;

        const workerBlob = new Blob([workerCode], { type: "application/javascript" });
        const workerUrl = URL.createObjectURL(workerBlob);
        const worker = new Worker(workerUrl);

        worker.onmessage = event => {
            resolve(event.data);
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
        };
        worker.postMessage([data, options]);
    });
}
