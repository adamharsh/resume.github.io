define(["require","exports","tslib","modules/clean/flux/flux_store","modules/clean/react/shared_link_folder/constants","modules/clean/react/shared_link_folder/dispatcher"],function(e,i,t,n,s,o){"use strict";function r(e){return!e.is_dir}Object.defineProperty(i,"__esModule",{value:!0});var a=(function(e){function i(i){var t=e.call(this,i)||this;return t.fileIds={},t.folderFilenames={},t.fileIds={},t.files=[],t.fileSharedLinkInfos=[],t.fileSharePermissions=[],t.fileShareTokens=[],t.folderFilenames={},t.folders=[],t.isLoading=!1,t}return t.__extends(i,e),i.prototype.getFolders=function(){return this.folders},i.prototype.getFiles=function(){return this.files},i.prototype.getFileSharePermissions=function(){return this.fileSharePermissions},i.prototype.getFileShareTokens=function(){return this.fileShareTokens},i.prototype.getFileSharedLinkInfos=function(){return this.fileSharedLinkInfos},i.prototype.getIsLoading=function(){return this.isLoading},i.prototype.getTakedownRequestType=function(){return this.takedownRequestType},i.prototype.handleInitializeFolder=function(e){this.fileIds=e.files.reduce(function(e,i){return e[i.file_id]=!0,e},{}),this.files=e.files.slice(),this.fileSharedLinkInfos=e.fileSharedLinkInfos.slice(),this.fileSharePermissions=e.fileSharePermissions.slice(),this.fileShareTokens=e.fileShareTokens.slice(),this.folderFilenames=e.folders.reduce(function(e,i){return e[i.filename]=!0,e},{}),this.folders=e.folders.slice(),this.isLoading=!1,this.takedownRequestType=e.takedownRequestType,this.__emitChange()},i.prototype.handleFetchPageSuccess=function(e){var i=this;e.entries.forEach(function(t,n){r(t)?t.file_id in i.fileIds||(i.fileIds[t.file_id]=!0,i.files.push(t),i.fileSharedLinkInfos.push(e.sharedLinkInfos[n]),i.fileSharePermissions.push(e.sharePermissions[n]),i.fileShareTokens.push(e.shareTokens[n])):t.filename in i.folderFilenames||(i.folderFilenames[t.filename]=!0,i.folders.push(t))}),!this.takedownRequestType&&e.takedownRequestType&&(this.takedownRequestType=e.takedownRequestType),this.__emitChange()},i.prototype.handleLoadStart=function(){this.isLoading=!0,this.__emitChange()},i.prototype.handleLoadEnd=function(){this.isLoading=!1,this.__emitChange()},i.prototype.__onDispatch=function(e){e.action.type===s.SharedLinkFolderAction.FetchPageSuccess?this.handleFetchPageSuccess(e.action.data):e.action.type===s.SharedLinkFolderAction.InitializeFolder?this.handleInitializeFolder(e.action.data):e.action.type===s.SharedLinkFolderAction.LoadStart?this.handleLoadStart():e.action.type===s.SharedLinkFolderAction.LoadEnd&&this.handleLoadEnd()},i})(n);i.sharedLinkFolderStore=new a(o.sharedLinkFolderDispatcher)});
//# sourceMappingURL=store.min.js-vflLl1I0Q.map