/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/commons/DropdownBox','sap/ui/commons/TextView','sap/ui/commons/Link','sap/ui/commons/Splitter','sap/ui/commons/layout/AbsoluteLayout','sap/ui/core/ListItem','sap/ui/core/search/OpenSearchProvider','./Tag','./TagCloud','./library','sap/ui/ux3/NavigationItem','sap/ui/ux3/Shell','sap/ui/model/json/JSONModel'],function(q,D,T,L,S,A,c,O,d,f,g,N,h,J){"use strict";var k=function(t,v,a){var b=this;function e(p){return p.split('/').slice(0,-1).join('/')+'/';}var B=window.location.href;if(B.indexOf('#')>=0){B=B.slice(0,B.indexOf('#'));}this.sBaseUrl=e(B);this.sBasePathname=e(window.location.pathname);this._iPendingCalls=0;this._mBestMatchingPage={};this._aTopLevelNavItems=[];this._aThemes=a||["sap_bluecrystal","sap_goldreflection","sap_hcb"];this._sTheme=this._aThemes[0];this._sCurrentContent=null;this._mAliases={};this._bIgnoreIFrameOnLoad=false;this._sTitleStr=t;this._sVersionStr=v;this._sSelectedWorkSetItem=null;k.getInstance=q.sap.getter(this);q(window).bind('hashchange',function(){var H=window.location.hash;q.sap.log.debug("hashchange occured, current='"+b._sCurrentContent+"', new='"+H+"'");if(H&&H!="#"+b._sCurrentContent){q.sap.log.info("navigate to "+H);b.navigateTo(H,true);}});};k.getInstance=function(){var t=q.sap.getObject("top.sap.ui.demokit.DemokitApp");if(t&&t!=k){return t.getInstance();}};k.prototype.calcRelativeUrl=function(u){return u.indexOf(this.sBaseUrl)==0?u.substring(this.sBaseUrl.length):null;};k.prototype.registerPageForType=function(u,C){this._mBestMatchingPage[C[0]]=u;};k.prototype.findPageForType=function(t){return this._mBestMatchingPage[t]||"docs/api/symbols/"+t+".html";};k.prototype._addPendingCall=function(){this._iPendingCalls++;};k.prototype._removePendingCall=function(){this._iPendingCalls--;};k.prototype.addIndex=function(i,s){s=s||{};var t=this;var o={id:"mi-"+i,text:s.caption||i,newWindow:s.newWindow,visible:(typeof s.visible==="boolean")?s.visible:true,themable:s.themable||false};this._aTopLevelNavItems.push(o);this._createWorksetItem(o);if(s.index){if(s.extend){s.extend(s.index,function(a){t._setIndexData(i,a);});}else{t._setIndexData(i,s.index);}}else if(s.url){this._loadIndexFromUrl(i,s.url,s.transformer,s.extend);}};k.prototype._loadIndexFromUrl=function(i,u,t,E){var a=this;q.ajax({url:u,dataType:u.slice(-4)==".xml"?"xml":"json",error:function(x,s,e){a._removePendingCall();q.sap.log.error("failed to load index '"+i+"' from '"+u+"': "+s+", "+e);var o=a._findIndexById(i);if(o){o.navItem.setVisible(false);}},success:function(o,s,x){var I=t?t.call(this,o):o;if(E){E(I,function(o){a._removePendingCall();a._setIndexData(i,o);});}else{a._removePendingCall();a._setIndexData(i,I);}}});this._addPendingCall();};k.prototype._setIndexData=function(I,o){var t=this;function p(b){n++;if(b.ref&&b.controls){var C=q.isArray(b.controls)?b.controls:b.controls.split(/,/);t.registerPageForType(b.ref,C);}if(b.alias&&b.ref){var e=b.alias.split(",");for(var i=0;i<e.length;i++){t._mAliases[e[i]]=b.ref;}}if(b.links){for(var i=0;i<b.links.length;i++){p(b.links[i]);}}}var a=this._findIndexById(I);if(a){a.ref=o.ref;a.links=o;var n=0;p(o);a._iTreeSize=n;this._createNavigationTree(a);a.navItem.setEnabled(!!a._oTree);a.navItem.setHref(o.ref);}};k.prototype._findIndexById=function(I){for(var i=0;i<this._aTopLevelNavItems.length;i++){var t=this._aTopLevelNavItems[i];if(t.id==="mi-"+I){return t;}}};k.prototype.getInitialPage=function(s,b){var i=s,H=window.location.hash,m=q.sap.getUriParameters().get("optimized-module-set");function a(u){return/^([a-zA-Z0-9-_]+\/)*[a-zA-Z0-9-_.]+\.html(#.*)?$/.test(u);}if(H){H=H.indexOf("#")===0?H.substring(1):H;if(a(H)){i=H;}}if(b&&m){i="customize.html?data="+m;}return i;};k.prototype.getPagesForCategory=function(C){var t=this._findIndexById("controls");if(!t||!t.links){return k.RETRY_LATER;}var p=C.split('/');var o=t.links;for(var i=0;i<p.length;i++){var P=p[i];for(var j=0;j<o.links.length;j++){if(P==o.links[j].text){break;}}if(j==o.links.length){return[];}o=o.links[j];}return o.links||[];};k.RETRY_LATER=-2;k.prototype.findIndexForPage=function(u){function a(n,u){if(u&&n.ref&&u.indexOf(n.ref)===0){return true;}if(n.links){for(var j=0;j<n.links.length;j++){if(a(n.links[j],u)){return true;}}}return false;}for(var i=0;i<this._aTopLevelNavItems.length;i++){if(this._aTopLevelNavItems[i].links&&a(this._aTopLevelNavItems[i].links,u)){return i;}}if(this._aTopLevelNavItems.length===0||this._iPendingCalls>0){return k.RETRY_LATER;}else{q.sap.log.error("could not find "+u+" in nav tree");return-1;}};k.DEFAULT_TLN_ITEM=0;k.prototype._createNavigationTree=function(t){var a=this;var n=0;function s(E){var C=E.getSource().getCustomData();for(var i in C){if(C[i].getKey()=="_ref_"){a.navigateTo(C[i].getValue());}}}function b(p,v,w,x){for(var i=0;i<v.length;i++){var C={text:v[i].text,tooltip:v[i].tooltip,expanded:w<1,selectable:!!v[i].ref,selected:s};C._ref_=v[i].ref;C.parentName=(w<1)?v[i].text:x+"."+v[i].text;p.push(C);n++;if(v[i].links&&v[i].links.length>0){C.nodes=[];b(C.nodes,v[i].links,w+1,C.parentName);}}}function e(v,o){if(v==="mi-devguidekm"){o.collapseAll();var w=o.getNodes();for(var i=0;i<w.length;i++){var x=w[i].getCustomData();for(var p=0;p<x.length;p++){if(x[p].getKey()==="_ref_"&&x[p].getValue().indexOf("95d113be50ae40d5b0b562b84d715227")!==-1){w[i].expand();}}}}}if(t._oTree){return;}var o=new sap.ui.commons.Tree(t.id+"-index",{showHeader:false,width:"100%",height:"100%",showHorizontalScrollbar:true,selectionMode:"Single"});o.addStyleClass("sapUiTreeWithHeader");var j=new sap.ui.commons.TreeNode({text:"{text}",tooltip:"{tooltip}",expanded:"{expanded}",selectable:"{selectable}",selected:s});var l=new sap.ui.core.CustomData({key:"_ref_",value:"{_ref_}"});j.addCustomData(l);var m=new sap.ui.core.CustomData({key:"parentName",value:"{parentName}"});j.addCustomData(m);var r=[];b(r,t.links.links,0,"");var u=new J();u.setSizeLimit(n);o.setModel(u);u.setData(r);o.bindNodes("/",j);e(t.id,o);if(r.length>25){o.collapseAll();}t._oTree=o;t._iTreeSize=n;t._oEmptyTreeLabel=new sap.ui.commons.Label({text:"No matching entry found.",visible:false,width:"100%",textAlign:"Center"});};k.prototype._createWorksetItem=function(t){var n=t.navItem=new N({key:t.id,text:t.text,href:"#"+t.ref,visible:t.visible,enabled:false});n._itemData_=t;if(this._oShell){this._oShell.addWorksetItem(n);}};k.prototype.createUI=function(s,I){var e;var t=this;var m="theme/img/themeswitch_";var n=k.THEMES;this._oThemeSwitch=new D({change:[this._handleThemeChanged,this],items:q.map(this._aThemes,function(a){return new c({text:n[a],key:a});}),value:n[this._sTheme]});this._oThemeSwitchPopup=new sap.ui.ux3.ToolPopup({title:"Select a theme",icon:m+"regular.png",iconHover:m+"hover.png",iconSelected:m+"selected.png",content:[this._oThemeSwitch],initialFocus:this._oThemeSwitch});var C=new sap.ui.core.HTML("content",{content:"<iframe id=\"content\" name=\"content\" src=\"about:blank\" frameborder=\"0\" onload=\"sap.ui.demokit.DemokitApp.getInstance().onContentLoaded();\"></iframe>"});var o=this._oSidePanelLayout=new A();sap.ui.Device.os.name==sap.ui.Device.os.OS.IOS?e=true:e=false;var p;if(!this._sVersionStr||(this._sVersionStr.indexOf("SNAPSHOT")>-1)||(this._sVersionStr.split(".").length>1&&parseInt(this._sVersionStr.split(".")[1],10)%2===1)){p=new T({text:"Development version! Work in Progress!",semanticColor:sap.ui.commons.TextViewColor.Negative,design:sap.ui.commons.TextViewDesign.Bold});}var v=new sap.ui.commons.TextView({text:this._sVersionStr,tooltip:"Used SAPUI5 Version is "+this._sVersionStr});var V=new sap.ui.commons.TextView({text:this._sVersionStr,tooltip:"SAPUI5 Version"});var r=function(){var b=new sap.ui.commons.Button({text:"Back",visible:false,press:function(){Q.removeAllContent();Q.addContent(M);this.setVisible(false);}});var B=new sap.ui.commons.Button({text:"Close",press:function(){Q.close();}});var a=new sap.ui.commons.Image();a.setSrc("resources/sap/ui/demokit/themes/base/images/logo-SAPUI5-blue-446x140.png");a.setTooltip("SAPUI5 logo blue");a.addStyleClass("extraLeftPadding");var i='<h2>UI Development Toolkit for HTML5 - Demo Kit</h2>';i+='<span>SAP SE 2015 All rights reserved</span><br><br><br>';i+='<span>SAPUI5 Version <embed data-index="0"></span><br>';i+='<span>This software includes the following library versions</span><br>';i+='<span>(a full change log for all libraries can be found <embed data-index="1">).</span><br>';i+='<embed data-index="2"><br><br><br>';var j='<span>This software includes third-party open source software.</span><br>';j+='<embed data-index="0"><br>';var l=new sap.ui.commons.Link({text:"here",tooltip:"Go to Version Change Log",press:function(){Q.close();},href:"releasenotes.html",target:"content"});var E=new sap.ui.commons.Link({text:"Version Details",tooltip:"Go to Version Details",press:function(){Q.removeAllContent();Q.addContent(P());b.setVisible(true);}});var F=new sap.ui.commons.Link({text:"Included Third-Party Software",tooltip:"Go to Included Third-Party Software list",press:function(){Q.removeAllContent();Q.addContent(u());b.setVisible(true);}});var G=new sap.ui.commons.FormattedTextView();G.setContent(i,[V,l,E]);G.addStyleClass("extraLeftPadding");var H=new sap.ui.commons.FormattedTextView();H.setContent(j,[F]);H.addStyleClass("extraLeftPadding");var K=sap.ui.getVersionInfo();if(K&&K.gav&&/openui5/i.test(K.gav)){var M=new sap.ui.layout.VerticalLayout({content:[a,G]});}else{var M=new sap.ui.layout.VerticalLayout({content:[a,G,H]});}var Q=new sap.ui.commons.Dialog('aboutDlg',{title:"About",modal:true,buttons:[b,B],content:[M],showCloseButton:false,width:"550px",height:"800px",maxHeight:"100%"});Q.open();};var P=function(){sap.ui.localResources("versioninfo");var M=new J();sap.ui.demokit._loadAllLibInfo("","_getLibraryInfo","",function(B,E){var F={};var G=new sap.ui.core.util.LibraryInfo();for(var i=0,l=B.length;i<l;i++){B[i]=E[B[i]];B[i].libDefaultComponent=G._getDefaultComponent(B[i]);}F.libs=B;M.setData(F);});var a=function openReleaseDialog(){var i;var l=sap.ui.getCore().byId("notesView");var B=sap.ui.getCore().byId("notesDialog");if(!B){var E=new sap.ui.commons.TextView({text:"No changes for this library!",id:"noRelNote"});l=sap.ui.view({id:"notesView",viewName:"versioninfo.notes",type:sap.ui.core.mvc.ViewType.Template});i=new J();l.setModel(i);B=new sap.ui.commons.Dialog("notesDialog");B.addButton(new sap.ui.commons.Button({text:"OK",press:function(){B.close();}}));B.setModal(true);B.setHeight("40%");B.setWidth("40%");l.addStyleClass("myReleaseNotes");B.setResizable(true);}var F=new sap.ui.core.util.LibraryInfo();B.setTitle("Change log for: "+this.getBindingContext().getProperty("library"));var G=q.sap.Version(this.getBindingContext().getProperty("version"));var H=G.getMajor()+"."+G.getMinor()+"."+G.getPatch()+G.getSuffix();F._getReleaseNotes(this.getBindingContext().getProperty("library"),H,function(R,H){B.removeAllContent();if(R&&R[H]&&R[H].notes&&R[H].notes.length>0){B.addContent(l);l.getModel().setData(R);l.bindObject("/"+H);B.open();}else{if(E){B.addContent(E);}else{B.addContent(sap.ui.getCore().byId("noRelNote"));}B.open();}});};var b=new sap.ui.ux3.DataSet({items:{path:"/libs",template:new sap.ui.ux3.DataSetItem({title:"{library}"})},views:[new sap.ui.ux3.DataSetSimpleView({floating:false,template:new sap.ui.commons.form.Form({title:new sap.ui.core.Title({text:"{library}"}),width:"100%",layout:new sap.ui.commons.form.GridLayout(),formContainers:[new sap.ui.commons.form.FormContainer({formElements:[new sap.ui.commons.form.FormElement({label:new sap.ui.commons.Label({text:"Version:",layoutData:new sap.ui.commons.form.GridElementData({hCells:"3"})}),fields:[new sap.ui.commons.TextView({text:"{version}"})]}),new sap.ui.commons.form.FormElement({label:new sap.ui.commons.Label({text:"Description:",layoutData:new sap.ui.commons.form.GridElementData({hCells:"3"})}),fields:[new sap.ui.commons.TextView({text:"{documentation}"})]}),new sap.ui.commons.form.FormElement({label:new sap.ui.commons.Label({text:"Change Log:",layoutData:new sap.ui.commons.form.GridElementData({hCells:"3"})}),fields:[new sap.ui.commons.Link({text:"Open Change Log",press:a})],visible:{path:"releasenotes",formatter:function(i){return!!i;}}}),new sap.ui.commons.form.FormElement({label:new sap.ui.commons.Label({text:"Component:",layoutData:new sap.ui.commons.form.GridElementData({hCells:"3"})}),fields:[new sap.ui.commons.TextView({text:"{libDefaultComponent}"})],visible:{path:"libDefaultComponent",formatter:function(i){return!!i;}}})]})]})})],showToolbar:false,selectionChanged:function(){b.setLeadSelection(-1);}});b.setModel(M);var j=new sap.ui.layout.VerticalLayout({content:[b]});return j;};var u=function(){var M=new J();sap.ui.demokit._loadAllLibInfo("","_getThirdPartyInfo",function(F,G){if(!F){return;}var H={};H.thirdparty=[];for(var j=0;j<F.length;j++){var K=G[F[j]];for(var i=0;i<K.libs.length;i++){var Q=K.libs[i];Q._lib=F[j];H.thirdparty.push(Q);}}H.thirdparty.sort(function(a,b){var R=(a.displayName||"").toUpperCase();var U=(b.displayName||"").toUpperCase();if(R>U){return 1;}else if(R<U){return-1;}else{return 0;}});M.setData(H);});var l=new sap.ui.ux3.DataSet({items:{path:"/thirdparty",template:new sap.ui.ux3.DataSetItem({title:"{displayName}"})},views:[new sap.ui.ux3.DataSetSimpleView({floating:false,template:new sap.ui.commons.form.Form({title:new sap.ui.core.Title({text:"{displayName}"}),width:"100%",layout:new sap.ui.commons.form.GridLayout(),formContainers:[new sap.ui.commons.form.FormContainer({formElements:[new sap.ui.commons.form.FormElement({fields:[new sap.ui.commons.Link({text:"Web Site",target:"_blank",href:"{homepage}",layoutData:new sap.ui.layout.form.GridElementData({hCells:"auto"})}),new sap.ui.commons.Link({text:"License Conditions",target:"_blank",href:"{license/url}",layoutData:new sap.ui.layout.form.GridElementData({hCells:"5"})})]}),new sap.ui.commons.form.FormElement({fields:[new sap.ui.commons.Link({text:"Licensed by SAP under '{license/type}'",target:"_blank",href:"{license/file}"})]})]})]})})],showToolbar:false,selectionChanged:function(){M.setLeadSelection(-1);}});q.sap.require("jquery.sap.script");var B=q.sap.getUriParameters().get("sap-ui-debug");if(B==="x"||B==="X"||B==="true"){M.getViews()[0].getTemplate().getFormContainers()[0].addFormElement(new sap.ui.commons.form.FormElement({label:new sap.ui.commons.Label({text:"Requested by UI Library:",layoutData:new sap.ui.commons.form.GridElementData({hCells:"3"})}),fields:[new sap.ui.commons.TextView({text:"{_lib}"})]}));}l.setModel(M);var E=new sap.ui.layout.VerticalLayout({content:[l]});return E;};var w=new sap.ui.commons.Link({text:"About",tooltip:"About",press:function(){r();}});var x=this._oShell=new h({appTitle:this._sTitleStr,showLogoutButton:false,showFeederTool:false,applyContentPadding:false,showSearchTool:s,fullHeightContent:true,toolPopups:[this._oThemeSwitchPopup],search:function(E){t.navigateTo("search.html?q="+encodeURIComponent(E.getParameter("text")));t._oShell._getSearchTool().close();},worksetItemSelected:function(E){var a=E.getParameter("item");if(a.getEnabled()){var i=a._itemData_;if(i.newWindow){E.preventDefault();}t.navigateTo(i.ref,null,null,i.newWindow);}else{E.preventDefault();}},content:[new S("demokitSplitter",{width:"100%",height:"100%",splitterPosition:"0%",splitterBarVisible:false,firstPaneContent:[o],secondPaneContent:[C],showScrollBars:e})],headerItems:p?[w,p,v]:[w,v]});this._oShell.addStyleClass("sapDkShell");function y(K){var a=new f({minFontSize:15,maxFontSize:30,press:function(E){var b=sap.ui.getCore().byId(E.getParameter("tagId")).getText();x.fireSearch({text:b});}}).addStyleClass("grTagCloud");for(var i=0;i<K.length;i++){a.addTag(new d({text:K[i].tag,weight:K[i].score}));}x._getSearchTool&&x._getSearchTool().addContent(a);}if(s){var z=x.getSearchField();z.setEnableListSuggest(true);z.setShowListExpander(false);z.setVisibleItemCount(5);z.setSearchProvider(new O({suggestType:"json",suggestUrl:"suggest?q={searchTerms}"}));q.ajax({url:"keywords?kind=tags&max=50",dataType:"json",success:function(a,b,i){if(a&&a[0]&&a[0].success&&a[0].keywords&&a[0].keywords.length){y(a[0].keywords);z.setWidth("80%");}}});}q.each(this._aTopLevelNavItems,function(i,a){x.addWorksetItem(a.navItem);});this.navigateTo(I);q(function(){q("body").append("<div id=\"logo\"><img id=\"logoico\"><img id=\"logotxt\"></div>");q("#logoico").attr("src","resources/sap/ui/core/mimes/logo/icotxt_white_220x72_blue.png").addClass("sapUiImg");});};k.prototype.placeAt=function(i){this._oShell.placeAt(i);};k.prototype.onContentLoaded=function(e){var t=this;var C=q("#content")[0].contentWindow;var i=this.calcRelativeUrl(C.location.href);if(i&&!this._bIgnoreIFrameOnLoad){this.navigateTo(i,true,true);window.location.replace("#"+i);}this._applyTheme();this._bIgnoreIFrameOnLoad=false;q(C).bind("hashchange",function(){var i=t.calcRelativeUrl(C.location.href);if(i&&!t._bIgnoreIFrameOnLoad){t.navigateTo(i,true,true);window.location.hash=i;}t._bIgnoreIFrameOnLoad=false;});};k.prototype.navigateTo=function(n,s,b,a){var t=this;var e="0px";var l="32px";var m="30px";var o="0px";var p="0px";var P=n.indexOf("#")===0?n.substring(1):n;var r=this._mAliases[P];if(r&&P!=r){b=false;P=r;}if(this._sCurrentContent==P){return;}var C=q("#content")[0];var u=C&&C.contentWindow;var v=this.findIndexForPage(P);if(a){window.open(P,"_blank");return;}if(!u||v===k.RETRY_LATER){setTimeout(function(){t.navigateTo(P,s,b);},200);return;}var w=v>=0?this._aTopLevelNavItems[v]:null;var x=this._oShell;var y=sap.ui.getCore().byId("demokitSplitter");if(w&&w._iTreeSize<=1){if(y.getSplitterBarVisible()){var z=y.getSplitterPosition();if(z!=="0%"){y._oldPos=z;y.setSplitterPosition("0%");}y.setSplitterBarVisible(false);}}else{if(!y.getSplitterBarVisible()){var z=y._oldPos||"20%";y.setSplitterPosition(z);y.setSplitterBarVisible(true);}}this._sCurrentContent=P;function B(P,X,Y){if(X){if(Y&&X.getSelectedNode&&X.getSelectedNode()){X.getSelectedNode().setIsSelected(false);}var Z=X.getNodes();for(var i=0;i<Z.length;i++){var $=Z[i].getCustomData();var _=false;for(var j in $){if($[j].getKey()=="_ref_"&&$[j].getValue()&&$[j].getValue().indexOf(P)>=0){_=true;break;}}if(_){var a1=X;while(a1 instanceof sap.ui.commons.TreeNode){a1.expand();a1=a1.getParent();}Z[i].setIsSelected(true);return Z[i];}else{var b1=B(P,Z[i],false);if(b1){return b1;}}}}return null;}function E(Q,j){var X=function(Q,Z,j){var $=[];var _=new sap.ui.model.Filter("parentName",sap.ui.model.FilterOperator.Contains,Z);$.push(_);var a1=Q.getBinding("nodes");a1.filter($);if(Z!==""){Q.expandAll();}var b1=(Q.getNodes().length===0);Q.setVisible(!b1);j.setVisible(b1);};var Y=new sap.ui.commons.SearchField({enableListSuggest:false,enableClear:true,enableFilterMode:true,startSuggestion:0,suggest:function(Z){X(Q,Z.getParameter("value"),j);}});Y.addEventDelegate({onAfterRendering:function(){Y._ctrl.$("searchico").addClass('sapUiIcon sapUiSearchFieldFilterIcon');Y._ctrl.$("searchico").attr('style','font-family: SAP-icons; cursor: default;');Y._ctrl.$("searchico").attr('data-sap-ui-icon-content','');}});Y._ctrl.setPlaceholder("Filter");Y.addStyleClass("sapUiDemokitAbsLayoutFirtsRow sapUiDemokitSearchField");return Y;}function F(Q,j,X,Y,Z){var $=new sap.ui.commons.Button({lite:true,icon:X,press:j.bind(Q)});$.addStyleClass("sapUiDemokitExpandCollapseButtons sapUiDemokitAbsLayoutFirtsRow");if(Z){$.addStyleClass(Z);}$.setTooltip(Y);$.addEventDelegate({onAfterRendering:function(){$.$("icon").attr("title",Y);$.$("icon").attr("aria-label",Y);}});return $;}function G(Q){return F(Q,Q.collapseAll,"sap-icon://collapse-group","Collapse All","sapUiDemokitCollapseButton");}function H(Q){return F(Q,Q.expandAll,"sap-icon://expand-group","Expand All");}var I=null;var K=w&&w.navItem;if(K&&this._sSelectedWorkSetItem!=K.getId()){K.setVisible(true);x.setSelectedWorksetItem(K);this._oSidePanelLayout.removeAllContent();if(w._oTree){this._oSidePanelLayout.addContent(E(w._oTree,w._oEmptyTreeLabel));this._oSidePanelLayout.addContent(G(w._oTree),{right:o,top:p});this._oSidePanelLayout.addContent(H(w._oTree),{right:m,top:p});this._oSidePanelLayout.addContent(w._oTree,{left:e,top:l});this._oSidePanelLayout.addContent(w._oEmptyTreeLabel,{left:e,top:l});}I=B(P,w._oTree,true);if(w.themable){if(x.getToolPopups().length==0){x.addToolPopup(this._oThemeSwitchPopup);}}else{x.removeAllToolPopups();}}else{var M=this._oSidePanelLayout.getContent();var Q;for(var i in M){if(M[i].getId().indexOf("index")>-1){Q=M[i];}}I=B(P,Q,true);if(!I&&P.indexOf("#")>0){var R=P.substr(0,P.indexOf("#")-1);I=B(R,Q);}}sap.ui.getCore().applyChanges();this._sSelectedWorkSetItem=x.getSelectedWorksetItem();if(!s){window.location.hash=P;}if(!b){this._bIgnoreIFrameOnLoad=true;var U=P&&P.match(/\/sap\/me?\//);var V=P&&P.indexOf("sap/m/demokit")!==-1;var W=(U&&!V)?"?sap-ui-xx-fakeOS=ios":"";u.location.replace((P.indexOf("/")==0?"":this.sBasePathname)+P+W);}};k.THEMES={"sap_bluecrystal":"Blue Crystal","sap_goldreflection":"Gold Reflection","sap_hcb":"High Contrast Black"};k.prototype._handleThemeChanged=function(e){var n=e.getParameter("newValue");for(var x in k.THEMES){if(k.THEMES[x]==n){this._sTheme=x;this._applyTheme();e.getSource().getParent().close();break;}}};k.prototype._applyTheme=function(){var C=q("#content")[0].contentWindow;var I=this.calcRelativeUrl(C.location.href);var t=I?this.findIndexForPage(I):-1;if(I&&t>=0&&this._aTopLevelNavItems[t].themable&&C&&C.sap&&C.sap.ui&&C.sap.ui.getCore){var a=I.match(/\/sap\/me?\//);var m=a?["sap_bluecrystal"]:this._aThemes;var s=C.sap.ui.demokit&&C.sap.ui.demokit._supportedThemes?C.sap.ui.demokit._supportedThemes:m;var b=this._oThemeSwitch.getItems();for(var i=0;i<b.length;i++){b[i].setEnabled(q.inArray(b[i].getKey(),s)>=0);}if(q.inArray(this._sTheme,s)<0){this._sTheme=s[0];this._oThemeSwitch.setValue(k.THEMES[this._sTheme]);}C.sap.ui.getCore().applyTheme(this._sTheme);}};(function(){function r(l,s){if(l.ref&&l.resolve==="lib"){l.ref=s+l.ref;}if(l.links){for(var i=0;i<l.links.length;i++){r(l.links[i],s);}}}function m(n,o){if(n.key!=o.key||!o.links||o.links.length==0){return;}if(!n.links){n.links=o.links;return;}function b(e,l){for(var j=0;j<e.links.length;j++){if(e.links[j].key===l){return e.links[j];}}return null;}var s;for(var i=0;i<o.links.length;i++){s=o.links[i];if(!s.key){n.links.push(s);}else{var e=b(n,s.key);if(e){m(e,s);}else{n.links.push(s);}}}}function a(i,C,l,o){for(var j=0;j<l.length;j++){var b=o[l[j]];if(b&&b.docu){r(b.docu,b.libraryUrl);m(i,b.docu);}}C(i);}k.addReleaseNotesToDevGuide=function(I,u,t,l){if(!u){u="releasenotes.html";}if(!t){t="Release Notes";}if(!l){l=1;}function b(n){if(n&&n.links&&n.links.length>0){return n.links[0];}return null;}var o=I;for(var i=0;i<l;i++){o=b(o);}if(o){o.links=o.links||[];o.links.push({ref:u,text:t,alias:"releasenotes.html"});}return I;};k.extendDevGuide=function(I,C){q.sap.require("sap.ui.core.util.LibraryInfo");var l=new sap.ui.core.util.LibraryInfo();var u="discovery/all_libs";q.ajax({url:u,dataType:"json",error:function(x,s,e){q.sap.log.error("failed to load library list from '"+u+"': "+s+", "+e);C(I);},success:function(o,s,x){var b=o["all_libs"];if(!b){q.sap.log.error("failed to load library list from '"+u+"': "+s+", Data: "+b);C(I);return;}var e=0,j=b.length,n={},p=[],t;for(var i=0;i<j;i++){t=b[i].entry.replace(/\//g,".");p.push(t);l._getDocuIndex(t,function(E){n[E.library]=E;e++;if(e==j){a(I,C,p,n);}});}}});};})();return k;},true);
