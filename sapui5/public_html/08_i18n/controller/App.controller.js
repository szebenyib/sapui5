/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function(Controller,
						MessageToast,
						JSONModel,
						ResourceModel) {
	"use strict";
	return Controller.extend("namespace_id.controller.App", {
		onInit: function() {
			//set data model on view
			var oData = {
				recipient: {
					name: "This is the recipient name"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
			//set i18n on view
			var i18nModel = new ResourceModel({
				bundleName: "namespace_id.i18n.i18n"
			});
			this.getView().setModel(i18nModel, "i18n");
		},
		onSayThis: function() {
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("sampleMessage", [sRecipient]);
			MessageToast.show(sMsg);
		}
	});
});