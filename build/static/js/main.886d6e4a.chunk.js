(this.webpackJsonpcustomerexpnodeweb=this.webpackJsonpcustomerexpnodeweb||[]).push([[0],{182:function(e,t,a){e.exports=a.p+"static/media/banner.0a9a5ccd.jpg"},184:function(e,t,a){e.exports=a.p+"static/media/tinnat-logo.4d7196b3.png"},185:function(e,t,a){e.exports=a.p+"static/media/tshirt.9e44ceb5.jpg"},188:function(e,t,a){e.exports=a(407)},207:function(e,t){},209:function(e,t){},239:function(e,t){},240:function(e,t){},284:function(e,t){},286:function(e,t){},309:function(e,t){},400:function(e,t,a){},401:function(e,t,a){},402:function(e,t,a){},407:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(181),i=a(73),o=a(24),s=a(25),l=a(27),u=a(26),m=a(28),d=a(37),p=a(182),f=a.n(p),E=function(){return c.a.createElement("div",{className:"in-content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("img",{width:"100%",src:f.a})))},h=a(183),v=a.n(h),N=a(71),b=a.n(N),g=a(72),O=function(){return v.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){b()({uri:g.production.api.v1_get_featured_products.uri,method:"GET",headers:{"X-TINNAT-SECURITY-CONTEXT":JSON.stringify({userId:"admin",key:"tinnat"})}},(function(t,a,n){n=JSON.parse(n||"{}"),console.log(JSON.stringify(n)),n&&n.featured?e(n.featured):e([])}))})));case 1:case"end":return e.stop()}}))},w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={featured:[]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;O().then((function(t){return e.setState({featured:t})}))}},{key:"render",value:function(){return c.a.createElement("div",{className:"in-content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"content-header"},c.a.createElement("span",{className:"header-large"},"Featured Products")),c.a.createElement("div",{className:"in-content-wrapper"},this.state.featured.map((function(e,t){return c.a.createElement("div",{onClick:function(){return window.open("/product/".concat(e.id))},key:t,className:"l-item"},c.a.createElement("div",{className:"p-widget"},c.a.createElement("img",{src:e.picture_links[0],height:"200px",width:"200px"}),c.a.createElement("div",{className:"p-widget-header"},e.name),c.a.createElement("div",{className:"p-widget-info"},e.cost.currency," ",e.cost.amount)))})),0===this.state.featured.length&&c.a.createElement("div",null," There are no featured products"),c.a.createElement("div",{className:"clear"}))))}}]),t}(n.Component),y=function(){return c.a.createElement("div",{className:"content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"header"},c.a.createElement("span",{className:"header-large"},"Welcome to ",c.a.createElement("span",{className:"highlight-text"},"T"),"he ",c.a.createElement("span",{className:"highlight-text"},"INN"),"ovative ",c.a.createElement("span",{className:"highlight-text"},"AT"),"tire")),c.a.createElement("div",{className:"text-content"},"Tinnat.com, a.k.a The Innovative Attire is an innovative e-commerce website built in and for Indian customers with love. Shop for T-shirts, Jeans, Accessories and many other stuffs for the best prices and quality.")))},_=function(){return c.a.createElement("div",null,c.a.createElement(E,null),c.a.createElement(w,null),c.a.createElement(y,null))},k=a(184),T=a.n(k),j=(a(400),function(e){function t(e){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"header-content-wrapper"},c.a.createElement("div",{className:"header-content"},c.a.createElement("div",{onClick:function(){return window.location="/"},className:"logo"},c.a.createElement("img",{src:T.a,height:"45px",width:"80px"})),c.a.createElement("div",{className:"menu"},c.a.createElement("div",{onClick:function(){return window.location="/"},className:"menu-item"},"Home"),c.a.createElement("div",{onClick:function(){return window.location="/about"},className:"menu-item"},"About"),c.a.createElement("div",{onClick:function(){return window.location="/products"},className:"menu-item"},"Products"),c.a.createElement("div",{onClick:function(){return window.location="/contact"},className:"menu-item"},"Help"),c.a.createElement("div",{onClick:function(){return window.location="/contact"},className:"menu-item"},"Contact"),c.a.createElement("div",{onClick:function(){return window.location="/contact"},className:"menu-item"},c.a.createElement("i",{className:"material-icons"},"add_shopping_cart"),"\xa0 (0)"),c.a.createElement("div",{className:"clear"})),c.a.createElement("div",{className:"clear"})))}}]),t}(n.Component)),x=(a(401),function(e){return c.a.createElement("div",{className:"footer"},"\xa9 2020 Tinnat Inc. All rights reserved.")}),C=a(185),S=a.n(C),I=function(e){return new Promise((function(t,a){b()({uri:g.production.api.v1_get_product_by_id.uri+e,method:"GET",headers:{"X-TINNAT-SECURITY-CONTEXT":JSON.stringify({userId:"admin",key:"tinnat"})}},(function(e,a,n){n=JSON.parse(n||"{}"),console.log(JSON.stringify(n)),n&&n.error?t(null):t(n)}))}))},A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).selectButton=function(e){for(var t=a.state.buttons,n=0;n<t.length;n++)t[n].key===e?(t[n].selected=!0,a.props.onSelect(t[n].name)):t[n].selected=!1;a.setState({buttons:t})},a.state={buttons:[]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.defaultButton,t=this.props.buttons.map((function(t,a){return{key:a,name:t,selected:t===e}}));this.setState({buttons:t})}},{key:"render",value:function(){var e=this,t=this.state.buttons;return 0===t.length?c.a.createElement("div",null):c.a.createElement("div",{className:"btn-grp-section"},t.map((function(t,a){return c.a.createElement("button",{key:a,onClick:function(){return e.selectButton(t.key)},className:"btn-group-single ".concat(t.selected?"btn-group-single-selected":"")},t.name)})))}}]),t}(n.Component),J=function(e){var t=e.cost,a=e.discount,n=parseInt(t.amount),r=parseInt(a.value),i=n;return"INSTANT"===a.type&&(i=n-r),"PERCENTAGE"===a.type&&(i=n-n*r/100),c.a.createElement("div",{className:"amount-section"},c.a.createElement("span",{className:"final-amount-text"}," ",t.currency," ",i," "),c.a.createElement("span",{className:"original-amount-text"},t.currency," ",n),c.a.createElement("span",{className:"amount-offer-text"},"\xa0(","INSTANT"===a.type?"".concat(t.currency," ").concat(r," off"):"".concat(r,"% off"),")"))},B=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={productinfo:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.productid;I(t).then((function(t){return e.setState({productinfo:t})}))}},{key:"render",value:function(){var e=this.state.productinfo;return e?c.a.createElement("div",{className:"in-content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"p-images"},c.a.createElement("img",{src:e&&e.picture_links&&e.picture_links[0]||S.a,height:"400px",width:"400px"})),c.a.createElement("div",{className:"p-infos"},c.a.createElement("div",{className:"p-item"},c.a.createElement("span",{className:"header-large"},e.name)),c.a.createElement("div",{className:"p-item"},c.a.createElement("span",{className:"header-text-medium"},e.description)),c.a.createElement("div",{className:"p-item"},c.a.createElement(J,{cost:e.cost,discount:e.discount})),c.a.createElement("div",{className:"p-item"},c.a.createElement(A,{onSelect:function(){},defaultButton:e.default_size,buttons:e.available_sizes})),c.a.createElement("div",{className:"p-item"},c.a.createElement(A,{onSelect:function(){},defaultButton:e.default_color,buttons:e.available_colors})),c.a.createElement("div",{className:"p-item"},parseInt(e.stock_quantity)>0?c.a.createElement("span",{className:"small-header-text green-text"},c.a.createElement("i",{className:"material-icons"},"done"),"\u2002 IN STOCK"):c.a.createElement("span",{className:"small-header-text red-text"},c.a.createElement("i",{className:"material-icons"},"cancel"),"\u2002 OUT OF STOCK")),c.a.createElement("div",{className:"p-item"},c.a.createElement("button",{className:"add-cart-btn"},c.a.createElement("i",{className:"material-icons"},"add_shopping_cart"),"\u2002ADD TO CART "))),c.a.createElement("div",{className:"clear"}))):c.a.createElement("div",null," Product not found ")}}]),t}(n.Component),P=(a(402),function(e){function t(e){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement(i.a,null,c.a.createElement(j,null),c.a.createElement(d.a,{exact:!0,path:"/",component:_}),c.a.createElement(d.a,{path:"/product/:productid",component:B}),c.a.createElement(x,null))}}]),t}(n.Component));Object(r.render)(c.a.createElement(i.a,null,c.a.createElement(P,null)),document.getElementById("root"))},72:function(e){e.exports=JSON.parse('{"production":{"api":{"v1_get_product_by_id":{"uri":"http://tinnat.com/api/product/"},"v1_get_featured_products":{"uri":"http://tinnat.com/api/products/featured?limit=6"}}},"development":{"api":{"v1_get_product_by_id":{"uri":"http://localhost.paypal.com:2002/api/product/"},"v1_get_featured_products":{"uri":"http://localhost.paypal.com:2002/api/products/featured?limit=6"}}}}')}},[[188,1,2]]]);
//# sourceMappingURL=main.886d6e4a.chunk.js.map