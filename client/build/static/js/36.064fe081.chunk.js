webpackJsonp([36],{1318:function(e,t,n){"use strict";function a(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(3),s=n.n(l),c=n(123),d=n(341),u=(n.n(d),n(574)),m=n.n(u),p=n(573),f=n(342),g=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),h=a(['\n          {\n            entry(slug:"','"){\n              ...on Faqs{\n                id\n                title\n                heading\n                description{\n                  content\n                }\n                relatedContent{\n                  uri\n                  title\n                }\n              }\n            }\n          }\n        '],['\n          {\n            entry(slug:"','"){\n              ...on Faqs{\n                id\n                title\n                heading\n                description{\n                  content\n                }\n                relatedContent{\n                  uri\n                  title\n                }\n              }\n            }\n          }\n        ']),y=a(['\n        {\n          entry(section:faqs, slug:"','"){\n            title\n            ...on Faqs{\n              ',"\n              id\n              title\n              heading\n              description{\n                content\n              }\n              relatedContent{\n                uri\n                title\n              }\n            }\n          }\n        }\n      "],['\n        {\n          entry(section:faqs, slug:"','"){\n            title\n            ...on Faqs{\n              ',"\n              id\n              title\n              heading\n              description{\n                content\n              }\n              relatedContent{\n                uri\n                title\n              }\n            }\n          }\n        }\n      "]),b=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={data:"",heading:"",description:"",loading:!0,found:!0,related:[]},n}return i(t,e),g(t,[{key:"componentDidUpdate",value:function(e,t){var n=this;if(this.props.slug&&this.props.slug!==e.slug){var a=Object(f.b)(h,this.props.slug),r=document.location.href.match(/\btoken=([^&]+)/),o=r?r[1]:"",i="graph-api?token="+o;new f.a({uri:"https://content-prod.solaritycu.org/"+i,request:function(e){e.setContext({headers:{Authorization:"bearer FRgdwQcAe6y1PuaMs3rGf7zm4p3GKeXWFTKsXu3bMQgni_cUFl45PbhzRcsNbt3m"}})}}).query({query:a}).then(function(e){null===e.data.entry?n.setState({found:!1}):n.setState({heading:e.data.entry.heading,description:null!=e.data.entry.description?e.data.entry.description.content:"",related:e.data.entry.relatedContent,loading:!1})})}}},{key:"componentDidMount",value:function(){var e=this;if(this.props.slug){var t=Object(f.b)(y,this.props.slug,m.a.metaQuery),n=document.location.href.match(/\btoken=([^&]+)/),a=n?n[1]:"",r="graph-api?token="+a;new f.a({uri:"https://content-prod.solaritycu.org/"+r,request:function(e){e.setContext({headers:{Authorization:"bearer FRgdwQcAe6y1PuaMs3rGf7zm4p3GKeXWFTKsXu3bMQgni_cUFl45PbhzRcsNbt3m"}})}}).query({query:t}).then(function(t){null===t.data.entry?e.setState({found:!1}):e.setState({metaInfo:{title:t.data.entry.metaTitle,description:t.data.entry.metaDescription,image:t.data.entry.metaImage,url:t.data.entry.url},heading:t.data.entry.heading,description:null!=t.data.entry.description?t.data.entry.description.content:"",related:t.data.entry.relatedContent,loading:!1})})}}},{key:"render",value:function(){var e=this.state.heading,t=this.state.description,n=this.props.cats;return this.state.found?s.a.createElement("div",null,!1===this.state.loading?s.a.createElement(s.a.Fragment,null,s.a.createElement(d.Helmet,null,s.a.createElement("script",{type:"text/javascript"},"\n                  //console.log('%c testing log in script tag', 'background: #222; color: #bada55');\n                  //console.log('%c testing another log...', 'background: #222; color: #bada55');\n\n                  function regClick(){\n                    //console.log('register a click');\n                    $('.manual-modal-click').remove();\n                  }\n\n                  $('.offsite-link-inline').on('click', function(event){\n                    event.preventDefault();\n                    //console.log('default prevented');\n                    //console.log('logging click');\n                    //console.log($(this).attr('href'));\n                    var link = $(this).attr('href');\n\n                    $('body').append('<div class=\"manual-modal-click\" style=\"position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);\"><div class=\"\" aria-label=\"Offsite Speedbump modal\" style=\"position: absolute; top: 50%; left: 50%; right: auto; bottom: auto; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px; margin-right: -50%; transform: translate(-50%, -50%);\"><div class=\"this-will-be-outer-modal-holder speedbump-modal-outer align-center text-center\"><div class=\"fontSize1 fontMedium\">External Link Disclaimer</div><div class=\"pb-2 fontSize0\">Solarity Credit Union has no control over information at any site hyperlinked to or from this Site. Solarity Credit Union makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by Solarity Credit Union of any information in any hyperlinked site. In no event shall Solarity Credit Union be responsible for your use of a hyperlinked site. Solarity\u2019s privacy policy does not apply to linked websites.</div><button onClick=\"regClick()\" class=\"button ml-2\">Go Back</button><a href=\"' + $(this).attr('href') + '\" class=\"button button-primary ml-2\">Continue</a></div></div></div>');\n\n                  });\n\n                ")),this.state.metaInfo.image.length>0?s.a.createElement(d.Helmet,null,s.a.createElement("title",null,this.state.metaInfo.title),s.a.createElement("meta",{name:"description",content:this.state.metaInfo.description}),s.a.createElement("meta",{property:"og:title",content:this.state.metaInfo.title}),s.a.createElement("meta",{property:"og:type",content:"website"}),s.a.createElement("meta",{property:"og:url",content:this.state.metaInfo.url}),s.a.createElement("meta",{property:"og:image",content:this.state.metaInfo.image[0].url}),s.a.createElement("link",{rel:"canonical",href:this.state.metaInfo.url})):s.a.createElement(d.Helmet,null,s.a.createElement("title",null,this.state.metaInfo.title),s.a.createElement("meta",{name:"description",content:this.state.metaInfo.description}),s.a.createElement("meta",{property:"og:title",content:this.state.metaInfo.title}),s.a.createElement("meta",{property:"og:type",content:"website"}),s.a.createElement("meta",{property:"og:url",content:this.state.metaInfo.url}),s.a.createElement("link",{rel:"canonical",href:this.state.metaInfo.url})),s.a.createElement("div",{className:"offsetNav container--md"},s.a.createElement("div",{className:"faq-single-inner"},s.a.createElement("div",{className:"faq-single-column1"},s.a.createElement("ul",{className:"faq-category-nav"},Object.keys(n||{}).map(function(e,t){return s.a.createElement("li",{key:"cat"+t,className:"faq-category-item"},s.a.createElement(c.b,{className:"fontSize0 link-hover colorBrandSecondary mb-1",to:"/"+n[t].uri},n[t].title))}))),s.a.createElement("div",{className:"faq-single-column2"},s.a.createElement("h1",{className:"faq-single-title fontSize4"},e),s.a.createElement("div",{className:"fontSize0",dangerouslySetInnerHTML:{__html:t}})))),this.state.related.length>0?s.a.createElement("div",{className:"flex grey2 related-articles"},0!==this.state.related.length?s.a.createElement("div",{className:"grid pt-6 pb-6 text-center"},s.a.createElement("p",{className:"text-left fontSize4 fontBold colorBrandSecondary mb-0 mt-0"},"Related Articles"),s.a.createElement("div",{className:"flex flex-wrap"},this.state.related.map(function(e,t){return s.a.createElement(c.b,{to:"/"+e.uri,key:t,className:"grid1of3 pb-2 rel-article-card bg-white borderradius--large"},s.a.createElement("p",{className:"pt-1 pb-1 pr-1 pl-1 fontSize2"},e.title))}))):""):""):s.a.createElement(p.a,null)):s.a.createElement(c.d,{to:"/not-found"})}}]),t}(l.Component);t.default=b}});
//# sourceMappingURL=36.064fe081.chunk.js.map