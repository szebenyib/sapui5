/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";
	return Controller.extend("namespace_id.controller.App", {
		onShowHello: function() {
			MessageToast.show("Toasted message!");
		}
	});
});