/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("namespace_id.controller.App", {
		onInit: function() {
			//set data model on view
			var oData = {
				recipient: {
					name: "Holy crap!"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},
		onSayThis: function() {
			MessageToast.show("Toasted message!");
		}
	});
});