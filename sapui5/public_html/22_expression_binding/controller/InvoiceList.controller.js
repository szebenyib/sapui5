/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
sap.ui.define(["sap/ui/core/mvc/Controller",
							"sap/ui/model/json/JSONModel"], function(Controller,
																												JSONModel) {
	"use strict";
	return Controller.extend("namespace_id.controller.InvoiceList", {
		onInit: function() {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		}
	});
});


