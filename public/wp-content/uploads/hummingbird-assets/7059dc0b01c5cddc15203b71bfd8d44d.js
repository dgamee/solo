/**handles:cookie-law-info**/
CLI_ACCEPT_COOKIE_NAME="undefined"!=typeof CLI_ACCEPT_COOKIE_NAME?CLI_ACCEPT_COOKIE_NAME:"viewed_cookie_policy",CLI_PREFERNCE_COOKIE="undefined"!=typeof CLI_PREFERNCE_COOKIE?CLI_PREFERNCE_COOKIE:"CookieLawInfoConsent",CLI_ACCEPT_COOKIE_EXPIRE="undefined"!=typeof CLI_ACCEPT_COOKIE_EXPIRE?CLI_ACCEPT_COOKIE_EXPIRE:365,CLI_COOKIEBAR_AS_POPUP="undefined"!=typeof CLI_COOKIEBAR_AS_POPUP&&CLI_COOKIEBAR_AS_POPUP;var CLI_Cookie={set:function(t,e,i){var o="";if(!0===Boolean(Cli_Data.secure_cookies)&&(o=";secure"),i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3);var s="; expires="+n.toGMTString()}else var s="";if(document.cookie=t+"="+e+o+s+"; path=/",i<1){if(host_name=window.location.hostname,document.cookie=t+"="+e+s+"; path=/; domain=."+host_name+";",1!=host_name.indexOf("www")){var a=host_name.replace("www","");document.cookie=t+"="+e+o+s+"; path=/; domain="+a+";"}host_name=host_name.substring(host_name.lastIndexOf(".",host_name.lastIndexOf(".")-1)),document.cookie=t+"="+e+o+s+"; path=/; domain="+host_name+";"}},read:function(t){for(var e=t+"=",i=document.cookie.split(";"),o=0;o<i.length;o++){for(var n=i[o];" "==n.charAt(0);)n=n.substring(1,n.length);if(0===n.indexOf(e))return n.substring(e.length,n.length)}return null},erase:function(t){this.set(t,"",-10)},exists:function(t){return null!==this.read(t)},getallcookies:function(){for(var t=document.cookie.split(";"),e={},i=0;i<t.length;i++){var o=t[i].split("=");e[(o[0]+"").trim()]=unescape(o[1])}return e}},CLI={bar_config:{},showagain_config:{},allowedCategories:[],js_blocking_enabled:!1,set:function(t){if("function"!=typeof JSON.parse)return void console.log("CookieLawInfo requires JSON.parse but your browser doesn't support it");"object"!=typeof t.settings?this.settings=JSON.parse(t.settings):this.settings=t.settings,this.js_blocking_enabled=Boolean(Cli_Data.js_blocking),this.settings=t.settings,this.bar_elm=jQuery(this.settings.notify_div_id),this.showagain_elm=jQuery(this.settings.showagain_div_id),this.settingsModal=jQuery("#cliSettingsPopup"),this.main_button=jQuery(".cli-plugin-main-button"),this.main_link=jQuery(".cli-plugin-main-link"),this.reject_link=jQuery(".cookie_action_close_header_reject"),this.delete_link=jQuery(".cookielawinfo-cookie-delete"),this.settings_button=jQuery(".cli_settings_button"),this.accept_all_button=jQuery(".wt-cli-accept-all-btn"),"popup"==this.settings.cookie_bar_as&&(CLI_COOKIEBAR_AS_POPUP=!0),this.addStyleAttribute(),this.configBar(),this.toggleBar(),this.attachDelete(),this.attachEvents(),this.configButtons(),this.reviewConsent();var e=this.hideBarInReadMoreLink();!0===Boolean(this.settings.scroll_close)&&!1===e&&window.addEventListener("scroll",CLI.closeOnScroll,!1)},hideBarInReadMoreLink:function(){return!!(!0===Boolean(CLI.settings.button_2_hidebar)&&this.main_link.length>0&&this.main_link.hasClass("cli-minimize-bar"))&&(this.hideHeader(),cliBlocker.cookieBar(!1),this.showagain_elm.slideDown(this.settings.animate_speed_show),!0)},attachEvents:function(){jQuery(document).on("click",".wt-cli-privacy-btn",function(t){t.preventDefault(),CLI.accept_close(),CLI.settingsPopUpClose()}),jQuery(".cli_action_button").on("click",function(t){t.preventDefault();var e=jQuery(this),i=e.attr("data-cli_action"),o=!(!e[0].hasAttribute("href")||"#"==e.attr("href")),n=!1;"accept"==i?(CLI.accept_close(),n=!!Boolean(CLI.settings.button_1_new_win)):"accept_all"==i?(CLI.enableAllCookies(),CLI.accept_close(),n=!!CLI.settings.button_7_new_win):"reject"==i&&(CLI.reject_close(),n=!!Boolean(CLI.settings.button_3_new_win)),o&&(n?window.open(e.attr("href"),"_blank"):window.location.href=e.attr("href"))}),this.settingsPopUp(),this.settingsTabbedAccordion(),this.toggleUserPreferenceCheckBox(),this.hideCookieBarOnClose(),this.cookieLawInfoRunCallBacks()},toggleUserPreferenceCheckBox:function(){jQuery(".cli-user-preference-checkbox").each(function(){categoryCookie="cookielawinfo-"+jQuery(this).attr("data-id"),categoryCookieValue=CLI_Cookie.read(categoryCookie),null==categoryCookieValue?jQuery(this).is(":checked")?CLI_Cookie.set(categoryCookie,"yes",CLI_ACCEPT_COOKIE_EXPIRE):CLI_Cookie.set(categoryCookie,"no",CLI_ACCEPT_COOKIE_EXPIRE):"yes"==categoryCookieValue?jQuery(this).prop("checked",!0):jQuery(this).prop("checked",!1)}),jQuery(".cli-user-preference-checkbox").on("click",function(t){var e=jQuery(this).attr("data-id"),i=jQuery(".cli-user-preference-checkbox[data-id="+e+"]");jQuery(this).is(":checked")?(CLI_Cookie.set("cookielawinfo-"+e,"yes",CLI_ACCEPT_COOKIE_EXPIRE),i.prop("checked",!0)):(CLI_Cookie.set("cookielawinfo-"+e,"no",CLI_ACCEPT_COOKIE_EXPIRE),i.prop("checked",!1)),CLI.checkCategories(),CLI.generateConsent()})},settingsPopUp:function(){jQuery(document).on("click",".cli_settings_button",function(t){t.preventDefault(),CLI.settingsModal.addClass("cli-show").css({opacity:0}).animate({opacity:1}),CLI.settingsModal.removeClass("cli-blowup cli-out").addClass("cli-blowup"),jQuery("body").addClass("cli-modal-open"),jQuery(".cli-settings-overlay").addClass("cli-show"),jQuery("#cookie-law-info-bar").css({opacity:.1}),jQuery(".cli-settings-mobile").is(":visible")||CLI.settingsModal.find(".cli-nav-link:eq(0)").trigger("click")}),jQuery("#cliModalClose").on("click",function(t){CLI.settingsPopUpClose()}),CLI.settingsModal.on("click",function(t){document.getElementsByClassName("cli-modal-dialog")[0].contains(t.target)||CLI.settingsPopUpClose()}),jQuery(".cli_enable_all_btn").on("click",function(t){var e=jQuery(this),i=e.attr("data-enable-text"),o=e.attr("data-disable-text");e.hasClass("cli-enabled")?(CLI.disableAllCookies(),e.html(i)):(CLI.enableAllCookies(),e.html(o)),jQuery(this).toggleClass("cli-enabled")}),this.privacyReadmore()},settingsTabbedAccordion:function(){jQuery(".cli-tab-header").on("click",function(t){jQuery(t.target).hasClass("cli-slider")||jQuery(t.target).hasClass("cli-user-preference-checkbox")||(jQuery(this).hasClass("cli-tab-active")?(jQuery(this).removeClass("cli-tab-active"),jQuery(this).siblings(".cli-tab-content").slideUp(200)):(jQuery(".cli-tab-header").removeClass("cli-tab-active"),jQuery(this).addClass("cli-tab-active"),jQuery(".cli-tab-content").slideUp(200),jQuery(this).siblings(".cli-tab-content").slideDown(200)))})},settingsPopUpClose:function(){this.settingsModal.removeClass("cli-show"),this.settingsModal.addClass("cli-out"),jQuery("body").removeClass("cli-modal-open"),jQuery(".cli-settings-overlay").removeClass("cli-show"),jQuery("#cookie-law-info-bar").css({opacity:1})},privacyReadmore:function(){var t=jQuery(".cli-privacy-content .cli-privacy-content-text");if(t.length>0){var e=t.clone(),i=e.html(),o=t.outerHeight(),n={addReadmore:function(t){t.html().length>250?jQuery(".cli-privacy-readmore").show():jQuery(".cli-privacy-readmore").hide()},truncateText:function(t){var e=jQuery("<div />").html(t.html());if(e.find("table").remove(),t.html(e.html()),currentText=t.text(),currentText.trim().length>250){var i=currentText.substring(0,250);t.empty().html(i).append("...")}},replaceText:function(t,e){return t.html(e)}};n.addReadmore(t),n.truncateText(t),jQuery("a.cli-privacy-readmore").on("click",function(e){e.preventDefault(),jQuery(".cli-privacy-overview").hasClass("cli-collapsed")?(n.truncateText(t),jQuery(".cli-privacy-overview").removeClass("cli-collapsed"),t.css("height","100%")):(jQuery(".cli-privacy-overview").addClass("cli-collapsed"),n.replaceText(t,i))})}},attachDelete:function(){this.delete_link.on("click",function(t){CLI_Cookie.erase(CLI_ACCEPT_COOKIE_NAME);for(var e in Cli_Data.nn_cookie_ids)CLI_Cookie.erase(Cli_Data.nn_cookie_ids[e]);return CLI.generateConsent(),!1})},configButtons:function(){this.main_button.css("color",this.settings.button_1_link_colour),Boolean(this.settings.button_1_as_button)&&(this.main_button.css("background-color",this.settings.button_1_button_colour),this.main_button.on("mouseenter",function(){jQuery(this).css("background-color",CLI.settings.button_1_button_hover)}).on("mouseleave",function(){jQuery(this).css("background-color",CLI.settings.button_1_button_colour)})),this.main_link.css("color",this.settings.button_2_link_colour),Boolean(this.settings.button_2_as_button)&&(this.main_link.css("background-color",this.settings.button_2_button_colour),this.main_link.on("mouseenter",function(){jQuery(this).css("background-color",CLI.settings.button_2_button_hover)}).on("mouseleave",function(){jQuery(this).css("background-color",CLI.settings.button_2_button_colour)})),this.reject_link.css("color",this.settings.button_3_link_colour),Boolean(this.settings.button_3_as_button)&&(this.reject_link.css("background-color",this.settings.button_3_button_colour),this.reject_link.on("mouseenter",function(){jQuery(this).css("background-color",CLI.settings.button_3_button_hover)}).on("mouseleave",function(){jQuery(this).css("background-color",CLI.settings.button_3_button_colour)})),this.settings_button.css("color",this.settings.button_4_link_colour),Boolean(this.settings.button_4_as_button)&&(this.settings_button.css("background-color",this.settings.button_4_button_colour),this.settings_button.on("mouseenter",function(){jQuery(this).css("background-color",CLI.settings.button_4_button_hover)}).on("mouseleave",function(){jQuery(this).css("background-color",CLI.settings.button_4_button_colour)})),this.accept_all_button.css("color",this.settings.button_7_link_colour),this.settings.button_7_as_button&&(this.accept_all_button.css("background-color",this.settings.button_7_button_colour),this.accept_all_button.on("mouseenter",function(){jQuery(this).css("background-color",CLI.settings.button_7_button_hover)}).on("mouseleave",function(){jQuery(this).css("background-color",CLI.settings.button_7_button_colour)}))},toggleBar:function(){CLI_COOKIEBAR_AS_POPUP&&this.barAsPopUp(1),"widget"==CLI.settings.cookie_bar_as&&this.barAsWidget(1),CLI_Cookie.exists(CLI_ACCEPT_COOKIE_NAME)?this.hideHeader():this.displayHeader(),Boolean(this.settings.show_once_yn)&&setTimeout(function(){CLI.close_header()},CLI.settings.show_once),!1===CLI.js_blocking_enabled&&(!0===Boolean(Cli_Data.ccpaEnabled)?"ccpa"===Cli_Data.ccpaType&&!1===Boolean(Cli_Data.ccpaBarEnabled)&&cliBlocker.cookieBar(!1):jQuery(".wt-cli-ccpa-opt-out,.wt-cli-ccpa-checkbox,.wt-cli-ccpa-element").remove()),this.showagain_elm.on("click",function(t){t.preventDefault(),CLI.showagain_elm.slideUp(CLI.settings.animate_speed_hide,function(){CLI.bar_elm.slideDown(CLI.settings.animate_speed_show),CLI_COOKIEBAR_AS_POPUP&&CLI.showPopupOverlay()})})},configShowAgain:function(){if(this.showagain_config={"background-color":this.settings.background,color:this.l1hs(this.settings.text),position:"fixed","font-family":this.settings.font_family},Boolean(this.settings.border_on)){var t="border-"+this.settings.notify_position_vertical;this.showagain_config.border="1px solid "+this.l1hs(this.settings.border),this.showagain_config[t]="none"}var e=jQuery(window),i=e.width(),o=this.settings.showagain_x_position;i<300?(o=10,this.showagain_config.width=i-20):this.showagain_config.width="auto";var n=i>400?500:i-20;if(CLI_COOKIEBAR_AS_POPUP){var s=this.settings.popup_showagain_position,a=s.split("-");"left"==a[1]?this.showagain_config.left=o:"right"==a[1]&&(this.showagain_config.right=o),"top"==a[0]?this.showagain_config.top=0:"bottom"==a[0]&&(this.showagain_config.bottom=0),this.bar_config.position="fixed"}else"widget"==this.settings.cookie_bar_as?(this.showagain_config.bottom=0,"left"==this.settings.widget_position?this.showagain_config.left=o:"right"==this.settings.widget_position&&(this.showagain_config.right=o)):("top"==this.settings.notify_position_vertical?this.showagain_config.top="0":"bottom"==this.settings.notify_position_vertical&&(this.bar_config.position="fixed",this.bar_config.bottom="0",this.showagain_config.bottom="0"),"left"==this.settings.notify_position_horizontal?this.showagain_config.left=o:"right"==this.settings.notify_position_horizontal&&(this.showagain_config.right=o));this.showagain_elm.css(this.showagain_config)},configBar:function(){this.bar_config={"background-color":this.settings.background,color:this.settings.text,"font-family":this.settings.font_family},"top"==this.settings.notify_position_vertical?(this.bar_config.top="0",!0===Boolean(this.settings.header_fix)&&(this.bar_config.position="fixed")):this.bar_config.bottom="0",this.configShowAgain(),this.bar_elm.css(this.bar_config).hide()},l1hs:function(t){return"#"!=t.charAt(0)?"#"+t:(t=t.substring(1,t.length),this.l1hs(t))},close_header:function(){CLI_Cookie.set(CLI_ACCEPT_COOKIE_NAME,"yes",CLI_ACCEPT_COOKIE_EXPIRE),this.hideHeader()},accept_close:function(){return this.hidePopupOverlay(),this.generateConsent(),this.cookieLawInfoRunCallBacks(),CLI_Cookie.set(CLI_ACCEPT_COOKIE_NAME,"yes",CLI_ACCEPT_COOKIE_EXPIRE),Boolean(this.settings.notify_animate_hide)?!0===CLI.js_blocking_enabled?this.bar_elm.slideUp(this.settings.animate_speed_hide,cliBlocker.runScripts):this.bar_elm.slideUp(this.settings.animate_speed_hide):!0===CLI.js_blocking_enabled?this.bar_elm.hide(cliBlocker.runScripts):this.bar_elm.hide(),Boolean(this.settings.showagain_tab)&&this.showagain_elm.slideDown(this.settings.animate_speed_show),!0===Boolean(this.settings.accept_close_reload)&&this.reload_current_page(),!1},reject_close:function(){this.hidePopupOverlay(),this.generateConsent(),this.cookieLawInfoRunCallBacks();for(var t in Cli_Data.nn_cookie_ids)CLI_Cookie.erase(Cli_Data.nn_cookie_ids[t]);return CLI_Cookie.set(CLI_ACCEPT_COOKIE_NAME,"no",CLI_ACCEPT_COOKIE_EXPIRE),Boolean(this.settings.notify_animate_hide)?!0===CLI.js_blocking_enabled?this.bar_elm.slideUp(this.settings.animate_speed_hide,cliBlocker.runScripts):this.bar_elm.slideUp(this.settings.animate_speed_hide):!0===CLI.js_blocking_enabled?this.bar_elm.hide(cliBlocker.runScripts):this.bar_elm.hide(),Boolean(this.settings.showagain_tab)&&this.showagain_elm.slideDown(this.settings.animate_speed_show),!0===Boolean(this.settings.reject_close_reload)&&this.reload_current_page(),!1},reload_current_page:function(){"undefined"!=typeof cli_flush_cache&&!0===cli_flush_cache?window.location.href=this.add_clear_cache_url_query():window.location.reload(!0)},add_clear_cache_url_query:function(){var t=(new Date).getTime()/1e3,e=window.location.href,i=e.split("#"),o=i[0].split("?");if(o.length>=2){var n=o[1].split("&");cli_url_temp_arr=new Array;for(var s=0;s<n.length;s++){"cli_action"==n[s].split("=")[0]||cli_url_temp_arr.push(n[s])}o[1]=cli_url_temp_arr.join("&"),e=o.join("?")+(cli_url_temp_arr.length>0?"&":"")+"cli_action="}else e=i[0]+"?cli_action=";return e+=t,i.length>1&&(e+="#"+i[1]),e},closeOnScroll:function(){window.pageYOffset>100&&!CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME)&&(CLI.accept_close(),!0===Boolean(CLI.settings.scroll_close_reload)&&window.location.reload(),window.removeEventListener("scroll",CLI.closeOnScroll,!1))},displayHeader:function(){Boolean(this.settings.notify_animate_show)?this.bar_elm.slideDown(this.settings.animate_speed_show):this.bar_elm.show(),this.showagain_elm.hide(),CLI_COOKIEBAR_AS_POPUP&&this.showPopupOverlay()},hideHeader:function(){Boolean(this.settings.showagain_tab)?Boolean(this.settings.notify_animate_show)?this.showagain_elm.slideDown(this.settings.animate_speed_show):this.showagain_elm.show():this.showagain_elm.hide(),this.bar_elm.slideUp(this.settings.animate_speed_show),this.hidePopupOverlay()},hidePopupOverlay:function(){jQuery("body").removeClass("cli-barmodal-open"),jQuery(".cli-popupbar-overlay").removeClass("cli-show")},showPopupOverlay:function(){this.bar_elm.length&&Boolean(this.settings.popup_overlay)&&(jQuery("body").addClass("cli-barmodal-open"),jQuery(".cli-popupbar-overlay").addClass("cli-show"))},barAsWidget:function(t){var e=this.bar_elm;e.attr("data-cli-type","widget");var i=jQuery(window),o=i.height()-40,n=i.width(),s=n>400?300:n-30;e.css({width:s,height:"auto","max-height":o,overflow:"auto",position:"fixed","box-sizing":"border-box"}),!1===this.checkifStyleAttributeExist()&&e.css({padding:"25px 15px"}),"left"==this.settings.widget_position?e.css({left:"15px",right:"auto",bottom:"15px",top:"auto"}):e.css({left:"auto",right:"15px",bottom:"15px",top:"auto"}),t&&this.setResize()},barAsPopUp:function(t){if("function"==typeof cookie_law_info_bar_as_popup)return!1;var e=this.bar_elm;e.attr("data-cli-type","popup");var i=jQuery(window),o=i.height()-40,n=i.width(),s=n>700?500:n-20;e.css({width:s,height:"auto","max-height":o,bottom:"",top:"50%",left:"50%","margin-left":s/2*-1,"margin-top":"-100px",overflow:"auto"}).addClass("cli-bar-popup cli-modal-content"),!1===this.checkifStyleAttributeExist()&&e.css({padding:"25px 15px"}),cli_h=e.height(),li_h=cli_h<200?200:cli_h,e.css({top:"50%","margin-top":-1*(cli_h/2+30)}),setTimeout(function(){e.css({bottom:""})},100),t&&this.setResize()},setResize:function(){var t=null;jQuery(window).resize(function(){clearTimeout(t),t=setTimeout(function(){CLI_COOKIEBAR_AS_POPUP&&CLI.barAsPopUp(),"widget"==CLI.settings.cookie_bar_as&&CLI.barAsWidget(),CLI.configShowAgain()},500)})},enableAllCookies:function(){jQuery(".cli-user-preference-checkbox").each(function(){var t=jQuery(this),e=t.attr("data-id");"checkbox-necessary"!=e&&(t.prop("checked",!0),CLI_Cookie.set("cookielawinfo-"+e,"yes",CLI_ACCEPT_COOKIE_EXPIRE))})},hideCookieBarOnClose:function(){jQuery(document).on("click",".cli_cookie_close_button",function(t){t.preventDefault();var e=jQuery(this),i=e.attr("data-cli_action");"ccpa"===Cli_Data.ccpaType&&CLI.enableAllCookies(),CLI.accept_close()})},checkCategories:function(){var t=[],e={};jQuery(".cli-user-preference-checkbox").each(function(){var i=!1;cli_chkbox_elm=jQuery(this),cli_chkbox_data_id=cli_chkbox_elm.attr("data-id"),cli_chkbox_data_id=cli_chkbox_data_id.replace("checkbox-",""),cli_chkbox_data_id_trimmed=cli_chkbox_data_id.replace("-","_"),jQuery(cli_chkbox_elm).is(":checked")&&(i=!0,t.push(cli_chkbox_data_id)),e[cli_chkbox_data_id_trimmed]=i}),CLI.allowedCategories=t},cookieLawInfoRunCallBacks:function(){this.checkCategories(),"yes"==CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME)&&"function"==typeof CookieLawInfo_Accept_Callback&&CookieLawInfo_Accept_Callback()},generateConsent:function(){var t=CLI_Cookie.read(CLI_PREFERNCE_COOKIE);cliConsent={},null!==t&&(cliConsent=window.atob(t),cliConsent=JSON.parse(cliConsent)),cliConsent.ver=Cli_Data.consentVersion,categories=[],jQuery(".cli-user-preference-checkbox").each(function(){categoryVal="",cli_chkbox_data_id=jQuery(this).attr("data-id"),cli_chkbox_data_id=cli_chkbox_data_id.replace("checkbox-",""),jQuery(this).is(":checked")?categoryVal=!0:categoryVal=!1,cliConsent[cli_chkbox_data_id]=categoryVal}),cliConsent=JSON.stringify(cliConsent),cliConsent=window.btoa(cliConsent),CLI_Cookie.set(CLI_PREFERNCE_COOKIE,cliConsent,CLI_ACCEPT_COOKIE_EXPIRE)},addStyleAttribute:function(){var t=this.bar_elm,e="";jQuery(t).find(".cli-bar-container").length>0&&(e=jQuery(".cli-bar-container").attr("class"),e=e.replace("cli-bar-container",""),e=e.trim(),jQuery(t).attr("data-cli-style",e))},getParameterByName:function(t,e){e||(e=window.location.href),t=t.replace(/[\[\]]/g,"\\$&");var i=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)"),o=i.exec(e);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null},CookieLawInfo_Callback:function(t,e){t=void 0===t||t,e=void 0===e||e,!0===CLI.js_blocking_enabled&&!0===Boolean(Cli_Data.custom_integration)&&(cliBlocker.cookieBar(t),cliBlocker.runScripts(e))},checkifStyleAttributeExist:function(){var t=!1,e=this.bar_elm.attr("data-cli-style");return void 0!==e&&!1!==e&&(t=!0),t},reviewConsent:function(){jQuery(document).on("click",".cli_manage_current_consent,.wt-cli-manage-consent-link",function(){CLI.displayHeader()})}},cliBlocker={blockingStatus:!0,scriptsLoaded:!1,ccpaEnabled:!1,ccpaRegionBased:!1,ccpaApplicable:!1,ccpaBarEnabled:!1,cliShowBar:!0,isBypassEnabled:CLI.getParameterByName("cli_bypass"),checkPluginStatus:function(t,e){this.ccpaEnabled=Boolean(Cli_Data.ccpaEnabled),this.ccpaRegionBased=Boolean(Cli_Data.ccpaRegionBased),this.ccpaBarEnabled=Boolean(Cli_Data.ccpaBarEnabled),!0===Boolean(Cli_Data.custom_integration)?t(!1):(!0===this.ccpaEnabled?(this.ccpaApplicable=!0,"ccpa"===Cli_Data.ccpaType&&!0!==this.ccpaBarEnabled&&(this.cliShowBar=!1,this.blockingStatus=!1)):jQuery(".wt-cli-ccpa-opt-out,.wt-cli-ccpa-checkbox,.wt-cli-ccpa-element").remove(),"1"===cliBlocker.isBypassEnabled&&(cliBlocker.blockingStatus=!1),t(this.cliShowBar),e(this.blockingStatus))},cookieBar:function(t){t=void 0===t||t,cliBlocker.cliShowBar=t,!1===cliBlocker.cliShowBar?(CLI.bar_elm.hide(),CLI.showagain_elm.hide(),CLI.settingsModal.removeClass("cli-blowup cli-out"),CLI.hidePopupOverlay(),jQuery(".cli-settings-overlay").removeClass("cli-show")):(CLI_Cookie.exists(CLI_ACCEPT_COOKIE_NAME)?CLI.hideHeader():CLI.displayHeader(),CLI.settingsModal.show(),jQuery(".cli-modal-backdrop").show())},removeCookieByCategory:function(){if(!0===cliBlocker.blockingStatus&&null!==CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME)){var t=Cli_Data.non_necessary_cookies;for(var e in t)if(currentCategory=e,-1===CLI.allowedCategories.indexOf(currentCategory))for(var i=t[currentCategory],o=0;o<i.length;o++)null!==CLI_Cookie.read(i[o])&&CLI_Cookie.erase(i[o])}},runScripts:function(t){t=void 0===t||t,cliBlocker.blockingStatus=t,srcReplaceableElms=["iframe","IFRAME","EMBED","embed","OBJECT","object","IMG","img"];var e={renderByElement:function(t){i.renderScripts(),t(),cliBlocker.scriptsLoaded=!0}},i={scriptsDone:function(){if(void 0!==Cli_Data.triggerDomRefresh&&!0===Boolean(Cli_Data.triggerDomRefresh)){var t=document.createEvent("Event");t.initEvent("DOMContentLoaded",!0,!0),window.document.dispatchEvent(t)}},seq:function(t,e,o){void 0===o&&(o=0),t[o](function(){o++,o===t.length?e():i.seq(t,e,o)})},insertScript:function(t,e){var i="",o=t.getAttribute("data-cli-script-type"),n=t.getAttribute("data-cli-element-position"),s=t.getAttribute("data-cli-block"),i=document.createElement("script"),a=cliBlocker.ccpaOptedOut();i.type="text/plain",t.async&&(i.async=t.async),t.defer&&(i.defer=t.defer),t.src?(i.onload=e,i.onerror=e,i.src=t.src):i.textContent=t.innerText;for(var c=jQuery(t).prop("attributes"),l=0;l<c.length;++l)"id"!==c[l].nodeName&&i.setAttribute(c[l].nodeName,c[l].value);!0===cliBlocker.blockingStatus?("yes"==CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME)&&-1!==CLI.allowedCategories.indexOf(o)&&(i.setAttribute("data-cli-consent","accepted"),i.type="text/javascript"),!0===cliBlocker.ccpaApplicable&&(!0!==a&&null!=CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME)||(i.type="text/plain"))):i.type="text/javascript",t.type!=i.type?("head"===n?document.head.appendChild(i):document.body.appendChild(i),t.src||e(),t.parentNode.removeChild(t)):e()},renderScripts:function(){var t=document.querySelectorAll('script[data-cli-class="cli-blocker-script"]');if(t.length>0){var e=[],o;Array.prototype.forEach.call(t,function(t){o=t.getAttribute("type"),e.push(function(e){i.insertScript(t,e)})}),i.seq(e,i.scriptsDone)}}};e.renderByElement(cliBlocker.removeCookieByCategory)},ccpaOptedOut:function(){var t=!1,e=CLI_Cookie.read(CLI_PREFERNCE_COOKIE);return null!==e&&(cliConsent=window.atob(e),cliConsent=JSON.parse(cliConsent),void 0!==cliConsent.ccpaOptout&&(t=cliConsent.ccpaOptout)),t}};jQuery(document).ready(function(){"undefined"!=typeof cli_cookiebar_settings&&(CLI.set({settings:cli_cookiebar_settings}),!0===CLI.js_blocking_enabled&&cliBlocker.checkPluginStatus(cliBlocker.cookieBar,cliBlocker.runScripts))});