webpackJsonp([27],{1316:function(e,t,n){"use strict";function a(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(3),c=n.n(l),s=n(341),u=(n.n(s),n(573)),p=n(1864),f=n(1865),d=n(1651),m=n(342),y=n(343),g=(n.n(y),n(574)),h=n.n(g),b=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),v=a(["\n      {\n        categories(groupId:2){\n          id\n          title\n          slug\n          uri\n          ...on FaqCategoryCategory {\n            image {\n              filename\n              id\n              id\n              url\n            }\n          }\n        }\n      }\n    "],["\n      {\n        categories(groupId:2){\n          id\n          title\n          slug\n          uri\n          ...on FaqCategoryCategory {\n            image {\n              filename\n              id\n              id\n              url\n            }\n          }\n        }\n      }\n    "]),E=a(["\n        {\n          entry(section:faqsPage){\n            ...on FaqsPage{\n              id\n              title\n              ","\n                relatedContentConnection{\n                  entries{\n                    title\n                    ... on Faqs {\n                      heading\n                      image {\n                        filename\n                      }\n                      uri\n                    }\n                  }\n              }\n\n            }\n          }\n        }\n    "],["\n        {\n          entry(section:faqsPage){\n            ...on FaqsPage{\n              id\n              title\n              ","\n                relatedContentConnection{\n                  entries{\n                    title\n                    ... on Faqs {\n                      heading\n                      image {\n                        filename\n                      }\n                      uri\n                    }\n                  }\n              }\n\n            }\n          }\n        }\n    "]),w=a(["\n          {\n            entries(section:[faqs], relatedTo:[{element:","}]){\n              ...on Faqs{\n                id\n                title\n                heading\n                description{\n                  content\n                }\n              }\n            }\n          }\n        "],["\n          {\n            entries(section:[faqs], relatedTo:[{element:","}]){\n              ...on Faqs{\n                id\n                title\n                heading\n                description{\n                  content\n                }\n              }\n            }\n          }\n        "]),k=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={data:"",categories:[],categorySelected:!1,loading:!0},n}return i(t,e),b(t,[{key:"changedCategory",value:function(){var e=this.categoryFilter;if("none"!==e.options[e.selectedIndex].value){var t=e.options[e.selectedIndex].id;this.setState({categoryFilter:t,categorySelected:!0}),console.log("hit"),console.log(e),console.log(t)}else this.setState({categorySelected:!1})}},{key:"render",value:function(){var e=this,t=Object(m.b)(v),n=Object(m.b)(E,h.a.metaQuery),a=Object(m.b)(w,this.state.categoryFilter);return c.a.createElement("div",{className:"offsetNav"},c.a.createElement(s.Helmet,null,c.a.createElement("title",null,"FAQs & Help")),c.a.createElement("div",{className:"container content faqs"},c.a.createElement("div",{className:"faq-upper-section clearfix"},c.a.createElement("h1",{className:"fontBold fontSize4 mb-4"},"What can we help you with?"),c.a.createElement("div",{className:"container--sm"},c.a.createElement("div",{className:"grid5of12"},c.a.createElement(y.Query,{query:t},function(t){var n=t.loading,a=t.error,r=t.data;return n?"":a?"":r.categories?c.a.createElement("select",{className:"departments-filter select full-width selectLh ",ref:function(t){e.categoryFilter=t},onChange:function(){return e.changedCategory()}},c.a.createElement("option",{value:"none"},"Browse all categories"),r.categories.map(function(e,t){return c.a.createElement("option",{value:e.title,key:"cat"+t,id:e.id},e.title)})):""})),c.a.createElement("div",{className:"grid7of12"},c.a.createElement(p.a,null))))),c.a.createElement("div",{className:"container--sm"},!0===this.state.categorySelected?c.a.createElement(y.Query,{query:a},function(e){var t=e.loading,n=e.error,a=e.data;return t?c.a.createElement(u.a,null):n?"":c.a.createElement("div",null,a.entries.map(function(e,t){return c.a.createElement("div",{key:"faq"+t},console.log(e),c.a.createElement(d.a,{data:e,key:t,index:t}))}))}):""),c.a.createElement(y.Query,{query:n},function(t){var n=t.loading,a=t.error,r=t.data;return n?c.a.createElement(u.a,null):a?"":c.a.createElement(c.a.Fragment,null,r.entry.metaImage.length>0?c.a.createElement(s.Helmet,null,c.a.createElement("title",null,r.entry.metaTitle),c.a.createElement("meta",{name:"description",content:r.entry.metaDescription}),c.a.createElement("meta",{property:"og:title",content:r.entry.metaTitle}),c.a.createElement("meta",{property:"og:type",content:"website"}),c.a.createElement("meta",{property:"og:url",content:r.entry.url}),c.a.createElement("meta",{property:"og:image",content:r.entry.metaImage[0].url}),c.a.createElement("link",{rel:"canonical",href:r.entry.url})):c.a.createElement(s.Helmet,null,c.a.createElement("title",null,r.entry.metaTitle),c.a.createElement("meta",{name:"description",content:r.entry.metaDescription}),c.a.createElement("meta",{property:"og:title",content:r.entry.metaTitle}),c.a.createElement("meta",{property:"og:type",content:"website"}),c.a.createElement("meta",{property:"og:url",content:r.entry.url}),c.a.createElement("link",{rel:"canonical",href:r.entry.url})),c.a.createElement(f.a,{data:r.entry.relatedContentConnection.entries,loading:e.state.loading,slug:e.props.slug}))}))}}]),t}(l.Component);t.default=k},1651:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(3),l=n.n(i),c=n(341),s=(n.n(c),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}()),u=l.a.Fragment,p=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={expanded:!1,contentIsHidden:!0},n.toggleItem=n.toggleItem.bind(n),n}return o(t,e),s(t,[{key:"componentDidMount",value:function(){}},{key:"toggleItem",value:function(){!0===this.state.expanded?this.setState({expanded:!1,contentIsHidden:!0}):this.setState({expanded:!0,contentIsHidden:!1})}},{key:"render",value:function(){return console.log("logging data!!!!!!!!"),console.log(this.props.data),void 0===this.props.data?"":l.a.createElement("li",{className:"accordion--item"},l.a.createElement(c.Helmet,null,l.a.createElement("script",{type:"text/javascript"},"\n            //console.log('%c testing log in script tag', 'background: #222; color: #bada55');\n            //console.log('%c testing another log...', 'background: #222; color: #bada55');\n\n            function regClick(){\n              //console.log('register a click');\n              $('.manual-modal-click').remove();\n            }\n\n            $('.offsite-link-inline').on('click', function(event){\n              event.preventDefault();\n              //console.log('default prevented');\n              //console.log('logging click');\n              //console.log($(this).attr('href'));\n              var link = $(this).attr('href');\n\n              $('body').append('<div class=\"manual-modal-click\" style=\"position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);\"><div class=\"\" aria-label=\"Offsite Speedbump modal\" style=\"position: absolute; top: 50%; left: 50%; right: auto; bottom: auto; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px; margin-right: -50%; transform: translate(-50%, -50%);\"><div class=\"this-will-be-outer-modal-holder speedbump-modal-outer align-center text-center\"><div class=\"fontSize1 fontMedium\">External Link Disclaimer</div><div class=\"pb-2 fontSize0\">Solarity Credit Union has no control over information at any site hyperlinked to or from this Site. Solarity Credit Union makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by Solarity Credit Union of any information in any hyperlinked site. In no event shall Solarity Credit Union be responsible for your use of a hyperlinked site. Solarity\u2019s privacy policy does not apply to linked websites.</div><button onClick=\"regClick()\" class=\"button ml-2\">Go Back</button><a href=\"' + $(this).attr('href') + '\" class=\"button button-primary ml-2\">Continue</a></div></div></div>');\n\n            });\n\n          ")),l.a.createElement("button",{className:"accordion--button fontSize3 fontBold",onClick:this.toggleItem,"aria-expanded":this.state.expanded},!0===this.state.expanded?l.a.createElement("span",{className:"feather icon-chevron-down"}):l.a.createElement("span",{className:"feather icon-chevron-right"})," ",this.props.data.heading),l.a.createElement(u,null,this.props.data.description?l.a.createElement("div",{dangerouslySetInnerHTML:{__html:this.props.data.description.content},className:"accordion--content pl-4 fontSize0 fontRegular richText "+(!0===this.state.expanded?"is-visible":"is-hidden"),"aria-hidden":this.state.contentVisible}):""))}}]),t}(i.Component);t.a=p},1864:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(3),l=n.n(i),c=n(123),s=n(581),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),p=function(e){var t=e.hit;return l.a.createElement("div",{onClick:function(e){}},l.a.createElement(c.b,{to:"/"+t.uri},t.title))},f=function(){return l.a.createElement("div",null,l.a.createElement(s.a,{hitComponent:p}))},d=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={view:"hide",inputValue:""},n.getClick=n.getClick.bind(n),n}return o(t,e),u(t,[{key:"getClick",value:function(e){"hide"===this.state.view&&this.setState({view:"show"})}},{key:"updateInputValue",value:function(e){this.setState({inputValue:e.target.value})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(s.b,{appId:"2SREYCF5I4",apiKey:"6238455a9fcb7cf5fc9ff4469f86ad95",indexName:"faqs-production"},l.a.createElement(s.c,{onChange:function(t){return e.updateInputValue(t)},translations:{placeholder:"Search frequently asked questions"}}),""!==this.state.inputValue?l.a.createElement(f,null):""))}}]),t}(i.Component);t.a=d},1865:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(3),l=n.n(i),c=n(123),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return o(t,e),s(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"flex grey2 related-articles"},0!==this.props.data.length?l.a.createElement("div",{className:"grid pt-4 pb-4 text-center"},l.a.createElement("div",{className:"flex flex-wrap"},l.a.createElement("h2",{className:"fontSize4 colorBrandSecondary block full-width text-left mb-0"},"Featured FAQs"),this.props.data.map(function(e,t){return l.a.createElement(c.b,{to:"/"+e.uri,key:t,className:"grid1of3 pb-2 rel-article-card bg-white borderradius--large"},l.a.createElement("div",{className:"related-img",style:{backgroundImage:"url('https://s3-us-west-2.amazonaws.com/solarity-website-20180924123425848200000001/img/"+e.image[0].filename+"')"}}),l.a.createElement("p",{className:"pt-1 pb-1 pr-1 pl-1 fontSize2"},e.title))}))):"")}}]),t}(i.Component);t.a=u}});
//# sourceMappingURL=27.e9500e95.chunk.js.map