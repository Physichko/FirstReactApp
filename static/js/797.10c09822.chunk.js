"use strict";(self.webpackChunkitkamasutra=self.webpackChunkitkamasutra||[]).push([[797],{6370:function(r,n,e){e.d(n,{Z:function(){return c}});var t=e(5987),i="FormControl_formControl__GJ1Si",o="FormControl_error__ERU1W",s=e(415),a=e(184),u=["field","form"],c=function(r){var n=r.field,e=r.form,c=e.touched,l=e.errors,d=(0,t.Z)(r,u),f=0!==Object.keys(l).length,m=0!==Object.keys(c).length,h=!1;f&&("undefined"!==typeof l[n.name]&&m&&"undefined"!==typeof c[n.name]&&(h=0!==Object.keys(l[n.name]).length));var j=h?"".concat(i," ").concat(o):"".concat(i);return(0,a.jsxs)("div",{className:j,children:[(0,a.jsx)("div",{children:d.children}),h&&(0,a.jsx)(s.q,{errors:l[n.name]})]})}},980:function(r,n,e){e.d(n,{Z:function(){return s}});var t=e(8683),i=e(6370),o=e(184),s=function(r){return(0,o.jsx)(i.Z,(0,t.Z)((0,t.Z)({},r),{},{children:(0,o.jsx)("input",(0,t.Z)((0,t.Z)({},r.field),r))}))}},415:function(r,n,e){e.d(n,{q:function(){return o}});var t="ValidationErrors_errorMessage__xhD88",i=e(184),o=function(r){var n=r.errors,e=[];for(var o in n)e.push(n[o]);return(0,i.jsx)("div",{children:e.map((function(r){return(0,i.jsx)("div",{className:t,children:r})}))})}},6797:function(r,n,e){e.r(n);var t=e(5705),i=e(980),o=e(5227),s=e(6652),a=e(1649),u=e(8687),c=e(7561),l=e(7689),d=e(415),f=e(184),m=(0,a.d)(50),h=[s.n,m],j=function(r){return(0,f.jsx)(t.J9,{initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(n,e){r.loginCredentialsThunkCreator(n.email,n.password,n.rememberMe,e.setErrors),e.resetForm()},children:function(r){return(0,f.jsxs)(t.l0,{children:[(0,f.jsx)(t.gN,{placeholder:"email",type:"email",name:"email",component:i.Z,validate:(0,o.$)(h)}),(0,f.jsx)(t.gN,{placeholder:"password",type:"password",name:"password",component:i.Z,validate:(0,o.$)(h)}),(0,f.jsx)(t.gN,{component:i.Z,name:"rememberMe",type:"checkbox"})," remember me",(0,f.jsx)("button",{type:"submit",children:"login"}),r.errors.apiErrors?(0,f.jsx)(d.q,{errors:r.errors}):(0,f.jsx)(f.Fragment,{})]})}})};n.default=(0,u.$j)((function(r){return{isAuth:r.auth.isAuthorized}}),{loginCredentialsThunkCreator:c.Ew})((function(r){return r.isAuth?(0,f.jsx)(l.Fg,{to:"/profile"}):(0,f.jsxs)("div",{children:[(0,f.jsx)("h1",{children:"LOGIN"}),(0,f.jsx)(j,{loginCredentialsThunkCreator:r.loginCredentialsThunkCreator})]})}))},5227:function(r,n,e){e.d(n,{$:function(){return t}});var t=function(r){return function(n){for(var e={},t=0;t<r.length;t++){var i=r[t](n);if(i)e[i.split(" ").join("")]=i}return Object.keys(e).length>0?e:void 0}}},6652:function(r,n,e){e.d(n,{n:function(){return t}});var t=function(r){if(!r)return"Value is required"}},1649:function(r,n,e){e.d(n,{d:function(){return t}});var t=function(r){return function(n){if(n.length>r)return"Max length is ".concat(r," symbols")}}}}]);
//# sourceMappingURL=797.10c09822.chunk.js.map