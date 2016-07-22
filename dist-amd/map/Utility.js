// (c) 2008 David Troy

(function(e,t){typeof define=="function"&&define.amd?define(["d3"],t):e.map_Utility=t(e.d3)})(this,function(e){function t(){}t.prototype.constructor=t,t.prototype._class+=" map_Geohash",t.prototype.base32="0123456789bcdefghjkmnpqrstuvwxyz",t.prototype.encode=function(e,t,n){if(typeof n=="undefined"){for(var r=1;r<=12;r++){var i=this.encode(e,t,r),s=this.decode(i);if(s.lat===e&&s.lon===t)return i}n=12}e=Number(e),t=Number(t),n=Number(n);if(isNaN(e)||isNaN(t)||isNaN(n))throw new Error("Invalid geohash");var o=0,u=0,a=!0,f="",l=-90,c=90,h=-180,p=180;while(f.length<n){if(a){var d=(h+p)/2;t>d?(o=o*2+1,h=d):(o*=2,p=d)}else{var v=(l+c)/2;e>v?(o=o*2+1,l=v):(o*=2,c=v)}a=!a,++u===5&&(f+=this.base32.charAt(o),u=0,o=0)}return f},t.prototype.decode=function(e){var t=this.bounds(e),n=t.sw.lat,r=t.sw.lon,i=t.ne.lat,s=t.ne.lon,o=(n+i)/2,u=(r+s)/2;return o=o.toFixed(Math.floor(2-Math.log(i-n)/Math.LN10)),u=u.toFixed(Math.floor(2-Math.log(s-r)/Math.LN10)),{lat:Number(o),lon:Number(u)}},t.prototype.bounds=function(e){if(e.length===0)throw new Error("Invalid geohash");e=e.toLowerCase();var t=!0,n=-90,r=90,i=-180,s=180;for(var o=0;o<e.length;o++){var u=e.charAt(o),a=this.base32.indexOf(u);if(a===-1)throw new Error("Invalid geohash");for(var f=4;f>=0;f--){var l=a>>f&1;if(t){var c=(i+s)/2;l===1?i=c:s=c}else{var h=(n+r)/2;l===1?n=h:r=h}t=!t}}var p={sw:{lat:n,lon:i},ne:{lat:r,lon:s}};return p},t.prototype.adjacent=function(e,t){e=e.toLowerCase(),t=t.toLowerCase();if(e.length===0)throw new Error("Invalid geohash");if("nsew".indexOf(t)===-1)throw new Error("Invalid direction");var n={n:["p0r21436x8zb9dcf5h7kjnmqesgutwvy","bc01fg45238967deuvhjyznpkmstqrwx"],s:["14365h7k9dcfesgujnmqp0r2twvyx8zb","238967debc01fg45kmstqrwxuvhjyznp"],e:["bc01fg45238967deuvhjyznpkmstqrwx","p0r21436x8zb9dcf5h7kjnmqesgutwvy"],w:["238967debc01fg45kmstqrwxuvhjyznp","14365h7k9dcfesgujnmqp0r2twvyx8zb"]},r={n:["prxz","bcfguvyz"],s:["028b","0145hjnp"],e:["bcfguvyz","prxz"],w:["0145hjnp","028b"]},i=e.slice(-1),s=e.slice(0,-1),o=e.length%2;return r[t][o].indexOf(i)!==-1&&s!==""&&(s=this.adjacent(s,t)),s+this.base32.charAt(n[t][o].indexOf(i))},t.prototype.neighbours=function(e){return{n:this.adjacent(e,"n"),ne:this.adjacent(this.adjacent(e,"n"),"e"),e:this.adjacent(e,"e"),se:this.adjacent(this.adjacent(e,"s"),"e"),s:this.adjacent(e,"s"),sw:this.adjacent(this.adjacent(e,"s"),"w"),w:this.adjacent(e,"w"),nw:this.adjacent(this.adjacent(e,"n"),"w")}},t.prototype.contained=function(e,t,n,r,i){if(isNaN(t)||t>=90)t=89;if(isNaN(n)||n>180)n=180;if(isNaN(r)||r<=-90)r=-89;if(isNaN(e)||e<-180)e=-180;i=i||1;var s=this.encode(t,e,i),o=this.encode(t,n,i),u=this.encode(r,n,i),a=s,f=0,l=-1,c=[s,u],h=this.adjacent(s,"e");while(h!==u)c.push(h),++f,h===o||l===f?(l=f+1,f=0,h=this.adjacent(a,"s"),a=h):h=this.adjacent(h,"e");return c},t.prototype.calculateWidthDegrees=function(e){var t;e%2===0?t=-1:t=-0.5;var n=180/Math.pow(2,2.5*e+t);return n},t.prototype.width=function(e){var t=e%2;return 180/(2^(5*e+t)/2-1)};var n=function(){function s(){var s=Math.max(Math.log(n)/Math.LN2-8,0),o=Math.round(s+i),u=Math.pow(2,s-o+8),a=[(r[0]-n/2)/u,(r[1]-n/2)/u],f=[],l=e.range(Math.max(0,Math.floor(-a[0])),Math.max(0,Math.ceil(t[0]/u-a[0]))),c=e.range(Math.max(0,Math.floor(-a[1])),Math.max(0,Math.ceil(t[1]/u-a[1])));return c.forEach(function(e){l.forEach(function(t){f.push([t,e,o])})}),f.translate=a,f.scale=u,f}var t=[960,500],n=256,r=[t[0]/2,t[1]/2],i=0;return s.size=function(e){return arguments.length?(t=e,s):t},s.scale=function(e){return arguments.length?(n=e,s):n},s.translate=function(e){return arguments.length?(r=e,s):r},s.zoomDelta=function(e){return arguments.length?(i=+e,s):i},s},r=function(){function h(e){var t=e[0],n=e[1];return o=null,(a(t,n),o)||(f(t,n),o)||(l(t,n),o)||(c(t,n),o),o}var t=1e-6,n=e.geo.albers(),r=e.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),i=e.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),s=e.geo.conicEqualArea().rotate([66,0]).center([0,18]).parallels([8,18]),o,u={point:function(e,t){o=[e,t]}},a,f,l,c;return h.invert=function(e){var t=n.scale(),o=n.translate(),u=(e[0]-o[0])/t,a=(e[1]-o[1])/t;return(a>=.12&&a<.234&&u>=-0.425&&u<-0.214?r:a>=.166&&a<.234&&u>=-0.214&&u<-0.115?i:a>=.204&&a<.234&&u>=.32&&u<.38?s:n).invert(e)},h.stream=function(e){var t=n.stream(e),o=r.stream(e),u=i.stream(e),a=s.stream(e);return{point:function(e,n){t.point(e,n),o.point(e,n),u.point(e,n),a.point(e,n)},sphere:function(){t.sphere(),o.sphere(),u.sphere(),a.sphere()},lineStart:function(){t.lineStart(),o.lineStart(),u.lineStart(),a.lineStart()},lineEnd:function(){t.lineEnd(),o.lineEnd(),u.lineEnd(),a.lineEnd()},polygonStart:function(){t.polygonStart(),o.polygonStart(),u.polygonStart(),a.polygonStart()},polygonEnd:function(){t.polygonEnd(),o.polygonEnd(),u.polygonEnd(),a.polygonEnd()}}},h.precision=function(e){return arguments.length?(n.precision(e),r.precision(e),i.precision(e),s.precision(e),h):n.precision()},h.scale=function(e){return arguments.length?(n.scale(e),r.scale(e*.35),i.scale(e),s.scale(e),h.translate(n.translate())):n.scale()},h.translate=function(e){if(!arguments.length)return n.translate();var o=n.scale(),p=+e[0],d=+e[1];return a=n.translate(e).clipExtent([[p-.455*o,d-.238*o],[p+.455*o,d+.238*o]]).stream(u).point,f=r.translate([p-.307*o,d+.201*o]).clipExtent([[p-.425*o+t,d+.12*o+t],[p-.214*o-t,d+.234*o-t]]).stream(u).point,l=i.translate([p-.205*o,d+.212*o]).clipExtent([[p-.214*o+t,d+.166*o+t],[p-.115*o-t,d+.234*o-t]]).stream(u).point,c=s.translate([p+.35*o,d+.224*o]).clipExtent([[p+.32*o,d+.204*o],[p+.38*o,d+.234*o]]).stream(u).point,h},h.scale(1070)};return e.geo.albersUsaPr||(e.geo.albersUsaPr=r),{Geohash:t,Tile:n,albersUsaPr:r}});