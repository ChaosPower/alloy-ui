/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.6.0
build: 3.6.0
*/
YUI.add("router",function(b){var g=b.HistoryHash,d=b.QueryString,h=b.Array,f=b.config.win,a=[],i=[],e="ready";function c(){c.superclass.constructor.apply(this,arguments);}b.Router=b.extend(c,b.Base,{_regexPathParam:/([:*])([\w\-]+)?/g,_regexUrlQuery:/\?([^#]*).*$/,_regexUrlOrigin:/^(?:[^\/#?:]+:\/\/|\/\/)[^\/]*/,initializer:function(k){var j=this;j._html5=j.get("html5");j._routes=[];j._url=j._getURL();j._setRoutes(k&&k.routes?k.routes:j.get("routes"));if(j._html5){j._history=new b.HistoryHTML5({force:true});j._historyEvents=b.after("history:change",j._afterHistoryChange,j);}else{j._historyEvents=b.on("hashchange",j._afterHistoryChange,f,j);}j.publish(e,{defaultFn:j._defReadyFn,fireOnce:true,preventable:false});j.once("initializedChange",function(){b.once("load",function(){setTimeout(function(){j.fire(e,{dispatched:!!j._dispatched});},20);});});a.push(this);},destructor:function(){var j=b.Array.indexOf(a,this);if(j>-1){a.splice(j,1);}this._historyEvents&&this._historyEvents.detach();},dispatch:function(){this.once(e,function(){this._ready=true;if(this._html5&&this.upgrade()){return;}else{this._dispatch(this._getPath(),this._getURL());}});return this;},getPath:function(){return this._getPath();},hasRoute:function(j){var k;if(!this._hasSameOrigin(j)){return false;}if(!this._html5){j=this._upgradeURL(j);}k=this.removeQuery(this.removeRoot(j));return !!this.match(k).length;},match:function(j){return h.filter(this._routes,function(k){return j.search(k.regex)>-1;});},removeRoot:function(k){var j=this.get("root");k=k.replace(this._regexUrlOrigin,"");if(j&&k.indexOf(j)===0){k=k.substring(j.length);}return k.charAt(0)==="/"?k:"/"+k;},removeQuery:function(j){return j.replace(/\?.*$/,"");},replace:function(j){return this._queue(j,true);},route:function(k,l){var j=[];this._routes.push({callback:l,keys:j,path:k,regex:this._getRegex(k,j)});return this;},save:function(j){return this._queue(j);},upgrade:function(){if(!this._html5){return false;}var j=this._getHashPath();if(j){this.once(e,function(){this.replace(j);});return true;}return false;},_decode:function(j){return decodeURIComponent(j.replace(/\+/g," "));},_dequeue:function(){var j=this,k;if(!YUI.Env.windowLoaded){b.once("load",function(){j._dequeue();});return this;}k=i.shift();return k?k():this;},_dispatch:function(o,l,p){var k=this,j=k.match(o),n,m;k._dispatching=k._dispatched=true;if(!j||!j.length){k._dispatching=false;return k;}n=k._getRequest(o,l,p);m=k._getResponse(n);n.next=function(r){var t,s,q;if(r){b.error(r);}else{if((q=j.shift())){s=q.regex.exec(o);t=typeof q.callback==="string"?k[q.callback]:q.callback;if(s.length===q.keys.length+1){n.params=h.hash(q.keys,s.slice(1));}else{n.params=s.concat();}n.pendingRoutes=j.length;t.call(k,n,m,n.next);}}};n.next();k._dispatching=false;return k._dequeue();},_getHashPath:function(j){j||(j=g.getHash());if(j&&j.charAt(0)==="/"){return this._joinURL(j);}return"";},_getOrigin:function(){var j=b.getLocation();return j.origin||(j.protocol+"//"+j.host);},_getPath:function(){var j=(!this._html5&&this._getHashPath())||b.getLocation().pathname;return this.removeQuery(this.removeRoot(j));},_getPathRoot:function(){var k="/",l=b.getLocation().pathname,j;if(l.charAt(l.length-1)===k){return l;}j=l.split(k);j.pop();return j.join(k)+k;},_getQuery:function(){var j=b.getLocation(),l,k;if(this._html5){return j.search.substring(1);}l=g.getHash();k=l.match(this._regexUrlQuery);return l&&k?k[1]:j.search.substring(1);},_getRegex:function(k,j){if(k instanceof RegExp){return k;}if(k==="*"){return(/.*/);}k=k.replace(this._regexPathParam,function(m,l,n){if(!n){return l==="*"?".*":m;}j.push(n);return l==="*"?"(.*?)":"([^/#?]*)";});return new RegExp("^"+k+"$");},_getRequest:function(k,j,l){return{path:k,query:this._parseQuery(this._getQuery()),url:j,src:l};},_getResponse:function(k){var j=function(){return k.next.apply(this,arguments);};j.req=k;return j;},_getRoutes:function(){return this._routes.concat();},_getURL:function(){return b.getLocation().toString();},_hasSameOrigin:function(k){var j=((k&&k.match(this._regexUrlOrigin))||[])[0];if(j&&j.indexOf("//")===0){j=b.getLocation().protocol+j;}return !j||j===this._getOrigin();},_joinURL:function(k){var j=this.get("root");k=this.removeRoot(k);if(k.charAt(0)==="/"){k=k.substring(1);}return j&&j.charAt(j.length-1)==="/"?j+k:j+"/"+k;},_normalizePath:function(r){var o="..",j="/",k,n,q,l,m,p;if(!r||r===j){return j;}l=r.split(j);p=[];for(k=0,n=l.length;k<n;++k){m=l[k];if(m===o){p.pop();}else{if(m){p.push(m);}}}q=j+p.join(j);if(q!==j&&r.charAt(r.length-1)===j){q+=j;}return q;},_parseQuery:d&&d.parse?d.parse:function(m){var n=this._decode,p=m.split("&"),l=0,k=p.length,j={},o;for(;l<k;++l){o=p[l].split("=");if(o[0]){j[n(o[0])]=n(o[1]||"");}}return j;},_queue:function(){var k=arguments,j=this;i.push(function(){if(j._html5){if(b.UA.ios&&b.UA.ios<5){j._save.apply(j,k);}else{setTimeout(function(){j._save.apply(j,k);},1);}}else{j._dispatching=true;j._save.apply(j,k);}return j;});return !this._dispatching?this._dequeue():this;},_resolvePath:function(j){if(!j){return b.getLocation().pathname;}if(j.charAt(0)!=="/"){j=this._getPathRoot()+j;}return this._normalizePath(j);},_resolveURL:function(l){var p=l&&l.match(this._regexURL),k,o,m,n,j;if(!p){return this._getURL();}k=p[1];o=p[2];m=p[3];n=p[4];if(k){if(k.indexOf("//")===0){k=b.getLocation().protocol+k;}return k+(o||"/")+(m||"")+(n||"");}j=this._getOrigin()+this._resolvePath(o);if(o||m){return j+(m||"")+(n||"");}m=this._getQuery();return j+(m?("?"+m):"")+(n||"");},_save:function(l,m){var k=typeof l==="string",n,j;if(k&&!this._hasSameOrigin(l)){b.error("Security error: The new URL must be of the same origin as the current URL.");return this;}k&&(l=this._joinURL(l));this._ready=true;if(this._html5){this._history[m?"replace":"add"](null,{url:l});}else{n=b.getLocation().pathname;j=this.get("root");if(j===n||j===this._getPathRoot()){l=this.removeRoot(l);}if(l===g.getHash()){b.Router.dispatch();}else{g[m?"replaceHash":"setHash"](l);}}return this;},_setRoutes:function(j){this._routes=[];
h.each(j,function(k){this.route(k.path,k.callback);},this);return this._routes.concat();},_upgradeURL:function(k){if(!this._hasSameOrigin(k)){return k;}var m=(k.match(/#(.*)$/)||[])[1]||"",j=b.HistoryHash.hashPrefix,l;if(j&&m.indexOf(j)===0){m=m.replace(j,"");}m&&(l=this._getHashPath(m));if(l){return this._resolveURL(l);}return k;},_afterHistoryChange:function(l){var j=this,n=l.src,k=j._url,m=j._getURL();j._url=m;if(n==="popstate"&&(!j._ready||k.replace(/#.*$/,"")===m.replace(/#.*$/,""))){return;}j._dispatch(j._getPath(),m,n);},_defReadyFn:function(j){this._ready=true;}},{NAME:"router",ATTRS:{html5:{valueFn:function(){return b.Router.html5;},writeOnce:"initOnly"},root:{value:""},routes:{value:[],getter:"_getRoutes",setter:"_setRoutes"}},html5:b.HistoryBase.html5&&(!b.UA.android||b.UA.android>=3),_instances:a,dispatch:function(){var l,j,k;for(l=0,j=a.length;l<j;l+=1){k=a[l];if(k){k._dispatch(k._getPath(),k._getURL());}}}});b.Controller=b.Router;},"3.6.0",{optional:["querystring-parse"],requires:["array-extras","base-build","history"]});