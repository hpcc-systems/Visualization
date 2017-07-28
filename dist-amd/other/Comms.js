!function(t,e){"function"==typeof define&&define.amd?define(["../common/Utility"],e):t.other_Comms=e(t.common_Utility)}(this,function(t){function e(t){if(void 0===t||null===t)return null;if(!t.trim)return t.Row?r(t.Row):t;var e=t.trim();return""!==e&&!isNaN(e)&&(e.length<=1||"0"!==e[0]||"."===e[1])?Number(e):e}function r(t){for(var r in t)t[r]=e(t[r]);return t}function s(){this._protocol="http:",this._hostname="localhost"}function n(t){this._mappings=t,this._reverseMappings={};for(var e in this._mappings){this._reverseMappings[e]={};for(var r in this._mappings[e])this._reverseMappings[e][this._mappings[e][r]]=r}}function o(){s.call(this),this._proxyMappings={},this._mappings=new n({}),this._timeout=y}function i(){o.call(this)}function a(t){for(var e in t){if(t[e].Row&&t[e].Row instanceof Array)return t;var r;if("string"!=typeof t[e]&&(r=a(t[e])),r)return r}return null}function u(t){for(var e in t){if(t[e].Exception&&t[e].Exception instanceof Array)return t[e];var r=u(t[e]);if(r)return r}return null}function h(){o.call(this),this._port="8002",this._target="",this._query=""}function p(){o.call(this),this._port="8010",this._wuid="",this._jobname="",this._sequence=null,this._resultName=null,this._fetchResultNamesPromise=null,this._fetchResultPromise={},this._resultNameCache={},this._resultNameCacheCount=0}function c(){o.call(this),this._port="8010",this._wuid=null}function l(){o.call(this)}function m(){p.call(this),this._hipieResults={}}function f(t,e){return _(t,e).length>0}function _(t,e){return t.filters.filter(function(t){return t.fieldid===e})}function g(){m.call(this)}var y=60;s.prototype.url=function(t){if(!arguments.length)return this._url;this._url=t;var e=document.createElement("a");e.href=this._url,e.href=e.href;var r={};if(e.search.length){var s=e.search;"?"===s[0]&&(s=s.substring(1)),s=s.split("&"),s.map(function(t){var e=t.split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1])})}for(this._protocol=e.protocol,this._hostname=e.hostname,this._port=e.port,this._pathname=e.pathname;this._pathname.length&&"/"===this._pathname[0];)this._pathname=this._pathname.substring(1);return this._search=e.search,this._params=r,this._hash=e.hash,this._host=e.host,this},s.prototype.protocol=function(t){return arguments.length?(this._protocol=t,this):this._protocol},s.prototype.hostname=function(t){return arguments.length?(this._hostname=t,this):this._hostname},s.prototype.port=function(t){return arguments.length?(this._port=t,this):this._port},s.prototype.pathname=function(t){return arguments.length?(this._pathname=t,this):this._pathname},s.prototype.param=function(t){return this._params[t]},s.prototype.isWsWorkunits=function(){return this._pathname.toLowerCase().indexOf("wsworkunits")>=0||this._params.Wuid},s.prototype.isWorkunitResult=function(){return this.isWsWorkunits()&&(this._params.Sequence||this._params.ResultName)},s.prototype.isWsEcl=function(){return this._pathname.toLowerCase().indexOf("wsecl")>=0||this._params.QuerySetId&&this._params.Id},s.prototype.isWsWorkunits_GetStats=function(){return this._pathname.toLowerCase().indexOf("wsworkunits/wugetstats")>=0&&this._params.WUID},s.prototype.getUrl=function(t){return t=t||{},(void 0!==t.protocol?t.protocol:this._protocol)+"//"+(void 0!==t.hostname?t.hostname:this._hostname)+":"+(void 0!==t.port?t.port:this._port)+"/"+(void 0!==t.pathname?t.pathname:this._pathname)},n.prototype.contains=function(e,r){return t.exists(e+"."+r,this._mappings)},n.prototype.mapResult=function(t,e){var r=this._mappings[e];r&&(t[e]=t[e].map(function(t){var e=[];if(r.x&&r.x instanceof Array){e=[];for(var s=0;s<r.x.length;++s)e.push(t[r.y[s]])}else for(var n in r)"label"===r[n]?e[0]=t[n]:"weight"===r[n]&&(e[1]=t[n]);return e},this))},n.prototype.mapResponse=function(t){for(var e in t)this.mapResult(t,e)},o.prototype=Object.create(s.prototype);var d=function(t){var e=[];for(var r in t)if(t.hasOwnProperty(r)){var s=t[r];void 0!==s&&null!==s&&e.push(encodeURIComponent(r)+"="+encodeURIComponent(s))}return e.join("&")},v=function(t,e,r){return new Promise(function(s,n){function o(){delete window[u],document.body.removeChild(h)}var i=1e3*r,a=5e3,u="jsonp_callback_"+Math.round(999999*Math.random());window[u]=function(t){i=0,o(),s(t)};var h=document.createElement("script");h.src=t+(t.indexOf("?")>=0?"&":"?")+"jsonp="+u+"&"+d(e),document.body.appendChild(h);var p=setInterval(function(){0>=i?clearInterval(p):(i-=a,0>=i?(clearInterval(p),console.log("Request timeout:  "+h.src),o(),n(Error("Request timeout:  "+h.src))):console.log("Request pending ("+i/1e3+" sec):  "+h.src))},a)})};return o.prototype.jsonp=function(t,e,r){for(var n in this._proxyMappings){var o=t.split(n),i=o[0];if(o.length>1){var a=(new s).url(t);t=i+this._proxyMappings[n],e.IP=a.hostname(),e.PORT=a.port(),o.length>0&&(e.PATH=o[1]);break}}return v(t,e,this.timeout())},o.prototype.ajax=function(t,e,r){return new Promise(function(s,n){var o=e;"GET"===t&&r&&(o+="?"+d(r));var i=new XMLHttpRequest;i.onload=function(t){this.status>=200&&this.status<300?s(JSON.parse(this.response)):n(Error(this.statusText))},i.onerror=function(){n(Error(this.statusText))},i.open(t,o),i.setRequestHeader("X-Requested-With","XMLHttpRequest"),"GET"===t?i.send():(i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(d(r)))})},o.prototype.get=function(t,e){return this.ajax("GET",t,e)},o.prototype.post=function(t,e){return this.ajax("POST",t,e)},o.prototype.mappings=function(t){return arguments.length?(this._mappings=new n(t),this):this._mappings},o.prototype.proxyMappings=function(t){return arguments.length?(this._proxyMappings=t,this):this._proxyMappings},o.prototype.timeout=function(t){return arguments.length?(this._timeout=t||y,this):this._timeout},i.prototype=Object.create(o.prototype),i.prototype.cacheCalls=function(t){return arguments.length?(this._cacheCalls=t,this):this._cacheCalls},i.prototype.call=function(t,e){var r=this._url+(this._url.indexOf("?")>=0?"&":"?")+d(t);if(this._cacheCalls){var s=this;return new Promise(function(t,s){var n=JSON.parse(localStorage.getItem("hpcc.viz."+r));if(!n)throw Error("not cached");e&&(console.log("Deprecated:  callback, use promise (Basic.prototype.call)"),e(n)),t(n)})["catch"](function(t){return s.get(r).then(function(t){return localStorage.setItem("hpcc.viz."+r,JSON.stringify(t)),e&&(console.log("Deprecated:  callback, use promise (Basic.prototype.call)"),e(t)),t})})}return localStorage.removeItem("hpcc.viz."+r),this.get(r).then(function(t){return e&&(console.log("Deprecated:  callback, use promise (Basic.prototype.call)"),e(t)),t})},h.prototype=Object.create(o.prototype),h.prototype.url=function(t){var e=o.prototype.url.apply(this,arguments);if(arguments.length){this._port="8010"===this._port?"8002":this._port;for(var r in this._params)switch(r){case"QuerySetId":this.target(this._params[r]);break;case"Id":this.query(this._params[r])}var s,n;this._target&&this._query||(s=this._pathname.split("/query/"),s.length>=2&&(n=s[1].split("/"),n.length>=2&&(this.target(n[0]),this.query(n[1]))))}return e},h.prototype.target=function(t){return arguments.length?(this._target=t,this):this._target},h.prototype.query=function(t){return arguments.length?(this._query=t,this):this._query},h.prototype.constructUrl=function(){return o.prototype.getUrl.call(this,{pathname:"WsEcl/submit/query/"+this._target+"/"+this._query+"/json"})},h.prototype.call=function(t,e,s){t=t||{},t.target=t.target||this._target,t.query=t.query||this._query;var n=this,o=this.getUrl({pathname:"WsEcl/submit/query/"+t.target+"/"+t.query+"/json"});return this.jsonp(o,e).then(function(t){var e=a(t);if(e||(e=u(t)),t=e,t.Exception)throw Error(t.Exception.reduce(function(t,e,r,s){return t.length&&(t+="\n"),t+e.Source+" "+e.Code+":  "+e.Message},""));for(var o in t)t[o].Row&&(t[o]=t[o].Row.map(r));return n._mappings.mapResponse(t),s&&(console.log("Deprecated:  callback, use promise (WsECL.prototype.call)"),s(t)),t})},h.prototype.send=function(t,e){return this.call({target:this._target,query:this._query},t,e)},p.prototype=Object.create(o.prototype),p.prototype.url=function(t){var e=o.prototype.url.apply(this,arguments);if(arguments.length){for(var r in this._params)switch(r){case"Wuid":this.wuid(this._params[r]);break;case"ResultName":this.resultName(this._params[r]);break;case"Sequence":this.sequence(this._params[r])}if(!this._wuid){var s=this._url.split("/res/");if(s.length>=2){var n=s[1].split("/");this.wuid(n[0])}}}return e},p.prototype.wuid=function(t){return arguments.length?(this._wuid=t,this):this._wuid},p.prototype.jobname=function(t){return arguments.length?(this._jobname=t,this):this._jobname},p.prototype.sequence=function(t){return arguments.length?(this._sequence=t,this):this._sequence},p.prototype.resultName=function(t){return arguments.length?(this._resultName=t,this):this._resultName},p.prototype.appendParam=function(t,e,r){return e?(r&&(r+="&"),r+t+"="+e):r},p.prototype.constructUrl=function(){var t=o.prototype.getUrl.call(this,{pathname:"WsWorkunits/res/"+this._wuid+"/"}),e="";return e=this.appendParam("ResultName",this._resultName,e),t+(e?"?"+e:"")},p.prototype._fetchResult=function(t,e,s){if(t=t||{},!this._fetchResultPromise[t.resultname]){t._start=t._start||0,t._count=t._count||-1;var n=this.getUrl({pathname:"WsWorkunits/WUResult.json"}),o={Wuid:t.wuid,ResultName:t.resultname,SuppressXmlSchema:!0,Start:t._start,Count:t._count};this._resultNameCache[t.resultname]={};var i=this;this._fetchResultPromise[t.resultname]=this.jsonp(n,o).then(function(n){for(var o in n){if(!n[o].Result)throw"No result found.";i._total=n[o].Total,n=n[o].Result;for(var a in n){n=n[a].Row.map(r);break}break}return i._resultNameCache[t.resultname]=n,s||i._mappings.mapResult(i._resultNameCache,t.resultname),e&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype._fetchResult)"),e(i._resultNameCache[t.resultname])),i._resultNameCache[t.resultname]})}return this._fetchResultPromise[t.resultname]},p.prototype.fetchResult=function(t,e,r){if(t.wuid)return this._fetchResult(t,e,r);if(t.jobname){var s=this;return this.WUQuery(t,function(n){return t.wuid=n[0].Wuid,s._fetchResult(t,e,r)})}},p.prototype.WUQuery=function(e,r){var s=this.getUrl({pathname:"WsWorkunits/WUQuery.json"}),n={Jobname:n.jobname,Count:1};return this._resultNameCache={},this._resultNameCacheCount=0,this.jsonp(s,n).then(function(e){if(!t.exists("WUQueryResponse.Workunits.ECLWorkunit",e))throw"No workunit found.";return e=e.WUQueryResponse.Workunits.ECLWorkunit,r&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.WUQuery)"),r(e)),e})},p.prototype.fetchResultNames=function(e){if(!this._fetchResultNamesPromise){var r=this.getUrl({pathname:"WsWorkunits/WUInfo.json"}),s={Wuid:this._wuid,TruncateEclTo64k:!0,IncludeExceptions:!1,IncludeGraphs:!1,IncludeSourceFiles:!1,IncludeResults:!0,IncludeResultsViewNames:!1,IncludeVariables:!1,IncludeTimers:!1,IncludeResourceURLs:!1,IncludeDebugValues:!1,IncludeApplicationValues:!1,IncludeWorkflows:!1,IncludeXmlSchemas:!1,SuppressResultSchemas:!0};this._resultNameCache={},this._resultNameCacheCount=0;var n=this;this._fetchResultNamesPromise=this.jsonp(r,s).then(function(r){return t.exists("WUInfoResponse.Workunit.Archived",r)&&r.WUInfoResponse.Workunit.Archived&&console.log("WU is archived"),t.exists("WUInfoResponse.Workunit.Results.ECLResult",r)&&r.WUInfoResponse.Workunit.Results.ECLResult.map(function(t){n._resultNameCache[t.Name]=[],++n._resultNameCacheCount}),e&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.fetchResultNames)"),e(n._resultNameCache)),n._resultNameCache})}return this._fetchResultNamesPromise},p.prototype.fetchResults=function(t,e){var r=this;return this.fetchResultNames().then(function(s){var n=[];for(var o in r._resultNameCache)n.push(r.fetchResult({wuid:r._wuid,resultname:o},null,e));return Promise.all(n).then(function(e){return t&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.fetchResults)"),t(r._resultNameCache)),r._resultNameCache})})},p.prototype.postFilter=function(t,e){var r={};for(var s in e)r[s]=e[s].filter(function(e,r){for(var s in t)if(void 0!==e[s]&&void 0!==t[s]&&e[s]!=t[s])return!1;return!0});return this._mappings.mapResponse(r),r},p.prototype.send=function(t,e){var r=this;this._resultNameCacheCount?e(r.postFilter(t,this._resultNameCache)):this.fetchResults(function(s){e(r.postFilter(t,s))},!0)},c.prototype=Object.create(o.prototype),c.prototype.url=function(t){var e=o.prototype.url.apply(this,arguments);if(arguments.length)for(var r in this._params)switch(r){case"WUID":this.wuid(this._params[r])}return e},c.prototype.wuid=function(t){return arguments.length?(this._wuid=t,this):this._wuid},c.prototype.constructUrl=function(){return o.prototype.getUrl.call(this,{pathname:"WsWorkunits/WUGetStats?WUID="+this._wuid})},c.prototype.send=function(e,r){var s=this.getUrl({pathname:"WsWorkunits/WUGetStats.json?WUID="+this._wuid});return this.jsonp(s,e).then(function(e){return t.exists("WUGetStatsResponse.Statistics.WUStatisticItem",e)?(r&&(console.log("Deprecated:  callback, use promise (WsWorkunits_GetStats.prototype.send)"),r(e.WUGetStatsResponse.Statistics.WUStatisticItem)),e.WUGetStatsResponse.Statistics.WUStatisticItem):(r&&(console.log("Deprecated:  callback, use promise (WsWorkunits_GetStats.prototype.send)"),r([])),[])})},l.prototype=Object.create(o.prototype),l.prototype.fetchResults=function(t,e){var s=this.getUrl({});this._resultNameCache={},this._resultNameCacheCount=0;var n=this;return this.jsonp(s,t).then(function(t){var s=a(t);if(s||(s=u(t)),t=s,t.Exception)throw Error(t.Exception.reduce(function(t,e,r,s){return t.length&&(t+="\n"),t+e.Source+" "+e.Code+":  "+e.Message},""));for(var o in t)t[o].Row&&(n._resultNameCache[o]=t[o].Row.map(r),++n._resultNameCacheCount);return e&&(console.log("Deprecated:  callback, use promise (HIPIERoxie.prototype.fetchResults)"),e(n._resultNameCache)),n._resultNameCache})},l.prototype.fetchResult=function(t,e){var r=this;return new Promise(function(s,n){e&&(console.log("Deprecated:  callback, use promise (HIPIERoxie.prototype.fetchResult)"),e(r._resultNameCache[t])),s(r._resultNameCache[t])})},l.prototype.call=function(t,e){return this.fetchResults(t,e)},m.prototype=Object.create(p.prototype),m.prototype.hipieResults=function(t){if(!arguments.length)return this._hipieResults;this._hipieResultsLength=0,this._hipieResults={};var e=this;return t.forEach(function(t){e._hipieResultsLength++,e._hipieResults[t.id]=t}),this},m.prototype.fetchResults=function(t){var e=this;return p.prototype.fetchResultNames.call(this).then(function(r){var s=[];for(var n in e._hipieResults){var o=e._hipieResults[n];s.push(e.fetchResult(o.from))}return Promise.all(s).then(function(r){return t&&(console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.fetchResults)"),t(e._resultNameCache)),e._resultNameCache})})},m.prototype.fetchResult=function(t,e){return p.prototype.fetchResult.call(this,{wuid:this._wuid,resultname:t}).then(function(t){return e&&(console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.fetchResult)"),e(t)),t})},m.prototype.call=function(t,e){function r(t){var e={};for(var r in t)void 0!==t[r]&&void 0!==t[r+"_changed"]&&(e[r]={value:t[r]});var n={};for(var o in s._hipieResults){var i=s._hipieResults[o],a={};for(var u in e)f(i,u)&&(a[u]=e[u],a[u].filter=_(i,u)[0]);n[i.from]=s._resultNameCache[i.from].filter(function(t){for(var e in a)if(!a[e].filter.matches(t,a[e].value))return!1;return!0})}return n}var s=this;return!t.refresh&&this._resultNameCache&&this._resultNameCacheCount?new Promise(function(e,s){e(r(t))}):this.fetchResults(e).then(function(e){return r(t)})},g.prototype=Object.create(m.prototype),g.prototype.databomb=function(t){return arguments.length?(this._databomb=t,this):this._databomb},g.prototype.databombOutput=function(t,e){return arguments.length?(this._resultNameCacheCount++,this._databomb instanceof Array?this._resultNameCache[t]=this._databomb.map(r):this._resultNameCache[t]=this._databomb[e].map(r),this):void 0},g.prototype.fetchResults=function(t){var e=this;return new Promise(function(r,s){t&&(console.log("Deprecated:  callback, use promise (HIPIEDatabomb.prototype.fetchResults)"),t(e._resultNameCache)),r(e._resultNameCache)})},{Basic:i,ESPMappings:n,ESPUrl:s,WsECL:h,WsWorkunits:p,HIPIERoxie:l,HIPIEWorkunit:m,HIPIEDatabomb:g,createESPConnection:function(t){t=t||document.URL;var e=(new s).url(t);return e.isWsWorkunits_GetStats()?(new c).url(t):e.isWsWorkunits()?(new p).url(t):e.isWsEcl()?(new h).url(t):null},hookJsonp:function(t){v=t}}});