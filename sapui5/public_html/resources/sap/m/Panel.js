/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,l,C,I){"use strict";var P=C.extend("sap.m.Panel",{metadata:{library:"sap.m",properties:{headerText:{type:"string",group:"Data",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},expandable:{type:"boolean",group:"Appearance",defaultValue:false},expanded:{type:"boolean",group:"Appearance",defaultValue:false},expandAnimation:{type:"boolean",group:"Behavior",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:sap.m.BackgroundDesign.Translucent}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false}},events:{expand:{parameters:{expand:{type:"boolean"}}}}}});P.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);};P.prototype.setWidth=function(w){this.setProperty("width",w,true);var d=this.getDomRef();if(d){d.style.width=w;}return this;};P.prototype.setHeight=function(h){this.setProperty("height",h,true);var d=this.getDomRef();if(d){d.style.height=h;this._setContentHeight();}return this;};P.prototype.setExpandable=function(e){this.setProperty("expandable",e,false);if(e&&!this.oIconCollapsed){this.oIconCollapsed=this._createIcon();}return this;};P.prototype.setExpanded=function(e){if(e===this.getExpanded()){return;}this.setProperty("expanded",e,true);if(!this.getExpandable()){return;}this._getIcon().$().attr("aria-expanded",e.toString());this._toggleExpandCollapse();this._toggleCssClasses();this.fireExpand({expand:e});return this;};P.prototype.onBeforeRendering=function(){var i;if(this.oIconCollapsed){i=this._getLabellingElementId();this.oIconCollapsed.addAriaLabelledBy(i);}};P.prototype.onAfterRendering=function(){var $=this.$(),a;this._setContentHeight();if(this.getExpandable()){a=this.oIconCollapsed.$();if(this.getExpanded()){$.children(".sapMPanelWrappingDiv").addClass("sapMPanelWrappingDivExpanded");$.children(".sapMPanelWrappingDivTb").addClass("sapMPanelWrappingDivTbExpanded");a.attr("aria-expanded","true");}else{$.children(".sapMPanelExpandablePart").hide();a.attr("aria-expanded","false");}}};P.prototype.exit=function(){if(this.oIconCollapsed){this.oIconCollapsed.destroy();delete this.oIconCollapsed;}};P.prototype._createIcon=function(){var t=this,c=I.getIconURI("navigation-right-arrow");return I.createControlByURI({id:t.getId()+"-CollapsedImg",src:c,decorative:false,press:function(){t.setExpanded(!t.getExpanded());}}).addStyleClass("sapMPanelExpandableIcon");};P.prototype._getIcon=function(){return this.oIconCollapsed;};P.prototype._setContentHeight=function(){if(this.getHeight()==="auto"){return;}var h=0,H=this.getHeaderToolbar(),i=this.getInfoToolbar(),$=this.$();if(H){h+=parseInt(H.$().outerHeight(),10);}if(!H&&this.getHeaderText()!==""){h+=parseInt($.find(".sapMPanelHdr").first().outerHeight(),10);}if(i){h+=parseInt(i.$().outerHeight(),10);}$.children(".sapMPanelContent").css("height",parseInt($.outerHeight(),10)-h);};P.prototype._toggleExpandCollapse=function(){var o={};if(!this.getExpandAnimation()){o.duration=0;}this.$().children(".sapMPanelExpandablePart").slideToggle(o);};P.prototype._toggleCssClasses=function(){var $=this.$();$.children(".sapMPanelWrappingDiv").toggleClass("sapMPanelWrappingDivExpanded");$.children(".sapMPanelWrappingDivTb").toggleClass("sapMPanelWrappingDivTbExpanded");$.find(".sapMPanelExpandableIcon").first().toggleClass("sapMPanelExpandableIconExpanded");};P.prototype._getLabellingElementId=function(){var h=this.getHeaderToolbar(),i;if(h){i=h.getId();}else{i=this.getId()+"-header";}return i;};return P;},true);
