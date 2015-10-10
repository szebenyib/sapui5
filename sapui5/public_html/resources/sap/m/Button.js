/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','sap/ui/core/theming/Parameters'],function(q,l,C,E,I,P){"use strict";var B=C.extend("sap.m.Button",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:sap.m.ButtonType.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},press:{}},designTime:true}});E.call(B.prototype);B.prototype.exit=function(){if(this._image){this._image.destroy();}if(this._iconBtn){this._iconBtn.destroy();}};B.prototype.ontouchstart=function(e){e.setMarked();if(e.targetTouches.length===1){this._activeButton();this._target=e.target;}};B.prototype.ontouchend=function(){this._inactiveButton();};B.prototype.ontouchcancel=function(){this._inactiveButton();};B.prototype.ontap=function(e){e.setMarked();if(this.getEnabled()){if(!this._target){this._target=e.target;}if((!!this._target)&&(this._target===e.target)){if(e.originalEvent&&e.originalEvent.type==="touchend"){this.focus();}this.fireTap({});this.firePress({});}}delete this._target;};B.prototype.onkeydown=function(e){if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){e.setMarked();this._activeButton();this._target=e.target;}};B.prototype.onkeyup=function(e){if(!this._target){return;}this._target=null;if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){e.setMarked();this._inactiveButton();this.firePress({});}};B.prototype.onfocusout=function(){this._inactiveButton();};B.prototype._activeButton=function(){if(!this._isUnstyled()){this.$("inner").addClass("sapMBtnActive");}if(this.getEnabled()){if(this.getIcon()&&this.getActiveIcon()&&this._image instanceof sap.m.Image){this._image.setSrc(this.getActiveIcon());}}};B.prototype._inactiveButton=function(){if(!this._isUnstyled()){this.$("inner").removeClass("sapMBtnActive");}if(this.getEnabled()){if(this.getIcon()&&this.getActiveIcon()&&this._image instanceof sap.m.Image){this._image.setSrc(this.getIcon());}}};B.prototype._isHoverable=function(){return this.getEnabled()&&sap.ui.Device.system.desktop;};B.prototype._getImage=function(i,s,a,b){if(this._image&&(this._image.getSrc()!==s)){this._image.destroy();this._image=undefined;}var o=this._image;if(!!o){o.setSrc(s);if(o instanceof sap.m.Image){o.setActiveSrc(a);o.setDensityAware(b);}}else{o=I.createControlByURI({id:i,src:s,activeSrc:a,densityAware:b,useIconTooltip:false},sap.m.Image).addStyleClass("sapMBtnCustomIcon").setParent(this,null,true);}o.addStyleClass("sapMBtnIcon");if(o.hasStyleClass("sapMBtnIconLeft")){o.removeStyleClass("sapMBtnIconLeft");}if(o.hasStyleClass("sapMBtnIconRight")){o.removeStyleClass("sapMBtnIconRight");}if(o.hasStyleClass("sapMBtnBackIconLeft")){o.removeStyleClass("sapMBtnBackIconLeft");}if(this._getText()){if(this.getIconFirst()){if(this.getType()===sap.m.ButtonType.Back||this.getType()===sap.m.ButtonType.Up){o.addStyleClass("sapMBtnBackIconLeft");}else{o.addStyleClass("sapMBtnIconLeft");}}else{o.addStyleClass("sapMBtnIconRight");}}this._image=o;return this._image;};B.prototype._getInternalIconBtn=function(i,s){var o=this._iconBtn;if(o){o.setSrc(s);}else{o=I.createControlByURI({id:i,src:s,useIconTooltip:false},sap.m.Image).setParent(this,null,true);}o.addStyleClass("sapMBtnIcon");if(this._getText()){o.addStyleClass("sapMBtnIconLeft");}this._iconBtn=o;return this._iconBtn;};B.prototype._isUnstyled=function(){var u=false;if(this.getType()===sap.m.ButtonType.Unstyled){u=true;}return u;};B.prototype.setText=function(t){var v=this.getText();if(t===null||t===undefined){t="";}if(v!==t){var d=this.getDomRef("content");var s=!!d;this.setProperty("text",t,s);if(s){t=this.getText();d.innerHTML=q.sap.encodeHTML(t);if(this.getIcon()){this._removeTextPadding();if(t.length>0){this._addTextPadding(this.getIconFirst());}if(this.$().hasClass("sapMBtnBack")){this.$().removeClass("sapMBtnBack");}if((this.getType()===sap.m.ButtonType.Back||this.getType()===sap.m.ButtonType.Up)&&this.getIcon()&&!this.getText()){this.$().addClass("sapMBtnBack");}}}}return this;};B.prototype.setIcon=function(i){var v=this.getIcon()||"";i=i||"";if(v!==i){var s=!!v&&!!i&&I.isIconURI(i)===I.isIconURI(v);this.setProperty("icon",i,s);if(s&&this._image){this._image.setSrc(i);}}return this;};B.prototype.setIconFirst=function(i){var v=this.getIconFirst();if(v!==i){var d=this.getDomRef("img");var s=!!d;this.setProperty("iconFirst",i,s);if(s){if(this.$("img").hasClass("sapMBtnIconLeft")){this.$("img").removeClass("sapMBtnIconLeft");}if(this.$("img").hasClass("sapMBtnIconRight")){this.$("img").removeClass("sapMBtnIconRight");}if(this.$("img").hasClass("sapMBtnBackIconLeft")){this.$("img").removeClass("sapMBtnBackIconLeft");}if(this.$("content").hasClass("sapMBtnContentLeft")){this.$("content").removeClass("sapMBtnContentLeft");}if(this.$("content").hasClass("sapMBtnContentRight")){this.$("content").removeClass("sapMBtnContentRight");}if(this.$("content").hasClass("sapMBtnBackContentRight")){this.$("content").removeClass("sapMBtnBackContentRight");}if(this._getText()){if(i){if(this.getType()===sap.m.ButtonType.Back||this.getType()===sap.m.ButtonType.Up){this.$("img").addClass("sapMBtnBackIconLeft");this.$("content").addClass("sapMBtnBackContentRight");}else{this.$("img").addClass("sapMBtnIconLeft");this.$("content").addClass("sapMBtnContentRight");}}else{if(this.getType()===sap.m.ButtonType.Back||this.getType()===sap.m.ButtonType.Up){this.$("content").addClass("sapMBtnContentRight");}else{this.$("content").addClass("sapMBtnContentLeft");}this.$("img").addClass("sapMBtnIconRight");}}this._removeTextPadding();if(this._getText().length>0){this._addTextPadding(i);}}}return this;};B.prototype._removeTextPadding=function(){if(this.$("inner").hasClass("sapMBtnPaddingLeft")){this.$("inner").removeClass("sapMBtnPaddingLeft");}else if(this.$("inner").hasClass("sapMBtnPaddingRight")){this.$("inner").removeClass("sapMBtnPaddingRight");}if(!this._getText()){if(this.$("content").hasClass("sapMBtnContentLeft")){this.$("content").removeClass("sapMBtnContentLeft");}if(this.$("content").hasClass("sapMBtnContentRight")){this.$("content").removeClass("sapMBtnContentRight");}if(this.$("content").hasClass("sapMBtnBackContentRight")){this.$("content").removeClass("sapMBtnBackContentRight");}}};B.prototype._addTextPadding=function(i){var t=this.getType();if(i){this.$("inner").addClass("sapMBtnPaddingRight");}else if(t!=sap.m.ButtonType.Back&&t!=sap.m.ButtonType.Up){this.$("inner").addClass("sapMBtnPaddingLeft");}if(this._getText()){if(this.getIcon()){if(this.getIconFirst()){if(this.getType()===sap.m.ButtonType.Back||this.getType()===sap.m.ButtonType.Up){this.$("content").addClass("sapMBtnBackContentRight");}else{this.$("content").addClass("sapMBtnContentRight");}}else{if(this.getType()===sap.m.ButtonType.Back||this.getType()===sap.m.ButtonType.Up){this.$("content").addClass("sapMBtnContentRight");}this.$("content").addClass("sapMBtnContentLeft");}}else if(this.getType()===sap.m.ButtonType.Back||this.getType()===sap.m.ButtonType.Up){this.$("content").addClass("sapMBtnContentRight");}}};B.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("inner");};B.prototype._getText=function(){return this.getText();};B.prototype.setType=function(t){this.setProperty("type",t);var T="";var r;switch(t){case sap.m.ButtonType.Accept:if(!sap.m.Button._oStaticAcceptText){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");T=r.getText("BUTTON_ARIA_TYPE_ACCEPT");sap.m.Button._oStaticAcceptText=new sap.ui.core.InvisibleText({text:T});sap.m.Button._oStaticAcceptText.toStatic();}break;case sap.m.ButtonType.Reject:if(!sap.m.Button._oStaticRejectText){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");T=r.getText("BUTTON_ARIA_TYPE_REJECT");sap.m.Button._oStaticRejectText=new sap.ui.core.InvisibleText({text:T});sap.m.Button._oStaticRejectText.toStatic();}break;case sap.m.ButtonType.Emphasized:if(!sap.m.Button._oStaticEmphasizedText){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");T=r.getText("BUTTON_ARIA_TYPE_EMPHASIZED");sap.m.Button._oStaticEmphasizedText=new sap.ui.core.InvisibleText({text:T});sap.m.Button._oStaticEmphasizedText.toStatic();}break;default:break;}return this;};return B;},true);
