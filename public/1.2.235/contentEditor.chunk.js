"use strict";(self.webpackChunkunlayer=self.webpackChunkunlayer||[]).push([[688],{88343:function(e,t,n){n.r(t);var r,o=n(27378),a=n(80715),c=n(83573),l=n(73355),i=n(8441),u=n(60042),s=n.n(u),f=n(29902),m=n(13652),d=n(76136),g=n(38549);function p(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var y=o.memo((function(e){var t=e.children,n=e.type,r=e.contentVersion,i=e.mergeTagGroup,u=e.mergeTagRule,v=e.fullScreen,y=void 0!==v&&v,b=e.displayMode,C=e.inline,T=e.fixedToolbarContainer,h=e.autoFocus,S=e.trackKeystrokes,A=e.onSettings,k=e.onInit,E=e.onFormatContent,x=e.onChange,M=(0,g.Z)(),j=(0,a.I0)(),L=(0,a.v9)(f.wl.allowCustomFonts),F=(0,a.v9)(f.wl.getAppearance),I=(0,a.v9)(f.wl.getLocale),N=(0,a.v9)(f.wl.getTextDirection),R=(0,a.v9)(f.wl.getMergeTags),O=(0,a.v9)(f.wl.getMergeTagsConfig),Z=(0,a.v9)(f.wl.getColors),_=(0,a.v9)(f.wl.getSyncVersion),D=(0,c.Z)(),q=(0,o.useRef)(null),z=(0,o.useRef)(void 0),B=(0,o.useRef)(),G=(0,d.p)(x);function H(e){if(G.current){null==E||E(e);var t=(0,m.L5)(e);t!==B.current&&(G.current(t,e),B.current=t)}}var K=M.hasCallback("mergeTag");(0,o.useEffect)((function(){var e={};(0,m.j_)(e,{type:n,fullScreen:y}),(0,m.Kj)(e,{recentColors:Z}),(0,m.b4)(e,{type:n,fullScreen:y,displayMode:b,textDirection:N}),(0,m.bl)(e,{fullScreen:y,displayMode:b}),(0,m.Ze)(e),(0,m.ZX)(e,{type:n,mergeTags:R,mergeTagGroup:i,mergeTagRule:u,mergeTagsConfig:O,hasMergeTagCallback:K,intl:D}),(0,m.hR)(e,{allowCustomFonts:L}),(0,m.vf)(e,{locale:I}),(0,m.al)(e,{textDirection:N}),(0,m.eE)(e,{appearance:F}),A&&A(e);var t=q.current.querySelector(".editable")||q.current;C&&(e.inline=!0),T&&(e.fixed_toolbar_container=T),e.init_instance_callback=function(e){var t;h&&e.focus(!1),k&&k(e),null===(t=q.current)||void 0===t||t.classList.add("loaded")},e.setup=function(t){var n=["blur","change","focusout"];t.on("BeforeExecCommand",(function(e){-1!==["mceToggleFormat","mceApplyTextcolor","mceRemoveTextcolor","FontName","FontSize","mceInsertLink"].indexOf(e.command)&&p(t.getBody().querySelectorAll(".mceNonEditable")).map((function(e){e.setAttribute("contenteditable",null)}))})),t.on("ExecCommand",(function(e){p(t.getBody().querySelectorAll(".mceNonEditable")).map((function(e){e.setAttribute("contenteditable",!1)}))})),S&&n.push("keyup"),t.on(n.join(" "),(function(){H(t)})),t.on("click",(function(){var e=t.selection.getNode();e.outerHTML.startsWith("<code")&&e.outerHTML.includes('data-type="merge-tag"')&&t.selection.select(e)})),t.on("TextColorChange",(function(t){var n="".concat((null==t?void 0:t.color)||"").trim().toLowerCase();n&&((e.color_map||[]).some((function(e,t){return t%2==0&&!(n!=="".concat(e||"").trim().toLowerCase())}))||setTimeout((function(){j(f.Nw.saveColor(n))}),100))}))},z.current&&z.current.remove();var r=f.h.getState(),o=f.wl.getCurrentSelection(r),a=f.wl.getDesignUI(r);(null!=o&&o.active||"classic"===a)&&(z.current=l.Z.EditorManager.createEditor(t,e),z.current.render())}),[K,i,u,Z]),(0,o.useEffect)((function(){return function(){z.current&&(H(z.current),z.current.destroy())}}),[]),(0,o.useLayoutEffect)((function(){z.current&&H(z.current)}),[_,r]);var P=e.id,U=e.className,V=e.style;return o.createElement(w.Container,{id:P,className:s()("content-editor-container",U),style:V,ref:q},t)}));t.default=y;var b,C,w={Container:i.ZP.div(r||(b=["\n    a {\n      pointer-events: none !important;\n\n      code[data-type='merge-tag'] {\n        pointer-events: all !important;\n      }\n    }\n  "],C||(C=b.slice(0)),r=Object.freeze(Object.defineProperties(b,{raw:{value:Object.freeze(C)}}))))}}}]);