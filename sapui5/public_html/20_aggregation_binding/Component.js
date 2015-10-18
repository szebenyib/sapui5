/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


sap.ui.define(["sap/ui/core/UIComponent",
								"sap/ui/model/json/JSONModel",
								"sap/ui/model/resource/ResourceModel",
								"namespace_id/controller/ownDialog"],
							function (UIComponent,
												JSONModel,
												ResourceModel,
												ownDialog) {
								"use strict";
								return UIComponent.extend("namespace_id.Component", {
									metadata: {
										manifest: "json"
									},
									init: function() {
										//call parent's init
										UIComponent.prototype.init.apply(this, arguments);
										//set data model
										var oData = {
											recipient: {
												name: "This is the recipient's name."
											}
										};
										var oModel = new JSONModel(oData);
										this.setModel(oModel);
										//set i18n model
										var i18nModel = new ResourceModel({
											bundleName: "namespace_id.i18n.i18n"
										});
										this.setModel(i18nModel, "i18n");
										//set ownDialog
										this.ownDialog = new ownDialog();
										//set local fake data
										var oConfig = this.getMetadata().getConfig();
										var sNamespace = this.getMetadata().getManifestEntry("sap.app").id;
										var oInvoiceModel = new JSONModel(jQuery.sap.getModulePath(sNamespace, oConfig.invoiceLocal));
									this.setModel(oInvoiceModel, "invoice");
									}
								});
							});