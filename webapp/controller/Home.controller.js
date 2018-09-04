sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function (MessageToast, Controller) {
	"use strict";
	return Controller.extend("ess.empsatsur1.Home", {

		onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() );
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