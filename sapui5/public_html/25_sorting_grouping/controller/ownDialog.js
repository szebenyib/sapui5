/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


sap.ui.define(["sap/ui/base/Object"],
	function(Object) {
		"use strict";
		return Object.extend("namespace_id.controller.ownDialog", {
			_getDialog: function () {
				//the function gets the dialog, and creates it if it does not exist
				if (!this._oDialog) {
					//create dialog via fragment factory here
					this._oDialog = sap.ui.xmlfragment("namespace_id.view.ownDialog", this);
					//connection will not happen here
				}
				return this._oDialog;
			},
			open: function(oView) {
				var oDialog = this._getDialog();
				//connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
				//open dialog
				oDialog.open();
			},
			onCloseDialogPressed: function() {
				this._getDialog().close();
			}
		});
	}
);