define("modules/clean/admin/megaphone/prompt/api/utils",["require","exports","external/underscore"],function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});(function(e){var t=function(e){return e.replace(/_(.)/g,function(e,t){return t.toUpperCase()})},r=function(e){return e.replace(/([a-z\d])([A-Z0-9])/g,function(e,t,o){return t+"_"+o.toLowerCase()})},n=function(e,t){if(null===t)return null;if(Array.isArray(t)){var o=[];return t.forEach(function(t){o.push(n(e,t))}),o}if("object"==typeof t){var r={};return Object.keys(t).forEach(function(o){r[e(o)]=n(e,t[o])}),r}return t},i=function(e,t){return n(e,t)},s=function(e){var t={},n=i(r,e);return o.each(o.keys(n),function(e){n[e]&&n[e].id?t[e]=n[e].id:t[e]=n[e]}),t.approved=!(!t.approved_time&&!t.approved_user),delete t.approved_time,delete t.approved_user_id,t.start_time_enabled=null!==t.ad&&null!==t.ad.start_time,t.end_time_enabled=null!==t.ad&&null!==t.ad.end_time,t.remind_me_later_enabled=null!==t.remind_me_later_type,t.remind_me_later_enabled||(t.remind_me_later_type=null,t.remind_me_later_delay=null),o.each(o.keys(t),function(e){"boolean"==typeof t[e]&&(t[e]=t[e]?"on":"off")}),t.upsell_promo_spec=t.cash_promo,delete t.cash_promo,delete t.id,delete t.created_time,delete t.promo_params,delete t.updated_time,delete t.user,delete t.locale,t};e.requestDataFromCampaignAndVersion=function(e,t){var n=s(e),a=i(r,t.content);delete n.content;var p=["modal_type"];return o.each(o.keys(a),function(e){if(o.contains(p,e))n[e]=a[e];else{if(null===a[e])return;var t=void 0;t=Array.isArray(a[e])?a[e].join("\n"):a[e],n["content["+e+"]"]=t}}),n.stormcrow_variant=t.stormcrowVariant,"content[image_url]"in n&&(n["content[image]"]=n["content[image_url]"],delete n["content[image_url]"]),"content[cancel_with_xIcon]"in n&&(n["content[cancel_with_x_icon]"]=n["content[cancel_with_xIcon]"],delete n["content[cancel_with_xIcon]"]),o.each(o.keys(n),function(e){"boolean"==typeof n[e]&&(n[e]=n[e]?"on":"off")}),n},e.toCamelCase=function(e){return i(t,e)},e.jsonToCamelCase=function(t){var o=JSON.parse(t);return e.toCamelCase(o)},e.stringToCamelCase=function(e){return t(e)}})(t.APIUtils||(t.APIUtils={}))}),define("modules/clean/ajax_minimal",["require","exports"],function(e,t){"use strict";function o(e){var t=document.cookie.match("(^|; )"+e+"=([^;]*)");return t?t[2]:""}function r(e,t){var r=new XMLHttpRequest;r.open("POST",e),r.withCredentials=!0,r.setRequestHeader("X-CSRF-Token",o("__Host-js_csrf")),r.send(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.post=r}),function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};define("modules/clean/deprecated/uirequest",["jquery","external/underscore","modules/core/html","modules/core/i18n","modules/core/notify","modules/clean/ajax","modules/clean/css","modules/clean/legacy_pyxl_controllers/ajax_form","modules/clean/dbmodal","modules/pagelet_config"],function(t,o,r,n,i,s,a,p,c,u){var l,m,d;return d=n._,l=c.DBModal,m=u.REQUIREJS_CONFIG,(function(){function n(t,r,n){if(this.$node=t,this.url=r,this.options=null!=n?n:{},this.complete=e(this.complete,this),this.handle_errors=e(this.handle_errors,this),this.error=e(this.error,this),this.perform_actions=e(this.perform_actions,this),this.success=e(this.success,this),this.shouldDelayComplete=!1,this.$node.hasClass("ajax-loading"))return!1;this.$node.addClass("ajax-loading"),s.FormWebRequest({url:this.url,type:null!=this.options.type?this.options.type:void 0,data:this.options.data||{},success:this.success,error:this.error,complete:this.complete,subject_user:this.options.subject_user,headers:o.extend({"X-RequireJS-Context":m.context,"X-UIRequest-Version":3},this.options.headers)})}return n.prototype.success=function(e,t,o){var r,n,i;return(i=p.extract_errors(o.responseText))?(this.handle_errors(i),void("function"==typeof(r=this.options).error&&r.error(o,t))):(e=JSON.parse(o.responseText),e.redirect?void(window.location.href=e.redirect):e.reload?void window.location.reload():(this.shouldDelayComplete=e.js||e.css,this.shouldDelayComplete?a.require_css_multi(e.css,(function(r){return function(){var n,i;return r.perform_actions(e.actions||[]),"function"==typeof(n=r.options).success&&n.success(e,t,o),r.$node.removeClass("ajax-loading"),"function"==typeof(i=r.options).complete?i.complete(o,t):void 0}})(this)):(this.perform_actions(e.actions||[]),void("function"==typeof(n=this.options).success&&n.success(e,t,o)))))},n.prototype.perform_actions=function(e){var o,n,s,a,p,c,u,m,d,_,f,h;for(_=[],p=0,c=e.length;p<c;p++)switch(n=e[p],a=n[0],s=n[1],h=n[2],o=this.$node,h&&"modal"!==a&&("^"===h.charAt(0)&&(m=h.split(" "),o=o.closest(m[0].substr(1)),h=m.slice(1).join(" ")),h&&(o=o.find(h).filter(":first"))),a){case"modal":d="db-modal-response-modal-placeholder",t("#"+d).remove(),f=t(s),f.attr("id",d),t("body").append(f),u=new l({element_id:"response-modal-placeholder"}),_.push(u.show());break;case"html":_.push(o.html(s));break;case"replaceWith":_.push(o.replaceWith(s));break;case"after":s?_.push(o.after(s)):_.push(void 0);break;case"before":s?_.push(o.before(s)):_.push(void 0);break;case"toggleClass":_.push(o.toggleClass(s));break;case"addClass":_.push(o.addClass(s));break;case"removeClass":_.push(o.removeClass(s));break;case"notify":_.push(i.success(s));break;case"notifyError":_.push(i.error(new r(s),this.options.errorDuration||void 0));break;default:_.push(void 0)}return _},n.prototype.error=function(e,t,o){var r,n;return n=p.extract_errors(e.responseText),"abort"!==t&&this.handle_errors(n),"function"==typeof(r=this.options).error?r.error(e,t,o):void 0},n.prototype.handle_errors=function(e){var t;return e===!1?i.error(d("There was a problem completing this request.")):"string"==typeof e?(t=this.options.html_in_error_msg?new r(e):e,i.error(t)):p.fill_errors(this.$node,e)},n.prototype.complete=function(e,t){var o;if(!this.shouldDelayComplete)return this.$node.removeClass("ajax-loading"),"function"==typeof(o=this.options).complete?o.complete(e,t):void 0},n})()})}.call(this),define("modules/clean/prompt/ha_loader",["require","exports","jquery","modules/clean/admin/megaphone/prompt/api/utils","external/react","external/react-dom","modules/clean/ajax","modules/clean/upsell/exception","modules/clean/react/prompt/ha"],function(e,t,o,r,n,i,s,a,p){"use strict";function c(e){try{if(!e.userID)return;var t=o(e.isMaestroDesign?"#prompt-silo .ha-silo":"#ha-container");s.SilentBackgroundRequest({url:"/prompt/ha",subject_user:e.userID,data:{ref_controller:e.controller,ref_action:e.action,campaign_id:e.campaignID,is_maestro:e.isMaestroDesign}}).then(function(o){var s=r.APIUtils.jsonToCamelCase(o);s.campaign&&(s.subjectUser=e.userID,i.render(n.createElement(p.HA,s),t[0]))})}catch(t){a.reportException({err:t,tags:[a.TAGS.PROMPT_HA_LOADER],exc_extra:{param_user_id:e.userID,param_controller:e.controller,param_action:e.action,param_campaign_id:e.campaignID,param_is_maestro_design:e.isMaestroDesign}})}}Object.defineProperty(t,"__esModule",{value:!0}),t.initialize_module=c}),define("modules/clean/react/prompt/button",["require","exports","tslib","external/classnames","external/purify","external/react"],function(e,t,o,r,n,i){"use strict";function s(e){return e?{__html:n.sanitize(e)}:void 0}Object.defineProperty(t,"__esModule",{value:!0});var a=(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.__extends(t,e),t.prototype.render=function(){var e=r(this.props.className,{"confirm-button":!0,enabled:!0});return this.props.confirmIsPost?i.createElement("form",{action:this.props.confirmUrl,method:"POST",target:this.getTarget(),onSubmit:this.props.onConfirm},i.createElement("button",{type:"submit",className:e,dangerouslySetInnerHTML:s(this.props.html)},this.props.children)):i.createElement("a",{href:this.props.confirmUrl,className:e,target:this.getTarget(),dangerouslySetInnerHTML:s(this.props.html),onClick:this.props.onConfirm},this.props.children)},t.prototype.getTarget=function(){return this.props.confirmInNewTab?"_blank":"_self"},t})(i.Component);t.ConfirmButton=a;var p=(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.__extends(t,e),t.prototype.render=function(){var e=r(this.props.className,{"dismiss-button":!0,enabled:!0});return i.createElement("a",{href:"#",className:e,dangerouslySetInnerHTML:s(this.props.html),onClick:this.props.onDismiss},this.props.children)},t})(i.Component);t.DismissButton=p}),define("modules/clean/react/prompt/campaign_state_manager",["require","exports","jquery","modules/core/uri","modules/clean/ajax","modules/clean/upsell/upsell_controller","modules/clean/upsell/prompt_event_logging"],function(e,t,o,r,n,i,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=(function(){function e(e){var t=this;this.onShow=function(){t.component.state.isShown||(t.component.setState(function(e){return e.isShown=!0,e}),t.triggerExternalEvent(i.ON_SHOW_EVENT_NAME),n.SilentBackgroundRequest({type:"POST",url:t.getUpsellControllerURI("/prompt/log_impression").toString()}))},this.onConfirm=function(e){t.isAckInProgress()||(t.component.setState(function(e){return e.isConfirmed=!0,e}),t.triggerExternalEvent(i.PRE_CONFIRM_EVENT_NAME),t.component.props.campaign.content.confirmInNewTab||"#"!==t.component.props.campaign.content.confirmUrl||e.preventDefault(),"#"===t.component.props.campaign.content.confirmUrl&&t.recordConfirm())},this.onDismiss=function(e){t.isAckInProgress()||(t.component.setState(function(e){return e.isDismissed=!0,e}),e.preventDefault(),t.triggerExternalEvent(i.PRE_DISMISS_EVENT_NAME),t.recordDismiss())},this.component=e}return e.prototype.getConfirmUrl=function(){if("#"===this.component.props.campaign.content.confirmUrl)return"#";var e=this.getUpsellControllerURI("/prompt/confirm_v2"),t=this.component.props.campaign.content.confirmIsPost;return e.updateQuery({redirect_url:this.getRedirectURL()}),t&&e.updateQuery({preserve_post:"1"}),e.toString()},e.prototype.recordConfirm=function(){var e=this.getUpsellControllerURI("/prompt/confirm");this.recordAck(e,i.ON_CONFIRM_EVENT_NAME)},e.prototype.recordDismiss=function(){var e=this.getUpsellControllerURI("/prompt/dismiss");this.recordAck(e,i.ON_DISMISS_EVENT_NAME)},e.prototype.recordAck=function(e,t){var o=this;n.SilentBackgroundRequest({type:"POST",url:e.toString()}).done(function(e){o.triggerExternalEvent(t)})},e.prototype.getUpsellControllerURI=function(e){return s.getUpsellControllerURI(e,{campaignId:this.component.props.campaign.campaignId,activeUserId:this.component.props.subjectUser,promptQueriedAtMs:this.component.props.promptQueriedAtMs})},e.prototype.getRedirectURL=function(){if(this.component.props.campaign.addTkParams){var e=r.parse(this.component.props.campaign.content.confirmUrl);return e.updateQuery({_tk:this.component.props.campaign.campaignLocationTkId,_camp:this.component.props.campaign.campaignId.toString()}),e.toString()}return this.component.props.campaign.content.confirmUrl},e.prototype.isAckInProgress=function(){return this.component.state.isConfirmed||this.component.state.isDismissed},e.prototype.triggerExternalEvent=function(e){o(document).trigger(e,{campaignName:this.component.props.campaign.campaignName})},e})();t.CampaignStateManager=a}),define("modules/clean/react/prompt/ha",["require","exports","tslib","jquery","external/classnames","external/react","external/react-dom","modules/clean/react/css","modules/clean/react/sprite","modules/clean/upsell/prompt_event_emitter","modules/clean/react/prompt/campaign_state_manager","modules/clean/react/prompt/button","modules/clean/react/prompt/image","modules/core/i18n"],function(e,t,o,r,n,i,s,a,p,c,u,l,m,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var _;(function(e){e[e.HIDE=1]="HIDE",e[e.NO_IMAGE=2]="NO_IMAGE",e[e.SHOW=3]="SHOW"})(_=t.ShowState||(t.ShowState={})),t.UpdateInterval=1e3;var f=(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.__extends(t,e),t.prototype.renderImage=function(){var e=this.props.content;return e.imageUrl?i.createElement(l.ConfirmButton,{className:"confirm-button--illustration",confirmInNewTab:e.confirmInNewTab,confirmIsPost:e.confirmIsPost,confirmUrl:this.props.confirmUrl,onConfirm:this.props.onConfirm},i.createElement(m.Image,{src:e.imageUrl,srcHiRes:e.imageUrlHiRes,alt:e.confirmText,onLoad:this.props.onImageLoad})):null},t.prototype.renderText=function(){var e=this.props.content;return i.createElement("p",null,i.createElement(l.ConfirmButton,{confirmInNewTab:e.confirmInNewTab,confirmIsPost:e.confirmIsPost,confirmUrl:this.props.confirmUrl,html:e.text,onConfirm:this.props.onConfirm}))},t.prototype.renderConfirmButton=function(){var e=this.props.content;return e.confirmText?i.createElement(l.ConfirmButton,{className:"button",confirmInNewTab:e.confirmInNewTab,confirmIsPost:e.confirmIsPost,confirmUrl:this.props.confirmUrl,html:e.confirmText,onConfirm:this.props.onConfirm}):null},t.prototype.renderDismissButton=function(){return this.props.isMaestroDesign?i.createElement(l.DismissButton,{onDismiss:this.props.onDismiss,"aria-label":d._("Close")},i.createElement(p,{group:"web",name:"close_small",alt:d._("Close")})):i.createElement(l.DismissButton,{onDismiss:this.props.onDismiss,"aria-label":d._("Close")})},t.prototype.render=function(){var e=this.props.isDismissed,t=n({ha:!0,"no-image":!e&&this.props.showState===_.NO_IMAGE,visible:!e&&this.props.showState===_.SHOW,invisible:this.props.isInvisible});return i.createElement("div",{className:t},this.renderImage(),this.renderText(),this.renderConfirmButton(),this.renderDismissButton())},t})(i.Component);f.displayName="HARendererWithoutCSS",t.HARendererWithoutCSS=f;var h=a(f,["/static/css/upsell/ha-vflFib0oC.css"]),g=(function(e){function n(t){var o=e.call(this,t)||this;return o.setHaRef=function(e){o.ha=e},o.setHaCloneRef=function(e){o.haClone=e},o.state={cloneShowState:_.SHOW,isConfirmed:!1,isDismissed:!1,isShown:!1,showState:_.HIDE},o.onPageUpdate=o.onPageUpdate.bind(o),o.state_manager=new u.CampaignStateManager(o),o}return o.__extends(n,e),n.prototype.componentDidMount=function(){this.onUpdate(),r(window).resize(this.onPageUpdate),c.Emitter.addListener(c.Events.REACT_HA_DID_UPDATE,this.onPageUpdate),this.intervalID=setInterval(this.onPageUpdate,t.UpdateInterval)},n.prototype.componentWillUnmount=function(){r(window).off("resize",this.onPageUpdate),c.Emitter.off(c.Events.REACT_HA_DID_UPDATE,this.onPageUpdate),clearInterval(this.intervalID)},n.prototype.componentDidUpdate=function(){this.onUpdate()},n.prototype.onPageUpdate=function(){this.setState(function(e){return e.cloneShowState=_.SHOW,e})},n.prototype.onUpdate=function(){var e=this;if(this.state.cloneShowState>_.HIDE&&this.canFit())this.state.showState!==this.state.cloneShowState&&this.setState(function(e){return e.showState=e.cloneShowState,e},function(){e.state_manager.onShow()});else{var t=this.state.cloneShowState-1;t>_.HIDE?this.setState(function(e){return e.cloneShowState=t,e}):this.state.showState!==_.HIDE&&this.setState(function(e){return e.showState=_.HIDE,e})}},n.prototype.render=function(){return i.createElement("div",null,i.createElement(h,{isInvisible:!1,content:this.props.campaign.content,confirmUrl:this.state_manager.getConfirmUrl(),isDismissed:this.state.isDismissed,isMaestroDesign:this.props.isMaestroDesign,onConfirm:this.state_manager.onConfirm,onDismiss:this.state_manager.onDismiss,ref:this.setHaRef,showState:this.state.showState}),i.createElement(h,{isInvisible:!0,content:this.props.campaign.content,confirmUrl:this.state_manager.getConfirmUrl(),isDismissed:this.state.isDismissed,isMaestroDesign:this.props.isMaestroDesign,onConfirm:this.state_manager.onConfirm,onDismiss:this.state_manager.onDismiss,onImageLoad:this.onPageUpdate,ref:this.setHaCloneRef,showState:this.state.cloneShowState}))},n.prototype.canFit=function(){return this.props.isMaestroDesign?this.canFitMaestro():this.canFitOld()},n.prototype.canFitMaestro=function(){var e=this.getMenuHeight();if(null===e)return!1;var t=this.getHAHeight();return null!==t&&e+t<=this.getWindowHeight()},n.prototype.canFitOld=function(){var e=this.getHABottom();return null!==e&&(e+this.getFooterHeight()<=this.getWindowHeight()||!this.isHAFixed())},n.prototype.getHABottom=function(){var e=r(s.findDOMNode(this.ha)),t=r(s.findDOMNode(this.haClone));return e.length>0&&t.length>0?e.offset().top-r(document).scrollTop()+t.outerHeight():null},n.prototype.getHAHeight=function(){var e=r(s.findDOMNode(this.haClone));if(0===e.length)return null;return e.outerHeight()+75},n.prototype.getMenuHeight=function(){var e=r(".maestro-secondary-sidebar, .appactions-menu").first();if(0===e.length)return null;var t=e.children(),o=e.offset().top-r(document).scrollTop();return t.each(function(e,t){o+=r(t).outerHeight(!0)}),o},n.prototype.getFooterHeight=function(){return r("#page-footer").outerHeight()+5},n.prototype.getWindowHeight=function(){return r(window).height()},n.prototype.isHAFixed=function(){var e=r(s.findDOMNode(this.ha));return e.add(e.parents()).is(function(){return"fixed"===r(this).css("position")})},n})(i.Component);t.HA=g}),define("modules/clean/react/prompt/image",["require","exports","tslib","external/react"],function(e,t,o,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.__extends(t,e),t.prototype.render=function(){var e=this.props.srcHiRes?this.props.srcHiRes+" 2x":void 0;return r.createElement("img",{src:this.props.src,srcSet:e,alt:this.props.alt,onLoad:this.props.onLoad})},t})(r.Component);t.Image=n}),define("modules/clean/upsell/exception",["require","exports","modules/core/exception","modules/core/xhr"],function(e,t,o,r){"use strict";function n(e){var t=e.severity,n=void 0===t?o.SEVERITY.CRITICAL:t;r.sendXhr("/prompt/log_jse",{severity:n})}function reportException(e){var r=e.err,n=e.tags,i=void 0===n?[]:n,s=e.severity,a=void 0===s?o.SEVERITY.CRITICAL:s,p=e.exc_extra,c=void 0===p?{}:p;i.push(t.TAGS.PROMPT),i.push(t.TAGS.MEGAPHONE),o.reportException({err:r,tags:i,severity:a,exc_extra:c}),t.logExceptionRate({severity:a})}function i(e){var r=e.err,n=e.js_controller_options,i=void 0===n?{}:n,s=e.severity,a=void 0===s?o.SEVERITY.CRITICAL:s,p=[],c={"campaign-name":"campaignName",location:"campaignLocationId"};for(var u in c)if(c.hasOwnProperty(u)){var l=c[u],m=i[l];m&&p.push("prompt-"+u+"-"+m)}t.reportException({err:r,tags:p,severity:a,exc_extra:i})}Object.defineProperty(t,"__esModule",{value:!0}),t.SEVERITY=o.SEVERITY,t.TAGS={MEGAPHONE:"megaphone",PROMPT:"prompt",PROMPT_ADMIN:"prompt-admin",PROMPT_HA_LOADER:"prompt-ha-loader",PROMPT_LOADER:"prompt-loader",PROMPT_MAIN_AND_ACCOUNT_HEADER_LOADER:"prompt-main-and-account-header-loader",PROMPT_MUTUALLY_EXCLUSIVE_LOADER:"prompt-mutually-exclusive-loader",LEGACY_TOP_NOTIFICATIONS:"legacy-top-notifications"},t.logExceptionRate=n,t.reportException=reportException,t.reportJsControllerException=i}),function(){define("modules/clean/upsell/prompt_event_emitter",["external/eventemitter3"],function(e){return{Events:{REACT_HA_DID_UPDATE:"REACT_HA_DID_UPDATE"},Emitter:new e}})}.call(this),define("modules/clean/upsell/prompt_event_logging",["require","exports","modules/core/uri","modules/clean/ajax_minimal"],function(e,t,o,r){"use strict";function n(e,t){var r={campaign_id:t.campaignId.toString()};if("number"==typeof t.promptQueriedAtMs&&(r.prompt_queried_at_ms=t.promptQueriedAtMs.toString()),window.performance&&window.performance.timing&&window.performance.timing.navigationStart){var n=(new Date).getTime(),i=n-window.performance.timing.navigationStart;r.delta_from_request_start_ms=i.toString()}return t.activeUserId&&(r._subject_uid=String(t.activeUserId)),new o({path:e,query:r})}Object.defineProperty(t,"__esModule",{value:!0}),t.getUpsellControllerURI=n;var i=(function(){function e(e){this.params=e}return e.prototype.logImpression=function(){var e=n("/prompt/log_impression",this.params);r.post(e.toString(),"")},e.prototype.logDismissal=function(){var e=n("/prompt/dismiss",this.params);r.post(e.toString(),"")},e})();t.LegacyEventLogger=i}),define("modules/clean/upsell/prompt_loader",["require","exports","jquery","modules/clean/deprecated/uirequest","modules/clean/prompt/ha_loader","modules/clean/upsell/exception","modules/clean/user_education/user_education_loader"],function(e,t,o,r,n,i,s){"use strict";function a(e){try{e.mutually_exclusive_loading?new u({user_id:e.user_id,controller:e.controller,action:e.action,in_app:e.in_app,sprite_group:e.sprite_group,is_maestro:e.is_maestro,use_uirequest:e.use_uirequest}):(new c({user_id:e.user_id,controller:e.controller,action:e.action,in_app:e.in_app,sprite_group:e.sprite_group,is_maestro:e.is_maestro,use_uirequest:e.use_uirequest}),n.initialize_module({userID:e.user_id,controller:e.controller,action:e.action,isMaestroDesign:e.is_maestro}))}catch(t){i.reportException({err:t,tags:[i.TAGS.PROMPT_LOADER],exc_extra:{param_config:e}})}}Object.defineProperty(t,"__esModule",{value:!0});var p=(function(){function e(e){this.response_data=e}return e.prototype.didCampaignLoad=function(e,t){for(var o=this.response_data.actions||[],r=0,n=o;r<n.length;r++){var i=n[r],s=i[1];if(i[2]===e&&s)return!t||s.indexOf(t)>=0}return!1},e.prototype.didHeaderBubbleLoad=function(){return this.didCampaignLoad("^body #prompt-silo .account-header-silo","header-bubble-container")},e.prototype.didHeaderLinkLoad=function(){return!this.didHeaderBubbleLoad()&&this.didCampaignLoad("^body #prompt-silo .account-header-silo","header-link")},e.prototype.didMainCampaignLoad=function(){return this.didHeaderBubbleLoad()||this.didCampaignLoad("^body #prompt-silo .main-silo")},e.prototype.didAccountHeaderCampaignLoad=function(){return this.didHeaderBubbleLoad()||this.didHeaderLinkLoad()},e.prototype.didCampaignForUserEducationLoad=function(){return this.didCampaignLoad("^body #prompt-silo .main-silo",'"onboardingModuleName":')&&!this.didCampaignLoad("^body #prompt-silo .main-silo",'"onboardingModuleName": null')},e})(),c=(function(){function e(e){var t=this;try{e.options||(e.options={});new r(o(e.is_maestro?"#prompt-silo .main-silo":"#outer-frame"),"/prompt/main_campaign",{data:{ref_controller:e.controller,ref_action:e.action,in_app:e.in_app,sprite_group:e.sprite_group,skip_main_campaign:e.options.skip_main_campaign,is_maestro:e.is_maestro},dataType:"json",subject_user:e.user_id,success:function(r){o(".db-modal-overlay").is(":visible")||o("#db-modal-upsell-home-modal").addClass("show-upsell-modal").trigger("show-upsell-modal"),"function"==typeof e.options.success&&e.options.success(r),t.checkAndNotifyUserEducation(r)}})}catch(t){i.reportException({err:t,tags:[i.TAGS.PROMPT_MAIN_AND_ACCOUNT_HEADER_LOADER],exc_extra:{param_user_id:e.user_id,param_controller:e.controller,param_action:e.action,param_in_app:e.in_app,param_sprite_group:e.sprite_group,param_is_maestro:e.is_maestro,param_options_skip_main_campaign:e.options.skip_main_campaign}})}}return e.prototype.checkAndNotifyUserEducation=function(e){new p(e).didCampaignForUserEducationLoad()||s.UELoader.notifyModuleToLoad(null)},e})(),u=(function(){function e(e){try{this.didTopNotificationLoad()?e.options={skip_main_campaign:!0,success:function(t){new p(t).didAccountHeaderCampaignLoad()||n.initialize_module({userID:e.user_id,controller:e.controller,action:e.action,isMaestroDesign:e.is_maestro})}}:e.options={success:function(t){new p(t).didMainCampaignLoad()||n.initialize_module({userID:e.user_id,controller:e.controller,action:e.action,isMaestroDesign:e.is_maestro})}},new c(e)}catch(t){i.reportException({err:t,tags:[i.TAGS.PROMPT_MUTUALLY_EXCLUSIVE_LOADER],exc_extra:{param_user_id:e.user_id,param_controller:e.controller,param_action:e.action,param_in_app:e.in_app,param_sprite_group:e.sprite_group,param_is_maestro:e.is_maestro}})}}return e.prototype.didTopNotificationLoad=function(){return!!o("#top-notification-bar-container").length},e})();t.initialize_module=a}),function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};define("modules/clean/upsell/upsell_controller",["jquery","modules/clean/ajax","modules/clean/upsell/exception","modules/core/dom","modules/core/uri"],function(t,o,r,n,i){return(function(){function s(o,r,n){this.options=n,this.post_confirm=e(this.post_confirm,this),this.post_dismiss=e(this.post_dismiss,this),this.confirm=e(this.confirm,this),this.dismiss=e(this.dismiss,this),this._keydown=e(this._keydown,this),o.length>0&&o.one("click",(function(e){return function(t){return e.confirm(t)}})(this)),r.length>0&&r.one("click",(function(e){return function(o){var r;return r=t(o.target).hasClass("remind-me-later"),e.dismiss(o,r)}})(this)),this.options.dismissWithKeys&&t(document).on("keydown",this._keydown),s.add_tk_params(o,{addTkParams:this.options.addTkParams,campaignId:this.options.campaignId,campaignLocationTkId:this.options.campaignLocationTkId}),o.add(r).addClass("enabled")}return s.ON_SHOW_EVENT_NAME="db:prompt:show",s.ON_CONFIRM_EVENT_NAME="db:prompt:confirm",s.ON_DISMISS_EVENT_NAME="db:prompt:dismiss",s.PRE_CONFIRM_EVENT_NAME="db:prompt:pre-confirm",s.PRE_DISMISS_EVENT_NAME="db:prompt:pre-dismiss",s.CONFIRM="confirm",s.DISMISS="dismiss",s.LOG_IMPRESSION="log_impression",s.prototype._keydown=function(e){if(27===e.keyCode||8===e.keyCode&&!n.focus_in_input())return e.preventDefault(),t(document).off("keydown",this._keydown),this.dismiss(e)},s.prototype._campaignUrl=function(e,t){var o,r;if(o=this.options.activeUserId?e===s.CONFIRM?"/prompt/confirm":e===s.DISMISS?"/prompt/dismiss":e===s.LOG_IMPRESSION?"/prompt/log_impression":void 0:e===s.CONFIRM?"/upsell/confirm":e===s.DISMISS?"/upsell/dismiss":e===s.LOG_IMPRESSION?"/upsell/log_impression":void 0,this.options&&this.options.campaignId)return r=i({path:o}).updateQuery({campaign_id:this.options.campaignId}),e===s.DISMISS&&t&&r.updateQuery({remind_me_later:!0}),r.toString()},s.prototype._confirmOrDismiss=function(e,r,n,i){return"keydown"===e.type||n||(e.stopImmediatePropagation(),e.preventDefault()),o.SilentBackgroundRequest({type:"POST",url:r,subject_user:this.options.activeUserId,data:{prompt_queried_at_ms:this.options.promptQueriedAtMs,delta_from_request_start_ms:this.get_time_since_request_start()}}).done((function(o){return function(r){return"keydown"===e.type||n||e.target.click(),t(document).trigger(i,o.options)}})(this))},s.prototype.dismiss=function(e,o){var r;return r=this._campaignUrl(s.DISMISS,o),r&&this._confirmOrDismiss(e,r,!1,s.ON_DISMISS_EVENT_NAME),t(document).trigger(s.PRE_DISMISS_EVENT_NAME,this.options)},s.prototype.confirmUrl=function(e){var o,r;return o=t(e.currentTarget),r=o.is("button, input")&&"submit"===o.attr("type")?t(e.currentTarget).closest("form").attr("action"):o.is("a")?t(e.currentTarget).attr("href"):void 0,r||this.options.confirmUrl},s.prototype.confirmInNewTab=function(e){var o,r;return o=t(e.currentTarget),r=o.is("button, input")&&"submit"===o.attr("type")?t(e.currentTarget).closest("form").attr("target"):o.is("a")?t(e.currentTarget).attr("target"):void 0,r?"_blank"===r:this.options.confirmInNewTab},s.prototype.confirm=function(e){var o;return o=this._campaignUrl(s.CONFIRM),o&&this._confirmOrDismiss(e,o,this.confirmInNewTab(e),s.ON_CONFIRM_EVENT_NAME),t(document).trigger(s.PRE_CONFIRM_EVENT_NAME,this.options)},s.prototype.get_time_since_request_start=function(){var e,t;return t=window.performance&&window.performance.timing,t&&window.performance.timing.navigationStart?(e=(new Date).getTime(),e-window.performance.timing.navigationStart):void 0},s.prototype.log_impression=function(){var e;if(e=this._campaignUrl(s.LOG_IMPRESSION))return o.SilentBackgroundRequest({type:"POST",url:e,subject_user:this.options.activeUserId,data:{prompt_queried_at_ms:this.options.promptQueriedAtMs,delta_from_request_start_ms:this.get_time_since_request_start()}})},s.prototype.log_event=function(e){var t,r;if(this.options&&this.options.campaignId)return t=this.options.activeUserId?"/prompt/log_event":"/upsell/log_event",r=i({path:t}).updateQuery({event_name:e,campaign_id:this.options.campaignId}),o.SilentBackgroundRequest({type:"POST",url:r.toString(),subject_user:this.options.activeUserId,data:{prompt_queried_at_ms:this.options.promptQueriedAtMs,delta_from_request_start_ms:this.get_time_since_request_start()}})},s.prototype.post_dismiss=function(){var e;if(e=this._dismissUrl())return o.SilentBackgroundRequest({type:"POST",url:e,data:{prompt_queried_at_ms:this.options.promptQueriedAtMs,delta_from_request_start_ms:this.get_time_since_request_start()}})},s.prototype.post_confirm=function(){var e;if(e=this._confirmUrl())return o.SilentBackgroundRequest({type:"POST",url:e,data:{prompt_queried_at_ms:this.options.promptQueriedAtMs,delta_from_request_start_ms:this.get_time_since_request_start()}})},s.add_tk_params=function(e,o){var n;if(o.addTkParams)return o.campaignId&&o.campaignLocationTkId?e.each(function(e,r){var n,s,a,p;if(n=t(r),n.is("a")?a="href":(n=n.closest("form"),a="action"),p=n.attr(a),n.length>0&&p)return s=i.parse(p),s.updateQuery({_tk:o.campaignLocationTkId,_camp:o.campaignId}),n.attr(a,s.toString())}):(n=new Error("Missing campaignId or campaignLocationTkId."),void r.reportJsControllerException({err:n,js_controller_options:o,severity:r.SEVERITY.NONCRITICAL}))},s.register_custom_controller=function(e){var o,r,n,i,a;if(n=e.on_show,o=e.on_confirm,r=e.on_dismiss,i=e.pre_confirm,a=e.pre_dismiss,n&&t(document).on(s.ON_SHOW_EVENT_NAME,n),o&&t(document).on(s.ON_CONFIRM_EVENT_NAME,o),r&&t(document).on(s.ON_DISMISS_EVENT_NAME,r),i&&t(document).on(s.PRE_CONFIRM_EVENT_NAME,i),a)return t(document).on(s.PRE_DISMISS_EVENT_NAME,a)},s.unregister_custom_controller=function(e){var o,r,n,i,a;if(n=e.on_show,o=e.on_confirm,r=e.on_dismiss,i=e.pre_confirm,a=e.pre_dismiss,n&&t(document).off(s.ON_SHOW_EVENT_NAME,n),o&&t(document).off(s.ON_CONFIRM_EVENT_NAME,o),r&&t(document).off(s.ON_DISMISS_EVENT_NAME,r),i&&t(document).off(s.PRE_CONFIRM_EVENT_NAME,i),a)return t(document).off(s.PRE_DISMISS_EVENT_NAME,a)},s})()})}.call(this),define("modules/clean/user_education/user_education_loader",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=(function(){function e(){this.loadMessage=null,this.callback=null}return e.prototype.notifyModuleToLoad=function(e){this.callback?(this.callback(e),this.callback=null):this.loadMessage={moduleName:e}},e.prototype.setLoadingCallback=function(e){this.loadMessage?e(this.loadMessage.moduleName):this.callback=e},e})();t.UELoader=new o});
//# sourceMappingURL=pkg-prompt.min.js-vfl1INh6L.map