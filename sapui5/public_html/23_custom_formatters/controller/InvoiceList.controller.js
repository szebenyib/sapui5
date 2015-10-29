/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
sap.ui.define(["sap/ui/core/mvc/Controller",
							"sap/ui/model/json/JSONModel",
							"namespace_id/model/formatter"], function(Controller,
																												JSONModel,
																												formatter) {
	"use strict";
	return Controller.extend("namespace_id.controller.InvoiceList", {
		//just a simple local property to store the loaded functions
		formatter: formatter,
		onInit: function() {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		}
	});
});


