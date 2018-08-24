sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function (MessageToast, Controller) {
	"use strict";
	var data = {
		'DataToday': [{
			"status": "Happy",
			"value": "20"
		}, {
			"status": "Ok",
			"value": "10"
		}, {
			"status": "Sad",
			"value": "2"
		}]
	};
	return Controller.extend("ussat.user_satisfaction_survey_sapui5.controller.View1", {

		onPress: function (evt) {
			// send the response to the server ... 
			var oModel = new sap.ui.model.json.JSONModel();
			var index;
			if (evt.getSource().getId().includes("Happy") == true) {
				index = 0;
			} else if ( evt.getSource().getId().includes("OK") == true) {
				index = 1;
			}
			else if ( evt.getSource().getId().includes("Sad") == true) {
				index = 2;
			};

			if (index == undefined) {
				MessageToast.show("Invalid Button");
				return;
			}

			data["DataToday"][index]["value"] = parseInt(data["DataToday"][index]["value"]) + 1;

			oModel.setData(data);
			var oVizFrame = this.getView().byId("idpiechart");

			MessageToast.show(evt.getSource().getId() + " Pressed");
			oVizFrame.setModel(oModel);
		},

		onInit: function (evt) {
			// example from http://www.saplearners.com/pie-chart-using-vizframe-sap-viz-ui5-controls-in-sapui5/
			//      1.Get the id of the VizFrame		
			var oVizFrame = this.getView().byId("idpiechart");

			//      2.Create a JSON Model and set the data
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);

			//      3. Create Viz dataset to feed to the data to the graph
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: 'status',
					value: "{status}"
				}],
				measures: [{
					name: 'value',
					value: '{value}'
				}],
				data: {
					path: "/DataToday"
				}
			});
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);

			//      4.Set Viz properties
			oVizFrame.setVizProperties({
				title: {
					text: "Statistics"
				},
				plotArea: {
					// colorPalette: d3.scale.category20().range(),
					colorPalette: ['yellow', "blue", 'red'],
					drawingEffect: "glossy"
				}
			});

			var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "size",
					'type': "Measure",
					'values': ["value"]
				}),
				feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': ["status"]
				});
			oVizFrame.addFeed(feedSize);
			oVizFrame.addFeed(feedColor);

		}

	});
});