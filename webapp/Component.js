sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
<<<<<<< HEAD
	"ess/empsatsur1/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ess.empsatsur1.Component", {
=======
	"ussat/user_satisfaction_survey_sapui5/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ussat.user_satisfaction_survey_sapui5.Component", {
>>>>>>> refs/heads/master

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});