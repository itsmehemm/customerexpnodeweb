(this.webpackJsonpcustomerexpnodeweb=this.webpackJsonpcustomerexpnodeweb||[]).push([[0],{182:function(e,t,a){e.exports=a.p+"static/media/banner.0a9a5ccd.jpg"},184:function(e,t,a){e.exports=a.p+"static/media/tinnat-logo.4d7196b3.png"},185:function(e,t,a){e.exports=a.p+"static/media/tshirt.9e44ceb5.jpg"},188:function(e,t,a){e.exports=a(405)},207:function(e,t){},209:function(e,t){},239:function(e,t){},240:function(e,t){},284:function(e,t){},286:function(e,t){},309:function(e,t){},400:function(e,t,a){},405:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(181),i=a(73),o=a(32),l=a(33),s=a(35),u=a(34),m=a(36),d=a(37),p=a(182),f=a.n(p),h=function(){return c.a.createElement("div",{className:"content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("img",{src:f.a})))},v=a(183),E=a.n(v),N=a(71),b=a.n(N),g=a(72),w=function(){return E.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){b()({uri:g.production.api.v1_get_featured_products.uri,method:"GET",headers:{"X-TINNAT-SECURITY-CONTEXT":JSON.stringify({userId:"admin",key:"tinnat"})}},(function(t,a,n){n=JSON.parse(n||"{}"),console.log(JSON.stringify(n)),n&&n.featured?e(n.featured):e([])}))})));case 1:case"end":return e.stop()}}))},O=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={featured:[]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;w().then((function(t){return e.setState({featured:t})}))}},{key:"render",value:function(){return c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"header"},c.a.createElement("span",{className:"header-large"},"Featured Products")),c.a.createElement("div",{className:"content-wrapper"},this.state.featured.map((function(e,t){return c.a.createElement("div",{onClick:function(){return window.open("/product/".concat(e.id))},key:t,className:"l-item"},c.a.createElement("div",{className:"p-widget"},c.a.createElement("img",{src:e.picture_links[0],height:"200px",width:"200px"}),c.a.createElement("div",{className:"p-widget-header"},e.name),c.a.createElement("div",{className:"p-widget-info"},c.a.createElement("span",{className:"text-large-bold"},"\u20b9 ",e.cost.amount))))})),0===this.state.featured.length&&c.a.createElement("div",null," There are no featured products"),c.a.createElement("div",{className:"clear"})))}}]),t}(n.Component),_=function(){return c.a.createElement("div",{className:"content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"header"},c.a.createElement("span",{className:"header-large"},"Welcome to Tinnat.com")),c.a.createElement("div",{className:"text-content"},"Tinnat.com, a.k.a The Innovative Attire is an innovative e-commerce website built in and for Indian customers with love. Shop for T-shirts, Jeans, Accessories and many other stuffs for the best prices and quality.")))},j=function(){return c.a.createElement("div",null,c.a.createElement(h,null),c.a.createElement(O,null),c.a.createElement(_,null))},k=a(184),y=a.n(k),x=function(e){function t(e){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{onClick:function(){return window.location="/"},className:"logo"},c.a.createElement("img",{src:y.a,height:"45px",width:"80px"})),c.a.createElement("div",{className:"menu"},c.a.createElement("div",{onClick:function(){return window.location="/"},className:"menu-item"},"Home"),c.a.createElement("div",{onClick:function(){return window.location="/about"},className:"menu-item"},"About"),c.a.createElement("div",{onClick:function(){return window.location="/products"},className:"menu-item"},"Products"),c.a.createElement("div",{onClick:function(){return window.location="/cart"},className:"menu-item"},"Cart"),c.a.createElement("div",{onClick:function(){return window.location="/contact"},className:"menu-item"},"Contact Us"),c.a.createElement("div",{className:"clear"})),c.a.createElement("div",{className:"clear"})))}}]),t}(n.Component),T=function(e){return c.a.createElement("div",{className:"footer"},c.a.createElement("div",{className:"content"},"\xa9 2020 Tinnat Inc. All rights reserved."))},C=a(185),S=a.n(C),I=function(e){return new Promise((function(t,a){b()({uri:g.production.api.v1_get_product_by_id.uri+e,method:"GET",headers:{"X-TINNAT-SECURITY-CONTEXT":JSON.stringify({userId:"admin",key:"tinnat"})}},(function(e,a,n){n=JSON.parse(n||"{}"),console.log(JSON.stringify(n)),n&&n.error?t(null):t(n)}))}))},J=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={productinfo:null},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.productid;I(t).then((function(t){return e.setState({productinfo:t})}))}},{key:"render",value:function(){var e=this.state.productinfo;return e?c.a.createElement("div",null,c.a.createElement("div",{className:"content-wrapper"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"p-content"},c.a.createElement("div",{className:"p-images"},c.a.createElement("img",{src:e&&e.picture_links&&e.picture_links[0]||S.a,height:"400px",width:"400px"})),c.a.createElement("div",{className:"p-infos"},c.a.createElement("div",{className:"header-text-large"},e.name),c.a.createElement("div",{className:"header-text-large"},"\u20b9 ",e.cost.amount),c.a.createElement("div",{className:"header-text-medium"},e.description)),c.a.createElement("div",{className:"clear"}))))):c.a.createElement("div",null," Product not found ")}}]),t}(n.Component),A=(a(400),function(e){function t(e){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return c.a.createElement(i.a,null,c.a.createElement(x,null),c.a.createElement(d.a,{exact:!0,path:"/",component:j}),c.a.createElement(d.a,{path:"/product/:productid",component:J}),c.a.createElement(T,null))}}]),t}(n.Component));Object(r.render)(c.a.createElement(i.a,null,c.a.createElement(A,null)),document.getElementById("root"))},72:function(e){e.exports=JSON.parse('{"production":{"api":{"v1_get_product_by_id":{"uri":"http://tinnat.hemanthmurali.com/api/product/"},"v1_get_featured_products":{"uri":"http://tinnat.hemanthmurali.com/api/products/featured?limit=6"}}},"development":{"api":{"v1_get_product_by_id":{"uri":"http://localhost.paypal.com:2002/api/product/"},"v1_get_featured_products":{"uri":"http://localhost.paypal.com:2002/api/products/featured?limit=6"}}}}')}},[[188,1,2]]]);
//# sourceMappingURL=main.7922f282.chunk.js.map