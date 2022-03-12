var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function r(e){return"function"==typeof e}function l(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function c(t,...n){if(null==t)return e;const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function s(e){let t;return c(e,(e=>t=e))(),t}function u(e,t,n){e.$$.on_destroy.push(c(t,n))}function i(e,t){e.appendChild(t)}function a(e,t,n){e.insertBefore(t,n||null)}function d(e){e.parentNode.removeChild(e)}function f(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function p(e){return document.createElement(e)}function m(e){return document.createTextNode(e)}function h(){return m(" ")}function $(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function g(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function b(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function v(e,t){e.value=null==t?"":t}function y(e,t,n){e.classList[n?"add":"remove"](t)}let x;function w(e){x=e}function k(){if(!x)throw new Error("Function called outside component initialization");return x}function C(){const e=k();return(t,n)=>{const o=e.$$.callbacks[t];if(o){const r=function(e,t,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(e,n,!1,t),o}(t,n);o.slice().forEach((t=>{t.call(e,r)}))}}}const _=[],E=[],A=[],j=[],q=Promise.resolve();let z=!1;function L(e){A.push(e)}const O=new Set;let P=0;function S(){const e=x;do{for(;P<_.length;){const e=_[P];P++,w(e),M(e.$$)}for(w(null),_.length=0,P=0;E.length;)E.pop()();for(let e=0;e<A.length;e+=1){const t=A[e];O.has(t)||(O.add(t),t())}A.length=0}while(_.length);for(;j.length;)j.pop()();z=!1,O.clear(),w(e)}function M(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(L)}}const N=new Set;let T;function U(){T={r:0,c:[],p:T}}function B(){T.r||o(T.c),T=T.p}function I(e,t){e&&e.i&&(N.delete(e),e.i(t))}function J(e,t,n,o){if(e&&e.o){if(N.has(e))return;N.add(e),T.c.push((()=>{N.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}function F(e){e&&e.c()}function K(e,n,l,c){const{fragment:s,on_mount:u,on_destroy:i,after_update:a}=e.$$;s&&s.m(n,l),c||L((()=>{const n=u.map(t).filter(r);i?i.push(...n):o(n),e.$$.on_mount=[]})),a.forEach(L)}function R(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Z(e,t){-1===e.$$.dirty[0]&&(_.push(e),z||(z=!0,q.then(S)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function D(t,r,l,c,s,u,i,a=[-1]){const f=x;w(t);const p=t.$$={fragment:null,ctx:null,props:u,update:e,not_equal:s,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(f?f.$$.context:[])),callbacks:n(),dirty:a,skip_bound:!1,root:r.target||f.$$.root};i&&i(p.root);let m=!1;if(p.ctx=l?l(t,r.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&s(p.ctx[e],p.ctx[e]=r)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](r),m&&Z(t,e)),n})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!c&&c(p.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);p.fragment&&p.fragment.l(e),e.forEach(d)}else p.fragment&&p.fragment.c();r.intro&&I(t.$$.fragment),K(t,r.target,r.anchor,r.customElement),S()}w(f)}class G{$destroy(){R(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const H="ABCDEFGHIJKLMNOPQRSTUVWXYZ",Q=()=>{const e=[...Array(26).keys()].map((e=>[Math.random(),e])).sort(((e,t)=>e[0]-t[0])).map((e=>e[1]));return e.some(((e,t)=>e==t))?Q():e.map((e=>H[e]))},V=e=>e.replace(/[^\x00-\x7F]+/g,""),W=[];function X(t,n=e){let o;const r=new Set;function c(e){if(l(t,e)&&(t=e,o)){const e=!W.length;for(const e of r)e[1](),W.push(e,t);if(e){for(let e=0;e<W.length;e+=2)W[e][0](W[e+1]);W.length=0}}}return{set:c,update:function(e){c(e(t))},subscribe:function(l,s=e){const u=[l,s];return r.add(u),1===r.size&&(o=n(c)||e),l(t),()=>{r.delete(u),0===r.size&&(o(),o=null)}}}}const Y=X([{id:"",name:"",progress:null,solved:!1,conn:{}}].slice(1)),ee=X(""),te=X(null),ne=X(`person-${parseInt(1e4*Math.random())}`),oe=X(null),re=X(null),le=X(!1),ce=new Map,se=function(t,n,l){const s=!Array.isArray(t),u=s?[t]:t,i=n.length<2;return a=t=>{let l=!1;const a=[];let d=0,f=e;const p=()=>{if(d)return;f();const o=n(s?a[0]:a,t);i?t(o):f=r(o)?o:e},m=u.map(((e,t)=>c(e,(e=>{a[t]=e,d&=~(1<<t),l&&p()}),(()=>{d|=1<<t}))));return l=!0,p(),function(){o(m),f()}},{subscribe:X(l,a).subscribe};var a}([ee,ne,re,le],(([e,t,n,o])=>({id:e,name:t,progress:n,solved:o}))),ue=0,ie=1,ae=2,de=3,fe=new URLSearchParams(location.search).get("game"),pe=null==fe,me=new window.Peer,he=[(e,t)=>{Y.update((n=>[...n,{id:e,name:t.name,progress:null,solved:!1}]))},(e,t)=>{te.set(t.problem)},(e,t)=>{pe&&Y.update((n=>n.map((n=>n.id!==e?n:{...n,name:t.name,progress:t.progress,solved:t.solved}))))},(e,t)=>{if(pe)return;const n=s(ee);Y.set(t.users.filter((e=>e.id!==n)))}],$e=e=>new Promise((t=>{e.on("open",(()=>{var n;e.peer==fe&&oe.set(e),ce.set(e.peer,e),e.on("data",(n=e.peer,e=>{he[e.type]&&he[e.type](n,e)})),e.on("close",(e=>()=>{Y.update((t=>t.filter((t=>t.id!==e)))),ce.delete(e)})(e.peer)),setTimeout((()=>{(e=>{e?.send({type:ue,name:s(ne)})})(e)}),100),t(e)}))})),ge=e=>ce.forEach((t=>t.send(e)));me.on("open",ee.set),me.on("connection",$e);const be=[se.subscribe((e=>{pe?ge({type:de,users:[...s(Y).map((e=>({...e,conn:null}))),e]}):s(oe)?.send({type:ae,name:e.name,progress:e.progress,solved:e.solved})})),te.subscribe((e=>{pe&&ge({type:ie,problem:e})}))];function ve(t){let n,o,r,l,c,s,u;return{c(){n=p("div"),o=p("label"),o.textContent="Username",r=h(),l=p("input"),g(o,"for","username"),g(l,"type","text"),g(l,"id","username"),g(l,"name","username"),l.disabled=c=null!=t[0],g(n,"class","name-chooser svelte-1mwrz3m")},m(e,c){a(e,n,c),i(n,o),i(n,r),i(n,l),v(l,t[1]),s||(u=$(l,"input",t[2]),s=!0)},p(e,[t]){1&t&&c!==(c=null!=e[0])&&(l.disabled=c),2&t&&l.value!==e[1]&&v(l,e[1])},i:e,o:e,d(e){e&&d(n),s=!1,u()}}}function ye(e,t,n){let o,r;return u(e,te,(e=>n(0,o=e))),u(e,ne,(e=>n(1,r=e))),[o,r,function(){r=this.value,ne.set(r)}]}window.$cryptoduel$subscriptions&&window.$cryptoduel$subscriptions.forEach((e=>e())),window.$cryptoduel$subscriptions=be;class xe extends G{constructor(e){super(),D(this,e,ye,ve,l,{})}}function we(t){let n,o,r,l,c,s,u,f,v=t[0]?"Join Link (copied)":"Copy Join Link";return{c(){n=p("div"),o=p("button"),r=m(v),l=h(),c=p("a"),s=m(t[1]),g(o,"class","join-link svelte-vczin0"),g(c,"href",t[1]),g(n,"class","join-links svelte-vczin0")},m(e,d){a(e,n,d),i(n,o),i(o,r),i(n,l),i(n,c),i(c,s),u||(f=$(o,"click",t[2]),u=!0)},p(e,[t]){1&t&&v!==(v=e[0]?"Join Link (copied)":"Copy Join Link")&&b(r,v),2&t&&b(s,e[1]),2&t&&g(c,"href",e[1])},i:e,o:e,d(e){e&&d(n),u=!1,f()}}}function ke(e,t,n){let o,r;u(e,ee,(e=>n(3,r=e)));let l=!1;return e.$$.update=()=>{8&e.$$.dirty&&n(1,o=`${location.href}?game=${encodeURIComponent(r)}`)},[l,o,()=>{navigator.clipboard.writeText(o),n(0,l=!0)},r]}class Ce extends G{constructor(e){super(),D(this,e,ke,we,l,{})}}function _e(e,t,n){const o=e.slice();o[6]=t[n],o[8]=n;const r=o[2][o[8]];return o[1]=r,o}function Ee(e){let t,n,o,r,l,c,s,u,f,v,x=e[6]+"",w=e[1]+"";return{c(){t=p("div"),n=p("div"),o=m(x),r=h(),l=p("div"),c=p("pre"),s=m(w),u=h(),g(n,"class","cipher-letter svelte-1x2ot2m"),g(l,"class","decrypted-letter svelte-1x2ot2m"),g(l,"tabindex","0"),y(l,"non-alphabetic",null===e[1]),g(t,"class","plain-encrypt-pair svelte-1x2ot2m")},m(d,p){a(d,t,p),i(t,n),i(n,o),i(t,r),i(t,l),i(l,c),i(c,s),i(t,u),f||(v=$(l,"keydown",e[3](e[8])),f=!0)},p(t,n){e=t,1&n&&x!==(x=e[6]+"")&&b(o,x),4&n&&w!==(w=e[1]+"")&&b(s,w),4&n&&y(l,"non-alphabetic",null===e[1])},d(e){e&&d(t),f=!1,v()}}}function Ae(t){let n,o=t[0],r=[];for(let e=0;e<o.length;e+=1)r[e]=Ee(_e(t,o,e));return{c(){n=p("div");for(let e=0;e<r.length;e+=1)r[e].c();g(n,"class","word svelte-1x2ot2m")},m(e,t){a(e,n,t);for(let e=0;e<r.length;e+=1)r[e].m(n,null)},p(e,[t]){if(13&t){let l;for(o=e[0],l=0;l<o.length;l+=1){const c=_e(e,o,l);r[l]?r[l].p(c,t):(r[l]=Ee(c),r[l].c(),r[l].m(n,null))}for(;l<r.length;l+=1)r[l].d(1);r.length=o.length}},i:e,o:e,d(e){e&&d(n),f(r,e)}}}function je(e,t,n){let o,{word:r=""}=t,{replacement:l=Array(26).fill("")}=t;const c=C();return e.$$set=e=>{"word"in e&&n(0,r=e.word),"replacement"in e&&n(1,l=e.replacement)},e.$$.update=()=>{3&e.$$.dirty&&n(2,o=((e,t)=>[...e].map((e=>{const n=H.indexOf(e);return-1===n?null:t[n]})))(r,l))},[r,l,o,e=>t=>{c("replace",{from:r[e],to:t.key.toUpperCase()})}]}class qe extends G{constructor(e){super(),D(this,e,je,Ae,l,{word:0,replacement:1})}}function ze(e,t,n){const o=e.slice();return o[9]=t[n],o}function Le(e){let t,n;return t=new qe({props:{word:e[9],replacement:e[1]}}),t.$on("replace",e[5]),{c(){F(t.$$.fragment)},m(e,o){K(t,e,o),n=!0},p(e,n){const o={};8&n&&(o.word=e[9]),2&n&&(o.replacement=e[1]),t.$set(o)},i(e){n||(I(t.$$.fragment,e),n=!0)},o(e){J(t.$$.fragment,e),n=!1},d(e){R(t,e)}}}function Oe(e){let t,n,o,r,l,c,s=e[0].author+"",u=e[3],$=[];for(let t=0;t<u.length;t+=1)$[t]=Le(ze(e,u,t));const v=e=>J($[e],1,1,(()=>{$[e]=null}));return{c(){t=p("p"),n=m("Solve this quote by "),o=m(s),r=h(),l=p("div");for(let e=0;e<$.length;e+=1)$[e].c();g(t,"class","svelte-xqyi96"),g(l,"class","cryptogram svelte-xqyi96"),y(l,"solved",e[2])},m(e,s){a(e,t,s),i(t,n),i(t,o),a(e,r,s),a(e,l,s);for(let e=0;e<$.length;e+=1)$[e].m(l,null);c=!0},p(e,[t]){if((!c||1&t)&&s!==(s=e[0].author+"")&&b(o,s),26&t){let n;for(u=e[3],n=0;n<u.length;n+=1){const o=ze(e,u,n);$[n]?($[n].p(o,t),I($[n],1)):($[n]=Le(o),$[n].c(),I($[n],1),$[n].m(l,null))}for(U(),n=u.length;n<$.length;n+=1)v(n);B()}4&t&&y(l,"solved",e[2])},i(e){if(!c){for(let e=0;e<u.length;e+=1)I($[e]);c=!0}},o(e){$=$.filter(Boolean);for(let e=0;e<$.length;e+=1)J($[e]);c=!1},d(e){e&&d(t),e&&d(r),e&&d(l),f($,e)}}}function Pe(e,t,n){let o,r,{problem:l=null}=t;const c=C();let s=Array(26).fill("");const u=({from:e,to:t})=>{if((1!=t.length||!/[a-zA-Z]/.test(t))&&"BACKSPACE"!==t)return;const o=[...s];o[H.indexOf(e)]="BACKSPACE"==t?"":t,n(1,s=o)},i=(e,t)=>[...t].map((t=>H.includes(t)&&""!==e[H.indexOf(t)]));return e.$$set=e=>{"problem"in e&&n(0,l=e.problem)},e.$$.update=()=>{1&e.$$.dirty&&n(1,s=Array(26).fill("")),1&e.$$.dirty&&n(3,o=(e=>[...e.split(/\s+/g)])(l.ciphertext)),3&e.$$.dirty&&n(2,r=((e,t)=>!!t&&[...t.ciphertext].every(((n,o)=>!H.includes(n)||t.plaintext[o]===e[H.indexOf(n)])))(s,l)),4&e.$$.dirty&&r&&c("solved"),3&e.$$.dirty&&c("progress",{progress:i(s,l.ciphertext)}),e.$$.dirty},[l,s,r,o,u,e=>u(e.detail)]}class Se extends G{constructor(e){super(),D(this,e,Pe,Oe,l,{problem:0})}}function Me(e,t,n){const o=e.slice();return o[3]=t[n],o}function Ne(e,t,n){const o=e.slice();return o[6]=t[n],o}function Te(e){let t;return{c(){t=p("div"),g(t,"class","progress-item svelte-127q1j8"),y(t,"has-done",e[6])},m(e,n){a(e,t,n)},p(e,n){3&n&&y(t,"has-done",e[6])},d(e){e&&d(t)}}}function Ue(e){let t,n,o,r,l,c,s,u=e[3].name+"",$=e[3].progress??e[0],v=[];for(let t=0;t<$.length;t+=1)v[t]=Te(Ne(e,$,t));return{c(){t=p("div"),n=p("p"),o=m(u),r=m(":"),l=h(),c=p("div");for(let e=0;e<v.length;e+=1)v[e].c();s=h(),g(c,"class","opponent-progress svelte-127q1j8"),g(t,"class","user-container svelte-127q1j8"),y(t,"solved",e[3].solved)},m(e,u){a(e,t,u),i(t,n),i(n,o),i(n,r),i(t,l),i(t,c);for(let e=0;e<v.length;e+=1)v[e].m(c,null);i(t,s)},p(e,n){if(2&n&&u!==(u=e[3].name+"")&&b(o,u),3&n){let t;for($=e[3].progress??e[0],t=0;t<$.length;t+=1){const o=Ne(e,$,t);v[t]?v[t].p(o,n):(v[t]=Te(o),v[t].c(),v[t].m(c,null))}for(;t<v.length;t+=1)v[t].d(1);v.length=$.length}2&n&&y(t,"solved",e[3].solved)},d(e){e&&d(t),f(v,e)}}}function Be(t){let n,o=t[1],r=[];for(let e=0;e<o.length;e+=1)r[e]=Ue(Me(t,o,e));return{c(){n=p("div");for(let e=0;e<r.length;e+=1)r[e].c();g(n,"class","opponent-progress-container svelte-127q1j8")},m(e,t){a(e,n,t);for(let e=0;e<r.length;e+=1)r[e].m(n,null)},p(e,[t]){if(3&t){let l;for(o=e[1],l=0;l<o.length;l+=1){const c=Me(e,o,l);r[l]?r[l].p(c,t):(r[l]=Ue(c),r[l].c(),r[l].m(n,null))}for(;l<r.length;l+=1)r[l].d(1);r.length=o.length}},i:e,o:e,d(e){e&&d(n),f(r,e)}}}function Ie(e,t,n){let o,r,l;return u(e,te,(e=>n(2,r=e))),u(e,Y,(e=>n(1,l=e))),e.$$.update=()=>{4&e.$$.dirty&&n(0,o=null===r?[]:[...r.ciphertext].map((e=>!1)))},[o,l,r]}class Je extends G{constructor(e){super(),D(this,e,Ie,Be,l,{})}}function Fe(t){let n,o={ctx:t,current:null,token:null,hasCatch:!1,pending:De,then:Ze,catch:Re,value:8};var r;return function(e,t){const n=t.token={};function o(e,o,r,l){if(t.token!==n)return;t.resolved=l;let c=t.ctx;void 0!==r&&(c=c.slice(),c[r]=l);const s=e&&(t.current=e)(c);let u=!1;t.block&&(t.blocks?t.blocks.forEach(((e,n)=>{n!==o&&e&&(U(),J(e,1,1,(()=>{t.blocks[n]===e&&(t.blocks[n]=null)})),B())})):t.block.d(1),s.c(),I(s,1),s.m(t.mount(),t.anchor),u=!0),t.block=s,t.blocks&&(t.blocks[o]=s),u&&S()}if((r=e)&&"object"==typeof r&&"function"==typeof r.then){const n=k();if(e.then((e=>{w(n),o(t.then,1,t.value,e),w(null)}),(e=>{if(w(n),o(t.catch,2,t.error,e),w(null),!t.hasCatch)throw e})),t.current!==t.pending)return o(t.pending,0),!0}else{if(t.current!==t.then)return o(t.then,1,t.value,e),!0;t.resolved=e}var r}((r=fe,new Promise((e=>{const t=ee.subscribe((n=>{if(""===n)return;const o=me.connect(r);t(),$e(o).then(e)}))}))),o),{c(){n=m(""),o.block.c()},m(e,t){a(e,n,t),o.block.m(e,o.anchor=t),o.mount=()=>n.parentNode,o.anchor=n},p(e,n){!function(e,t,n){const o=t.slice(),{resolved:r}=e;e.current===e.then&&(o[e.value]=r),e.current===e.catch&&(o[e.error]=r),e.block.p(o,n)}(o,t=e,n)},i:e,o:e,d(e){e&&d(n),o.block.d(e),o.token=null,o=null}}}function Ke(t){let n,o;return n=new Ce({}),{c(){F(n.$$.fragment)},m(e,t){K(n,e,t),o=!0},p:e,i(e){o||(I(n.$$.fragment,e),o=!0)},o(e){J(n.$$.fragment,e),o=!1},d(e){R(n,e)}}}function Re(t){return{c:e,m:e,p:e,d:e}}function Ze(t){let n;return{c(){n=p("p"),n.textContent=`Successfully connected to ${fe}`},m(e,t){a(e,n,t)},p:e,d(e){e&&d(n)}}}function De(t){let n;return{c(){n=p("p"),n.textContent=`Connecting to ${fe}`},m(e,t){a(e,n,t)},p:e,d(e){e&&d(n)}}}function Ge(e){let t,n,o,r;return t=new Je({}),o=new Se({props:{problem:e[0]}}),o.$on("progress",e[4]),o.$on("solved",e[5]),{c(){F(t.$$.fragment),n=h(),F(o.$$.fragment)},m(e,l){K(t,e,l),a(e,n,l),K(o,e,l),r=!0},p(e,t){const n={};1&t&&(n.problem=e[0]),o.$set(n)},i(e){r||(I(t.$$.fragment,e),I(o.$$.fragment,e),r=!0)},o(e){J(t.$$.fragment,e),J(o.$$.fragment,e),r=!1},d(e){R(t,e),e&&d(n),R(o,e)}}}function He(t){let n,o,r,l,c,s,u,f;const m=[Ke,Fe],b=[];o=pe?0:1,r=b[o]=m[o](t),c=new xe({});let v=t[0]&&Ge(t),y=pe&&function(t){let n,o,r;return{c(){n=p("button"),n.textContent="New Problem",g(n,"class","svelte-k72zdo")},m(e,l){a(e,n,l),o||(r=$(n,"click",t[1]),o=!0)},p:e,d(e){e&&d(n),o=!1,r()}}}(t);return{c(){n=p("main"),r.c(),l=h(),F(c.$$.fragment),s=h(),v&&v.c(),u=h(),y&&y.c(),g(n,"class","svelte-k72zdo")},m(e,t){a(e,n,t),b[o].m(n,null),i(n,l),K(c,n,null),i(n,s),v&&v.m(n,null),i(n,u),y&&y.m(n,null),f=!0},p(e,[t]){r.p(e,t),e[0]?v?(v.p(e,t),1&t&&I(v,1)):(v=Ge(e),v.c(),I(v,1),v.m(n,u)):v&&(U(),J(v,1,1,(()=>{v=null})),B()),pe&&y.p(e,t)},i(e){f||(I(r),I(c.$$.fragment,e),I(v),f=!0)},o(e){J(r),J(c.$$.fragment,e),J(v),f=!1},d(e){e&&d(n),b[o].d(),R(c),v&&v.d(),y&&y.d()}}}function Qe(e,t,n){let o,r,l;u(e,Y,(e=>n(2,o=e))),u(e,ee,(e=>n(3,r=e))),u(e,te,(e=>n(0,l=e)));const c=(()=>{const e=fetch(`./quotes/${parseInt(8*Math.random())}.json`).then((e=>e.json()));return async()=>{const t=await e,n=t[parseInt(Math.random()*t.length)];return{author:n.quoteAuthor,text:V(n.quoteText)}}})();return e.$$.update=()=>{e.$$.dirty,e.$$.dirty},[l,()=>{c().then((e=>te.set((e=>{const t=e.text.toUpperCase(),n=Q(),o=[...t].map((e=>n[H.indexOf(e)]??e)).join("");return{...e,plaintext:t,ciphertext:o}})(e))))},o,r,e=>re.set(e.detail.progress),()=>le.set(!0)]}const Ve=new class extends G{constructor(e){super(),D(this,e,Qe,He,l,{})}}({target:document.body,props:{name:"world"}});return"undefined"!=typeof module&&module.hot&&("undefined"!=typeof module&&module.hot.dispose((()=>{Ve.$destroy()})),"undefined"!=typeof module&&module.hot.accept()),Ve}();
//# sourceMappingURL=bundle.js.map
