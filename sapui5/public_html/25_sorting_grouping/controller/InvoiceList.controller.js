/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
sap.ui.define(["sap/ui/core/mvc/Controller",
							"sap/ui/model/json/JSONModel",
							"namespace_id/model/formatter",
							"sap/ui/model/Filter",
							"sap/ui/model/FilterOperator"], function(Controller,
																												JSONModel,
																												formatter,
																												Filter,
																												FilterOperator) {
	"use strict";
	return Controller.extend("namespace_id.controller.InvoiceList", {
		//just a simple local property to store the loaded functions
		formatter: formatter,
		onInit: function() {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterInvoices: function(oEvent) {
			//by putting oevent above we can capture the event's properties
			//to use them here
			
			//##build filter array##
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			//if there is a content
			if (sQuery) {
				aFilter.push(new Filter("ProductName",
																FilterOperator.Contains,
																sQuery));
			}
			//##filter binding##
			var oList = this.getView().byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});


