/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ComboBoxBase','./ComboBoxBaseRenderer','./ComboBoxRenderer','./SelectList','./library'],function(q,C,a,b,S,l){"use strict";var c=C.extend("sap.m.ComboBox",{metadata:{library:"sap.m",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});function h(i){var d=this.getFocusDomRef(),e=d.selectionStart,f=d.selectionEnd,I=e!==f,t=d.value.substring(0,d.selectionStart),o=this.getSelectedItem();if(i&&(i!==o)){this.updateDomValue(i.getText());this.setSelection(i);this.fireSelectionChange({selectedItem:i});i=this.getSelectedItem();if(!q.sap.startsWithIgnoreCase(i.getText(),t)||!I){e=0;}this.selectText(e,d.value.length);}this.scrollToItem(i);}function s(i,e){if(document.activeElement===this.getFocusDomRef()){this.selectText(i,e);}}c.prototype._handleAriaActiveDescendant=function(i){var d=this.getFocusDomRef(),A="aria-activedescendant";if(d){if(i&&i.getDomRef()&&this.isOpen()){d.setAttribute(A,i.getId());}else{d.removeAttribute(A);}}};c.prototype._callMethodInControl=function(f,A){var L=this.getList();if(A[0]==="items"){if(L){return S.prototype[f].apply(L,A);}}else{return C.prototype[f].apply(this,A);}};c.prototype._setItemVisibility=function(i,v){var o=i&&i.$(),d="sapMSelectListItemInvisible";if(v){i.bVisible=true;o.length&&o.removeClass(d);}else{i.bVisible=false;o.length&&o.addClass(d);}};c.prototype.setSelectedIndex=function(i,_){var I;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);I=_[i];if(I){this.setSelection(I);}};c.prototype._createPopover=function(){var p=new sap.m.Popover({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(p);return p;};c.prototype._decoratePopover=function(p){var t=this;p._removeArrow=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"];};p._setPosition=function(){this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"];};p._setArrowPosition=function(){};p.open=function(){return this.openBy(t);};};c.prototype.onAfterRenderingPopover=function(){var p=this.getPicker();p._removeArrow();p._setPosition();};c.prototype._synchronizePickerWidth=function(){var d=this.getDomRef();if(d){this.getPicker().setContentWidth((d.offsetWidth/parseFloat(sap.m.BaseFontSize))+"rem");}};c.prototype._createDialog=function(){var d=sap.m.ComboBoxBaseRenderer.CSS_CLASS;var D=new sap.m.Dialog({stretchOnPhone:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.InputBase({value:this.getSelectedItem().getText(),width:"100%",editable:false}).addStyleClass(d+"Input")}).addStyleClass(d+"Bar")});D.getAggregation("customHeader").attachBrowserEvent("tap",function(){D.close();},this);return D;};c.prototype.onBeforeOpenDialog=function(){var H=this.getPicker().getCustomHeader();H.getContentLeft()[0].setValue(this.getSelectedItem().getText());};c.prototype.onBeforeRendering=function(){C.prototype.onBeforeRendering.apply(this,arguments);this.synchronizeSelection();};c.prototype.oninput=function(e){C.prototype.oninput.apply(this,arguments);if(e.isMarked("invalid")){return;}var o=this.getSelectedItem(),I=this.getItems(),d=e.target,v=d.value,f=true,V=false,g,m,i=0;for(;i<I.length;i++){g=I[i];m=q.sap.startsWithIgnoreCase(g.getText(),v);if(v===""){m=true;}this._setItemVisibility(g,m);if(m&&!V){V=true;}if(f&&m&&v!==""){f=false;if(this._bDoTypeAhead){this.updateDomValue(g.getText());}this.setSelection(g);if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}if(this._bDoTypeAhead){if(sap.ui.Device.os.blackberry||sap.ui.Device.os.android){setTimeout(s.bind(this,v.length,this.getValue().length),0);}else{this.selectText(v.length,9999999);}}this.scrollToItem(this.getSelectedItem());}}if(v===""||!V){this.setSelection(null);if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}}if(V){this.open();}else{this.isOpen()?this.close():this.clearFilter();}};c.prototype.onSelectionChange=function(o){var i=o.getParameter("selectedItem"),v;this.close();this.updateDomValue(i.getText());this.setSelection(i);this.fireSelectionChange({selectedItem:this.getSelectedItem()});v=this.getValue();if(sap.ui.Device.system.desktop){q.sap.delayedCall(0,this,"selectText",[v.length,v.length]);}};c.prototype.onkeydown=function(e){C.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();var k=q.sap.KeyCodes;this._bDoTypeAhead=(e.which!==k.BACKSPACE)&&(e.which!==k.DELETE);};c.prototype.oncut=function(e){C.prototype.oncut.apply(this,arguments);this._bDoTypeAhead=false;};c.prototype.onsapenter=function(e){C.prototype.onsapenter.apply(this,arguments);e.setMarked();if(!this.getEnabled()||!this.getEditable()){return;}var v=this.getValue();this.setValue(v);this.selectText(v.length,v.length);if(this.isOpen()){this.close();}};c.prototype.onsapdown=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var n,d=this.getSelectableItems();n=d[d.indexOf(this.getSelectedItem())+1];h.call(this,n);};c.prototype.onsapup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var p,d=this.getSelectableItems();p=d[d.indexOf(this.getSelectedItem())-1];h.call(this,p);};c.prototype.onsaphome=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var f=this.getSelectableItems()[0];h.call(this,f);};c.prototype.onsapend=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var L=this.findLastEnabledItem(this.getSelectableItems());h.call(this,L);};c.prototype.onsappagedown=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var d=this.getSelectableItems(),i=d.indexOf(this.getSelectedItem())+10,I;i=(i>d.length-1)?d.length-1:Math.max(0,i);I=d[i];h.call(this,I);};c.prototype.onsappageup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var d=this.getSelectableItems(),i=d.indexOf(this.getSelectedItem())-10,I;i=(i>d.length-1)?d.length-1:Math.max(0,i);I=d[i];h.call(this,I);};c.prototype.onfocusin=function(e){if(e.target===this.getOpenArea()){this.bCanNotOpenMessage=true;if(sap.ui.Device.system.desktop){this.focus();}}else{if(sap.ui.Device.system.desktop){setTimeout(function(){var d=this.getFocusDomRef();if(document.activeElement===d&&!this.bFocusoutDueRendering&&!q(d).getSelectedText()){this.selectText(0,this.getValue().length);}}.bind(this),0);}if(!this.isOpen()&&!this.bCanNotOpenMessage){this.openValueStateMessage();}this.bCanNotOpenMessage=false;}this.$().addClass("sapMFocus");};c.prototype.onsapfocusleave=function(e){C.prototype.onsapfocusleave.apply(this,arguments);var p=this.getAggregation("picker");if(!e.relatedControlId||!p){return;}var o=sap.ui.getCore().byId(e.relatedControlId),f=o&&o.getFocusDomRef();if(q.sap.containsOrEquals(p.getFocusDomRef(),f)){if(sap.ui.Device.system.desktop){this.focus();}}};c.prototype.setSelection=function(i){var L=this.getList(),k;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof sap.ui.core.Item)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}k=i?i.getKey():"";this.setProperty("selectedKey",k,true);this._handleAriaActiveDescendant(i);};c.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};c.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var k=this.getSelectedKey(),i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);if(this._sValue===this.getValue()){this.setValue(i.getText());}}};c.prototype.isFiltered=function(){var L=this.getList();return L&&(L.getVisibleItems().length!==L.getItems().length);};c.prototype.isItemVisible=function(i){return i&&(i.bVisible===undefined||i.bVisible);};c.prototype.createPicker=function(p){var P=this.getAggregation("picker"),d=a.CSS_CLASS;if(P){return P;}P=this["_create"+p]();this.setAggregation("picker",P,true);P.setHorizontalScrolling(false).addStyleClass(d+"Picker").addStyleClass(d+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return P;};c.prototype.createList=function(){this._oList=new S({width:"100%"}).addEventDelegate({ontap:function(e){this.close();}},this).attachSelectionChange(this.onSelectionChange,this);return this._oList;};c.prototype.onBeforeRenderingPicker=function(){var o=this["onBeforeRendering"+this.getPickerType()];o&&o.call(this);};c.prototype.onAfterRenderingPicker=function(){var o=this["onAfterRendering"+this.getPickerType()];o&&o.call(this);};c.prototype.onBeforeOpen=function(){var p=this["onBeforeOpen"+this.getPickerType()],d=this.getFocusDomRef();this.addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed");if(d){d.setAttribute("aria-owns",this.getList().getId());}this.addContent();sap.ui.Device.resize.attachHandler(this._synchronizePickerWidth,this);p&&p.call(this);};c.prototype.onBeforeOpenPopover=function(){this._synchronizePickerWidth();};c.prototype.onAfterOpen=function(){var d=this.getFocusDomRef(),i=this.getSelectedItem();if(d){d.setAttribute("aria-expanded","true");i&&d.setAttribute("aria-activedescendant",i.getId());}};c.prototype.onBeforeClose=function(){var d=this.getFocusDomRef();if(d){d.removeAttribute("aria-owns");d.removeAttribute("aria-activedescendant");}this.removeStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed");sap.ui.Device.resize.detachHandler(this._synchronizePickerWidth,this);};c.prototype.onAfterClose=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("aria-expanded","false");}if(document.activeElement===d){this.openValueStateMessage();}this.clearFilter();};c.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};c.prototype.getDefaultSelectedItem=function(){return null;};c.prototype.clearSelection=function(){this.setSelection(null);};c.prototype.onItemChange=function(o){var d=this.getAssociation("selectedItem"),n=o.getParameter("newValue"),p=o.getParameter("name");if(d===o.getParameter("id")){switch(p){case"text":this.setValue(n);break;case"key":this.setSelectedKey(n);break;}}};c.prototype.selectText=function(i,d){C.prototype.selectText.apply(this,arguments);this.textSelectionStart=i;this.textSelectionEnd=d;return this;};c.prototype.addAggregation=function(A,o,d){this._callMethodInControl("addAggregation",arguments);if(A==="items"&&!d&&!this.isInvalidateSuppressed()){this.invalidate(o);}return this;};c.prototype.getAggregation=function(){return this._callMethodInControl("getAggregation",arguments);};c.prototype.setAssociation=function(A,i,d){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return C.prototype.setAssociation.apply(this,arguments);};c.prototype.indexOfAggregation=function(){return this._callMethodInControl("indexOfAggregation",arguments);};c.prototype.insertAggregation=function(){this._callMethodInControl("insertAggregation",arguments);return this;};c.prototype.removeAggregation=function(){return this._callMethodInControl("removeAggregation",arguments);};c.prototype.removeAllAggregation=function(){return this._callMethodInControl("removeAllAggregation",arguments);};c.prototype.destroyAggregation=function(A,d){this._callMethodInControl("destroyAggregation",arguments);return this;};c.prototype.setProperty=function(p,v,d){var L=this.getList();if((p==="selectedKey")||(p==="selectedItemId")){L&&S.prototype.setProperty.apply(L,arguments);}return C.prototype.setProperty.apply(this,arguments);};c.prototype.removeAllAssociation=function(A,d){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return C.prototype.removeAllAssociation.apply(this,arguments);};c.prototype.clone=function(I){var o=C.prototype.clone.apply(this,arguments),L=this.getList();if(!this.isBound("items")&&L){for(var i=0,d=L.getItems();i<d.length;i++){o.addItem(d[i].clone());}o.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));}return o;};c.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};c.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};c.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(!(i instanceof sap.ui.core.Item)&&i!==null){q.sap.log.warning('Warning: setSelectedItem() "vItem" has to be an instance of sap.ui.core.Item, a valid sap.ui.core.Item id, or null on',this);return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);if(i){this.setValue(i.getText());}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText());}else{this.setValue("");}return this;};c.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);i=this.getSelectedItem();if(i){this.setValue(i.getText());}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText());}else{this.setValue("");}return this;};c.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var i=this.getItemByKey(k);if(i||(k==="")){if(!i&&k===""){i=this.getDefaultSelectedItem();}this.setSelection(i);if(i){this.setValue(i.getText());}else if(i=this.getDefaultSelectedItem()){this.setValue(i.getText());}else{this.setValue("");}return this;}this._sValue=this.getValue();return this.setProperty("selectedKey",k);};c.prototype.getSelectedItem=function(){var v=this.getAssociation("selectedItem");return(v===null)?null:sap.ui.getCore().byId(v)||null;};c.prototype.removeItem=function(i){i=C.prototype.removeItem.apply(this,arguments);var I;if(this.isBound("items")&&!this.bDataUpdated){return i;}var v=this.getValue();if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){I=this.getDefaultSelectedItem();this.setSelection(I);this.setValue(v);}return i;};return c;},true);
