webpackJsonp([32],{1338:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),l=n.n(a),c=n(123),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=function(e){function t(e){i(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return o(t,e),s(t,[{key:"componentDidUpdate",value:function(e,t){}},{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props.data;return l.a.createElement("div",{className:"offsetNav container--sm mb-6 flex flex-wrap"},l.a.createElement("h1",{className:"full-width"},"Sitemap"),e[0]?e.map(function(e,t){return l.a.createElement("div",{className:"ml-2 columnList2",key:"level1-"+t},l.a.createElement(c.b,{to:e.sitemapEntriesConnection.entries[0].uri,className:"link inline fontSize3 fontMedium"},e.sitemapEntriesConnection.entries[0].title," "),e.hasDescendants?e.children.map(function(e,t){return l.a.createElement("div",{className:"ml-4",key:"level2-"+t},l.a.createElement(c.b,{to:e.sitemapEntriesConnection.entries[0].uri,className:"link inline "},e.sitemapEntriesConnection.entries[0].title," "),e.hasDescendants?e.children.map(function(e,t){return l.a.createElement("div",{className:"ml-6",key:"level2-"+t},l.a.createElement(c.b,{to:e.sitemapEntriesConnection.entries[0].uri,className:"link inline"},e.sitemapEntriesConnection.entries[0].title," "))}):"")}):"")}):"")}}]),t}(a.Component);t.default=u}});
//# sourceMappingURL=32.87b536a9.chunk.js.map