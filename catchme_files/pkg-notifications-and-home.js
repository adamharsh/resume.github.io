(function(){define("modules/clean/avatar/initials_avatar_with_color",["jquery","external/react","modules/clean/avatar/initials_avatar","modules/clean/avatar/style"],function(e,t,n,i){var o,r;return r=i.colorValueForAvatarName,o=t.createElement,t.createClass({displayName:"InitialsAvatarWithColorDerivedFromName",propTypes:{name:t.PropTypes.string.isRequired},render:function(){var t;return t=e.extend({color:r(this.props.name)},this.props),delete t.name,o(n,t)}})})}).call(this),define("modules/clean/loggers/notification_logger",["require","exports","modules/clean/ajax","modules/clean/react/user_notifications/models"],function(e,t,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NotificationLocations={TRAY:"home",HOME_PAGE:"home_page"};var o=(function(){function e(){}return e.logReceive=function(t){for(var n=[],i=0,o=t;i<o.length;i++){var r=o[i];n.push(e.getCommonEventData("receive",r))}e.log(n)},e.logRender=function(t,n,i){var o=[];t.forEach(function(t,r){var a=e.getCommonEventData("render",t);a.location=i,a.location_index=n+r,o.push(a)}),e.log(o)},e.logAction=function(t,n,i){var o=e.getCommonEventData("action",t);o.action_taken=n,i&&(o.location=i),e.log([o])},e.logMarkAsRead=function(t,n){for(var i=[],o=0,r=t;o<r.length;o++){var a=r[o],s=e.getCommonEventData("mark_read",a);s.location=n,i.push(s)}e.log(i)},e.log=function(e){0!==e.length&&n.SilentBackgroundRequest({url:"/log/notif_events",data:{event_list:JSON.stringify(e)}})},e.getCommonEventData=function(e,t){return{event_name:e,type_id:t.typeId,campaign_id:t.campaignId,campaign_version:t.campaignVersion,instance_id:parseInt(t.id,10),status:i.NotificationStatusStrings[t.status],seen_state:t.seenState,target_object_key:t.targetObjectKey}},e})();t.NotificationLogger=o}),define("modules/clean/loggers/notification_tray_logger",["require","exports","modules/clean/ajax"],function(e,t,n){"use strict";function i(e){r({event_name:"tray_popup_shown",badge_count:e})}function o(){r({event_name:"mark_all_as_read"})}function r(e){n.SilentBackgroundRequest({url:"/log/notif_tray_events",data:{event_dict:JSON.stringify(e)}})}Object.defineProperty(t,"__esModule",{value:!0}),t.logTrayOpen=i,t.logMarkAllAsRead=o}),define("modules/clean/react/user_notifications/actions",["require","exports","modules/clean/loggers/notification_logger","modules/clean/loggers/notification_tray_logger","modules/clean/notserver","modules/clean/react/user_notifications/api","modules/clean/react/user_notifications/constants","modules/clean/react/user_notifications/dispatcher","modules/clean/react/user_notifications/models","modules/clean/react/user_notifications/store","modules/clean/referrer_cleansing_redirect"],function(e,t,n,i,o,r,a,s,c,u,l){"use strict";return new((function(){function t(){}return t.prototype.asyncSharingAction=function(t){e(["modules/clean/react/user_notifications/sharing_actions"],t)},t.prototype.asyncGroupAction=function(t){e(["modules/clean/react/user_notifications/group_actions"],t)},t.prototype.load=function(){return s.userNotificationsDispatcher.dispatch({type:a.ActionTypes.LOAD_REQUEST}),r.getAll(u.userNotificationsStore.getCursor(),this.activeUserOnlyMode).then(function(e){var t=[];return t=t.concat(e.notifications),n.NotificationLogger.logReceive(t),s.userNotificationsDispatcher.dispatch({type:a.ActionTypes.LOAD_SUCCESS,data:e}),e},function(){s.userNotificationsDispatcher.dispatch({type:a.ActionTypes.LOAD_FAILURE})})},t.prototype.loadOnceAndWatch=function(e){var t=this;this.hasLoadedOnce||(this.hasLoadedOnce=!0,this.activeUserOnlyMode=null!=e&&e,this.load().then(function(e){t.watch(e)},function(){}))},t.prototype.acknowledge=function(e){s.userNotificationsDispatcher.dispatch({type:a.ActionTypes.ACKNOWLEDGEMENT_REQUEST_SINGLE,data:{notifications:[e]}}),r.ack(e)},t.prototype.markAllAsSeen=function(){var e=u.userNotificationsStore.getUnseen();0!==e.length&&(r.markAsSeen(e),s.userNotificationsDispatcher.dispatch({type:a.ActionTypes.MARK_AS_SEEN_REQUEST}))},t.prototype.watch=function(e){var t=this,n=function(n){if(o.NotClients.hasOwnProperty(n)){var r=o.NotClients[n],a=null,s=window.ensemble;if(s&&s.viewer&&(a=s.viewer.getActiveUser()),!i.activeUserOnlyMode||(null!=a?a.userId:null)===parseInt(n,10))var c=r.subscribe_user({name:"UserNotificationsActions",handler:function(){t.load().then(function(e){r.handler_success(c,{nid:e.cursor[n]})},function(){r.handler_failure(c)})},nid:e.cursor[n]})}},i=this;for(var r in o.NotClients)n(r)},t.prototype.acknowledgeAll=function(){0!==u.userNotificationsStore.getUnacknowledgedCount()&&(i.logMarkAllAsRead(),n.NotificationLogger.logMarkAsRead(u.userNotificationsStore.getUnacknowledged(),n.NotificationLocations.TRAY),s.userNotificationsDispatcher.dispatch({type:a.ActionTypes.ACKNOWLEDGEMENT_REQUEST}),r.ackAll(this.activeUserOnlyMode))},t.prototype.viewNotifications=function(){this.markAllAsSeen()},t.prototype.actionPerformed=function(e,t){n.NotificationLogger.logAction(e,t),e.isUnread&&this.acknowledge(e)},t.prototype.triggerGenericLegacyNotificationAction=function(e){this.actionPerformed(e,"click")},t.prototype.dismissLegacySharingNotification=function(e,t){this.actionPerformed(e,"button_1"),this.asyncSharingAction(function(e){e.registerDismiss(t)})},t.prototype.mountFromLegacySharingNotification=function(e,t){this.actionPerformed(e,"button_0"),this.asyncSharingAction(function(e){e.registerMount(t)})},t.prototype.upgradeToMountFromLegacySharingNotification=function(e){this.actionPerformed(e,"button_0"),this.asyncSharingAction(function(e){e.upgradeToMount()})},t.prototype.triggerBluenoteAction=function(e,t,n){this.actionPerformed(e,n),t.actionType===c.BluenoteActionTypes.OpenUrl?this.performBluenoteOpenUrlAction(t.params):t.actionType===c.BluenoteActionTypes.MountSharedFolder?this.asyncSharingAction(function(n){n.performBluenoteMountSharedFolder(e,t.params)}):t.actionType===c.BluenoteActionTypes.ApproveGroupJoinRequest?this.asyncGroupAction(function(n){n.performBluenoteApproveGroupJoinRequestAction(e,t.params)}):t.actionType===c.BluenoteActionTypes.RemoveGroupJoinRequest&&this.asyncGroupAction(function(n){n.performBluenoteRemoveGroupJoinRequestAction(e,t.params)})},t.prototype.performBluenoteOpenUrlAction=function(e){e.urlPath&&l.redirect(e.urlPath)},t})())}),define("modules/clean/react/user_notifications/api",["require","exports","jquery","modules/clean/ajax","modules/clean/react/user_notifications/constants","modules/clean/react/user_notifications/models"],function(e,t,n,i,o,r){"use strict";function a(e){return new r.UserNotification({id:e.nid,userId:e.user_id,typeId:e.type_id,typeData:s(e),targetObjectKey:e.target_object_key,status:e.status,seenState:e.seen_state,feedTimeInSec:e.feed_time,rawDropdownRowHtml:e.notification_div,roleLabel:e.role_label,bluenoteActor:h(e),bluenoteObject:y(e),bluenoteNotificationTypeId:e.bluenote_notification_type_id,bluenoteTypedData:A(e)})}function s(e){switch(e.type_id){case r.NotificationTypes.SharedFolderInvite:return c(e);case r.NotificationTypes.Bluenote:return u(e)}}function c(e){return{overQuotaStatus:e.sf_invite_overquota}}function u(e){var t=e.bluenote_payload;if(null!=t)return{templateType:t.template_type,templateVersion:t.template_version,campaignInfo:p(t.campaign_info),displayMessage:t.home_params.message,icon:_(t.image),surfaceAction:m(t.home_params.surface_action),buttonActions:(t.home_params.button_actions||[]).map(m),preview:l(t.preview)}}function l(e){if(null!=e)return{showThumbnail:e.show_thumbnail||!1,quote:e.quote,tasks:f(e.tasks)}}function f(e){if(null!=e)return{taskEndpoint:e.task_endpoint,tasks:(e.tasks||[]).map(d)}}function d(e){if(null!=e)return{name:e.name,id:e.id,isComplete:e.is_complete}}function p(e){if(null!=e)return{campaignId:e.campaignId,categoryId:e.categoryId,versionId:e.versionId?""+e.versionId:void 0,contentId:e.contentId}}function _(e){if(null!=e)return"avatar"===e.type?{avatarInitials:e.avatar_initials,avatarUrl:e.avatar_url}:{lowResIconUrl:e.system_url32,highResIconUrl:e.system_url64}}function m(e){if(null!=e){var t=void 0;if("open_url"===e.action_name?t=r.BluenoteActionTypes.OpenUrl:"mount_shared_folder"===e.action_name?t=r.BluenoteActionTypes.MountSharedFolder:"approve_group_join_request"===e.action_name?t=r.BluenoteActionTypes.ApproveGroupJoinRequest:"remove_group_join_request"===e.action_name&&(t=r.BluenoteActionTypes.RemoveGroupJoinRequest),t)return{buttonLabel:e.label,actionType:t,params:g(t,e.params)}}}function g(e,t){if(null!=t){if(e===r.BluenoteActionTypes.OpenUrl)return{urlPath:t.url_path};if(e===r.BluenoteActionTypes.MountSharedFolder)return{nsId:t.ns_id};if(e===r.BluenoteActionTypes.ApproveGroupJoinRequest||e===r.BluenoteActionTypes.RemoveGroupJoinRequest)return{requestingUserId:t.requesting_user_id,groupId:t.group_id}}}function h(e){var t=e.bluenote_actor;if(null!=t)return{accountId:t.actor_account_id,avatarUrl:t.actor_avatar_url,displayName:t.actor_display_name,initials:t.actor_initials}}function y(e){var t=e.bluenote_object;if(null!=t)return{id:t.id,ignore:t.ignore,name:t.name,thumbnailUrl:t.thumbnail_url,type:t.type,url:t.url}}function A(e){var t=e.bluenote_notification_type_id,n=e.bluenote_typed_data;if(null!=t&&null!=n)switch(t){case o.BNNotificationTypeIdentifier.NONE:return;case o.BNNotificationTypeIdentifier.DROPBOX_FILE_COMMENT:return N(n);case o.BNNotificationTypeIdentifier.DROPBOX_SHARED_CONTENT:return E(n);case o.BNNotificationTypeIdentifier.PAPER_SHARE:return T(n);case o.BNNotificationTypeIdentifier.PAPER_COMMENT:return v(n);case o.BNNotificationTypeIdentifier.PAPER_MENTION:return S(n);default:return}}function N(e){return{commentText:e.comment_text}}function E(e){return{shareText:e.share_text}}function T(e){return{shareText:e.share_text}}function v(e){return{commentText:e.comment_text,numOtherCommenters:e.num_other_commenters,numOtherComments:e.num_other_comments}}function S(e){return{mentionText:e.mention_text}}function I(e,t){void 0===e&&(e=null),void 0===t&&(t=!1);var o={count:100,template_version:5};null!=e&&(o.last_received_nid_by_user_id=JSON.stringify(e));var r;if(t){if(null===e){var a=window,s=a.__REGISTER_NOTIFICATIONS_PREFETCH_HANDLER;if(s)return s.prefetchDeferred||(s.prefetchDeferred=n.Deferred(),s(function(e){s.prefetchDeferred.resolve(O(e))},function(){return null})),s.prefetchDeferred}r=i.SilentBackgroundRequest({url:"/web/notifications/retrieve_user",data:o,subject_user:window.ensemble.viewer.getActiveUser().userId,dataType:"json"})}else r=i.SilentBackgroundRequest({url:"/web/notifications/retrieve",data:o,dataType:"json"});return r.then(O)}function O(e){var t=e.notifications.map(a);return{cursor:e.latest_nid,notifications:t}}function R(e){void 0===e&&(e=!1);var t;return t=e?i.SilentBackgroundRequest({url:"/web/notifications/ack_all_user",subject_user:window.ensemble.viewer.getActiveUser().userId,dataType:"json"}):i.SilentBackgroundRequest({url:"/web/notifications/ack_all",dataType:"json"}),t.then(function(e){return e.map(a)})}function b(e){i.SilentBackgroundBeaconRequest({url:"/web/notifications/ack",subject_user:e.userId,data:{nids:JSON.stringify([e.id])},dataType:"json"})}function U(e){for(var t={},n=0,o=e;n<o.length;n++){var r=o[n];r.userId&&r.id&&(t[r.userId]||(t[r.userId]=[])).push(r.id)}var a={nids_by_user_id:JSON.stringify(t)};i.SilentBackgroundRequest({url:"/web/notifications/mark_seen",data:a,dataType:"json"})}Object.defineProperty(t,"__esModule",{value:!0});t.getAll=I,t.parseGetAllResponse=O,t.ackAll=R,t.ack=b,t.markAsSeen=U}),define("modules/clean/react/user_notifications/constants",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ActionTypes={LOAD_REQUEST:"USER_NOTIFICATIONS_LOAD_REQUEST",LOAD_SUCCESS:"USER_NOTIFICATIONS_LOAD_SUCCESS",LOAD_FAILURE:"USER_NOTIFICATIONS_LOAD_FAILURE",ACKNOWLEDGEMENT_REQUEST:"USER_NOTIFICATIONS_ACKNOWLEDGEMENT_REQUEST",ACKNOWLEDGEMENT_REQUEST_SINGLE:"USER_NOTIFICATIONS_ACKNOWLEDGEMENT_REQUEST_SINGLE",MARK_AS_SEEN_REQUEST:"USER_NOTIFICATIONS_MARK_AS_SEEN_REQUEST"},t.EventTypes={RENDERED_NOTIFICATIONS:"USER_NOTIFICATIONS_RENDERED_NOTIFICATIONS"},t.BellDesignTypes={BLUE_ICON:"BLUE_ICON",GRAY_ICON:"GRAY_ICON"},t.BNNotificationTypeIdentifier={NONE:"NONE",DROPBOX_FILE_COMMENT:"DROPBOX_FILE_COMMENT",DROPBOX_SHARED_CONTENT:"DROPBOX_SHARED_CONTENT",PAPER_SHARE:"PAPER_SHARE",PAPER_COMMENT:"PAPER_COMMENT",PAPER_MENTION:"PAPER_MENTION"},t.BluenoteObjectTypes={DROPBOX_FILE:"dropbox-file",DROPBOX_FOLDER:"dropbox-folder",PAPER_PAD:"paper-pad",PAPER_FOLDER:"paper-folder"}}),define("modules/clean/react/user_notifications/dispatcher",["require","exports","modules/clean/flux/dispatcher"],function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.userNotificationsDispatcher=n}),define("modules/clean/react/user_notifications/models",["require","exports","modules/clean/datetime"],function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});(function(e){e[e.OpenUrl=1]="OpenUrl",e[e.MountSharedFolder=2]="MountSharedFolder",e[e.ApproveGroupJoinRequest=3]="ApproveGroupJoinRequest",e[e.RemoveGroupJoinRequest=4]="RemoveGroupJoinRequest"})(t.BluenoteActionTypes||(t.BluenoteActionTypes={}));var i;(function(e){e[e.Unread=0]="Unread",e[e.Read=1]="Read",e[e.Invisible=2]="Invisible"})(i=t.NotificationStatuses||(t.NotificationStatuses={}));var o;(function(e){e[e.Unseen=1]="Unseen",e[e.Seen=2]="Seen"})(o=t.NotificationSeenState||(t.NotificationSeenState={})),t.NotificationStatusStrings={0:"unread",1:"read",2:"invisible"},t.SharedFolderInviteOverQuotaStatuses={ALREADY_OVER:"overquota",WILL_BE_OVER:"will_be_overquota"};var r;(function(e){e[e.SharedFolderInvite=100]="SharedFolderInvite",e[e.Bluenote=2200]="Bluenote"})(r=t.NotificationTypes||(t.NotificationTypes={}));var a=(function(){function e(e){var t=e.id,n=e.userId,i=e.typeId,o=e.typeData,r=e.targetObjectKey,a=e.status,s=e.seenState,c=e.feedTimeInSec,u=e.rawDropdownRowHtml,l=e.roleLabel,f=e.bluenoteActor,d=e.bluenoteObject,p=e.bluenoteNotificationTypeId,_=e.bluenoteTypedData;this.id=t,this.userId=n,this.typeId=i,this.typeData=o,this.targetObjectKey=r,this.status=a,this.seenState=s,this.feedTimeInSec=c,this.rawDropdownRowHtml=u,this.roleLabel=l,this.bluenoteActor=f,this.bluenoteObject=d,this.bluenoteNotificationTypeId=p,this.bluenoteTypedData=_}return Object.defineProperty(e.prototype,"key",{get:function(){return this.userId+" "+this.typeId+" "+this.targetObjectKey},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isUnread",{get:function(){return this.status===i.Unread},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isRead",{get:function(){return this.status===i.Read},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isInvisible",{get:function(){return this.status===i.Invisible},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isSeen",{get:function(){return!(this.seenState===o.Unseen&&this.status===i.Unread)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"type",{get:function(){return this.typeId},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"feedTime",{get:function(){return new Date(1e3*this.feedTimeInSec)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"campaignId",{get:function(){var e;if(this.typeId===r.Bluenote){var t=this.typeData;t.campaignInfo&&t.campaignInfo.campaignId&&(e=""+t.campaignInfo.campaignId)}return e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"campaignVersion",{get:function(){if(this.typeId===r.Bluenote){var e=this.typeData;if(e.campaignInfo&&e.campaignInfo.versionId)return e.campaignInfo.versionId}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"displayTime",{get:function(){return Date.now()-1e3*this.feedTimeInSec>6048e5?n.nice_date_with_month_name(this.feedTime,!1):n.ago(this.feedTime)},enumerable:!0,configurable:!0}),e})();t.UserNotification=a;var s=(function(){function e(){}return e})();t.SharedFolderInviteData=s}),define("modules/clean/react/user_notifications/store",["require","exports","tslib","external/underscore","modules/clean/flux/flux_store","modules/clean/react/user_notifications/constants","modules/clean/react/user_notifications/dispatcher","modules/clean/react/user_notifications/models"],function(e,t,n,i,o,r,a,s){"use strict";function c(e,t){return t.feedTime.getTime()-e.feedTime.getTime()||e.key.localeCompare(t.key)}Object.defineProperty(t,"__esModule",{value:!0}),t.userNotificationComparator=c;var u=(function(e){function t(t){var n=e.call(this,t)||this;return n.isAcknowledged=function(e){return e.isRead},n.markNotificationAsReadLocally=function(e){e.isUnread&&(e.status=s.NotificationStatuses.Read)},n.isLoadingFlag=!1,n.userNotifications=[],n}return n.__extends(t,e),t.prototype.isLoading=function(){return this.isLoadingFlag},t.prototype.getActionableCount=function(){return this.getUnseenInternal().length},t.prototype.getUnacknowledgedCount=function(){return this.getUnacknowledgedInternal().length},t.prototype.getCursor=function(){return this.cursor},t.prototype.getAll=function(){return this.userNotifications},t.prototype.getAllVisible=function(){return this.userNotifications.filter(function(e){return!e.isInvisible})},t.prototype.getUnacknowledged=function(){return this.getUnacknowledgedInternal()},t.prototype.getUnacknowledgedInternal=function(){return this.userNotifications.filter(function(e){return e.isUnread})},t.prototype.getUnseen=function(){return this.getUnseenInternal()},t.prototype.getUnseenInternal=function(){return this.userNotifications.filter(function(e){return!e.isSeen})},t.prototype.onLoadRequest=function(){this.isLoadingFlag||(this.isLoadingFlag=!0,this.__emitChange())},t.prototype.onLoadSuccess=function(e){if(this.isLoadingFlag&&(this.isLoadingFlag=!1,this.__emitChange()),i.isEqual(e.cursor,this.cursor)||(this.cursor=e.cursor,this.__emitChange()),e.notifications.length>0){var t={};e.notifications.concat(this.userNotifications).forEach(function(e){t[e.key]||(t[e.key]=e)}),this.userNotifications=i.values(t).sort(c),this.__emitChange()}},t.prototype.onLoadFailure=function(){this.isLoadingFlag&&(this.isLoadingFlag=!1,this.__emitChange())},t.prototype.onAcknowledgementRequest=function(){this.userNotifications.forEach(this.markNotificationAsReadLocally),this.__emitChange()},t.prototype.onAcknowledgementRequestSingle=function(e){this.markNotificationAsReadLocally(e),this.__emitChange()},t.prototype.onMarkAsSeenRequest=function(){this.userNotifications.forEach(function(e){e.isSeen||(e.seenState=s.NotificationSeenState.Seen)}),this.__emitChange()},t.prototype.__onDispatch=function(e){switch(e.action.type){case r.ActionTypes.LOAD_REQUEST:this.onLoadRequest();break;case r.ActionTypes.LOAD_SUCCESS:this.onLoadSuccess(e.action.data);break;case r.ActionTypes.LOAD_FAILURE:this.onLoadFailure();break;case r.ActionTypes.ACKNOWLEDGEMENT_REQUEST:this.onAcknowledgementRequest();break;case r.ActionTypes.ACKNOWLEDGEMENT_REQUEST_SINGLE:this.onAcknowledgementRequestSingle(e.action.data.notifications[0]);break;case r.ActionTypes.MARK_AS_SEEN_REQUEST:this.onMarkAsSeenRequest()}},t})(o);t.UserNotificationsStore=u,t.userNotificationsStore=new u(a.userNotificationsDispatcher)});
//# sourceMappingURL=pkg-notifications-and-home.min.js-vfl0vho0D.map