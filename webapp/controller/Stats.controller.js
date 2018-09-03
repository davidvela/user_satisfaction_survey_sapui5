sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (MessageToast, Controller, History) {
	"use strict";
<<<<<<< HEAD
	return Controller.extend("ess.empsatsur1.Stats", {
=======
	return Controller.extend("ussat.user_satisfaction_survey_sapui5.controller.Stats", {
>>>>>>> refs/heads/master

		onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() );
		},
		navBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1", true);
			}
			
		},
		onInit: function (evt) {
			// var value =	 { "value" : parseInt( data["DataToday"][0]["value"]) } 
			// var happytile1 = this.getView().byId("happytile1");
			// var oModel1 = new sap.ui.model.json.JSONModel();
			// oModel1.setData( value )
			// happytile1.setModel(oModel1);
		}

	});
});