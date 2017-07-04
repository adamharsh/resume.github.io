(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};define(["jquery","modules/clean/ajax","modules/core/browser","modules/core/html","modules/core/i18n","modules/core/notify","modules/core/uri","modules/clean/legacy_pyxl_controllers/ajax_form","modules/clean/em_string","modules/clean/unity/features","modules/clean/unity/features/web_destiny","modules/constants/unity"],function(e,i,n,o,_,r,s,a,l,c,u,h){var d;return d=_._,(function(){function e(e){this._fill_login_error=t(this._fill_login_error,this),this._show_unity_server_error=t(this._show_unity_server_error,this),this._show_unity_client_error=t(this._show_unity_client_error,this),this._web_destiny_login=t(this._web_destiny_login,this),this._show_web_destiny=t(this._show_web_destiny,this),this._web_destiny_connect_callback=t(this._web_destiny_connect_callback,this),this._check_if_previous_login_failed=t(this._check_if_previous_login_failed,this),this.maybe_show_web_destiny=t(this.maybe_show_web_destiny,this),this.$login_form=e.find(".login-form"),this.cont=this.$login_form.find("input[name='cont']").val(),this.$web_destiny_container=e.find("#web-destiny-container"),this.button=this.$web_destiny_container.find("#continue-as-button")}return e.prototype.maybe_show_web_destiny=function(){if(this._is_destiny_enabled())return this._check_if_previous_login_failed()?void this._show_unity_server_error():(this._web_destiny=new u,this._web_destiny.start_connection(this._web_destiny_connect_callback))},e.prototype._check_if_previous_login_failed=function(){return this.cont.indexOf("/login_complete?refresh_token=")>=0},e.prototype._is_destiny_enabled=function(){return 0!==this.$web_destiny_container.length&&(null!=u&&("/login"===n.get_uri().path||h.UNITY_WEB_DESTINY_ALL_PAGES)&&!this._is_safari_private_mode()&&this._is_path_allowed(window.location.pathname))},e.prototype._is_path_allowed=function(t){var e,i,n,o;for(e=["/dropins","/chooser","/saver","/fb"],n=0,o=e.length;n<o;n++)if(i=e[n],0===t.indexOf(i))return!1;return!0},e.prototype._local_storage_supported=function(){try{return localStorage.setItem("web-destiny-localStorage-test","true"),!0}catch(t){return!1}},e.prototype._is_safari_private_mode=function(){return n.safari&&!this._local_storage_supported()},e.prototype._web_destiny_connect_callback=function(t){var e,i;return e=this._make_display_name_text(t),i=this.$web_destiny_container.find(".continue-as-user-name"),i.text(e),this.button.click(this._web_destiny_login),this._show_web_destiny()},e.prototype._make_display_name_text=function(t){return d("Continue as %(real_name)s",{comment:"Log in automatically as NAME"}).format({real_name:t})},e.prototype._show_web_destiny=function(){return this.button.attr("disabled",!1),this.$web_destiny_container.hide().css({visibility:"visible",display:""}).fadeIn("fast")},e.prototype._web_destiny_login=function(){var t,e,i,o;"/login"!==window.location.pathname&&""===this.cont&&(this.cont=window.location.pathname+window.location.search),n.msie||!this._local_storage_supported()||this._web_destiny.is_direct_allowed()?(e=this.cont,i="/"):(e="/",i=this.cont);try{localStorage.setItem("web-destiny-redirect-uri",i)}catch(t){}return t=this._get_check_signed_in_ajax_callback(this._show_unity_client_error),o=this._get_unity_client_error_callback(t,this._show_unity_client_error),this._web_destiny.continue_as_user(e,o),r.warning(d("We’re trying to log you in automatically")),this.button.attr("disabled",!0)},e.prototype._get_unity_client_error_callback=function(t,e){return function(){return new i.SilentBackgroundRequest({url:"/is_signed_in",success:t,error:e})}},e.prototype._get_check_signed_in_ajax_callback=function(t){return function(e){return"ok"===e?n.reload():t()}},e.prototype._show_unity_client_error=function(){return this._fill_login_error(d("Sorry, we weren’t able to sign you in. Please enter your email and password to sign in.")),this.button.attr("disabled",!0)},e.prototype._show_unity_server_error=function(){return this._fill_login_error(d("Please enter your email and password to sign in."))},e.prototype._fill_login_error=function(t){return a.fill_errors(this.$login_form,{login_email:{message_text:t}})},e})()})}).call(this);
//# sourceMappingURL=web_destiny_ui.min.js-vflOfgq5Y.map