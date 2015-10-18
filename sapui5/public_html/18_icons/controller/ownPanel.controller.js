/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


sap.ui.define(["sap/ui/core/mvc/Controller",
								"sap/m/MessageToast"],
	function (Controller, MessageToast) {
		"use strict";
		return Controller.extend("namespace_id.controller.ownPanel", {
			onSayThis: function() {
					var oBundle = this.getView().getModel("i18n").getResourceBundle();
					var sRecipient = this.getView().getModel().getProperty("/recipient/name");
					var sMsg = oBundle.getText("sampleMessage", [sRecipient]);
					MessageToast.show(sMsg);
			},
			_getDialog: function () {
				//the function gets the dialog, and creates it if it does not exist
				if (!this._oDialog) {
					//create dialog via fragment factory here
					this._oDialog = sap.ui.xmlfragment("namespace_id.view.ownDialog", this);
					//connect dialog to view(models, lifecycle)
					this.getView().addDependent(this._oDialog);
				}
				return this._oDialog;
			},
			onDialogButtonPressed: function() {
//				var oBundle = this.getView.getModel("i18n").getResourceBundle();
//				var sRecipient = this.getView().getModel().getProperty("/recipient/name");
//				var sMsg = oBundle.getText("sampleMessage", [sRecipient]);
				this._getDialog().open();
			},
			onCloseDialogPressed: function() {
				this._getDialog().close();
			}
		});
	});