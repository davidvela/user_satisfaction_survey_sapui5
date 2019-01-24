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
	return Controller.extend("ess.empsatsur1.View1", {
		onStatPress: function(evt){
			//var hi =(name)=>{ return "hello  "+name }
			//MessageToast.show(hi("World"));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//this.getRouter().
			oRouter.navTo("statsRoute" 
				// { objectId: oItem.getBindingContext().getProperty("status")}
			);	
		}, 
		onSel1Press: function(evt){
			sap.ui.core.UIComponent.getRouterFor(this).navTo("sel1Route");
		},
		onHomePress: function(evt){
			sap.ui.core.UIComponent.getRouterFor(this).navTo("homeRoute");
		},
		onPress: function (evt) {
			// send the response to the server ... 
			var vModel = this.getView().getModel();
			//var vModel = sap.ui.getCore().getModel();
			var vData  = vModel.getData("/");
			
			var oModel = new sap.ui.model.json.JSONModel();
			var index, prop; 
			if (evt.getSource().getId().includes("Happy") == true) {
				index = 0;
				prop = "DataTodaySet('happy')"
			} else if ( evt.getSource().getId().includes("OK") == true) {
				index = 1;
				prop = "DataTodaySet('ok')"
			}
			else if ( evt.getSource().getId().includes("Sad") == true) {
				index = 2;
				prop = "DataTodaySet('sad')"
			};

			if (index == undefined) {
				MessageToast.show("Invalid Button");
				return;
			}

			// main model... 
			//vModel.setData(vData)
			vData[prop].value =  parseInt(vData[prop].value) + 1 
			vModel.setProperty("/"+prop,  vData[prop].value )
			this.getView().setModel(vModel)
			//sap.ui.getCore().setModel(vModel)
			
			// statistics 
			data["DataToday"][index]["value"] = String( parseInt(data["DataToday"][index]["value"]) + 1 ); 
			oModel.setData(	data);
			var oVizFrame = this.getView().byId("idpiechart");
			oVizFrame.setModel(oModel);
			

			// continue ... 
			MessageToast.show(evt.getSource().getId() + " Pressed");
			
			//tile 
			var value =	 { "value" : parseInt( data["DataToday"][0]["value"] )  } 
			var happytile1 = this.getView().byId("happytile1");
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData( value )
			happytile1.setModel(oModel1);
		},

		onInit: function (evt) {
			var value =	 { "value" : parseInt( data["DataToday"][0]["value"]) } 
			var happytile1 = this.getView().byId("happytile1");
			var oModel1 = new sap.ui.model.json.JSONModel();
			oModel1.setData( value )
			happytile1.setModel(oModel1);

			
			
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

			this.getView().attachEventOnce("beforeRendering", this._setUiBindings.bind(this));
			
		}, 
		_setUiBindings: function(  ) { //    sCustomerID, sEiAdmin, sKamNode, sIGjahr) {
			
			var oModel = this.getView().getModel();
			
			return
			
			// ---- old snippets
			
			var oBinding = this.getView().byId("statsTable").getBinding("items");
			
			/* @@Snippet - Edit */
			var aFilters = [];
			var oPage = this.getView().byId("page");
			var oI18n = this.getView().getModel("i18n").getResourceBundle();
			
			// if (sKamNode) {
			// 	oPage.setTitle(oI18n.getText("titleKMANode", [sKamNode]));
			// 	aFilters.push(new sap.ui.model.Filter("kamnode", "EQ", sKamNode));
			// }
			
			oBinding.filter(aFilters);
			this.filters = aFilters;
			
			/* @@Snippet - Edit */
			oModel.read( "/kpiSet", {
				filters: this.filters,
				success: function(oEvent) {
					var oData = oEvent.results[0];
					var oStatsModel = this.getView().getModel("stats");
					// oStatsModel.setProperty("/detractors", Number(oData.Detractors));
				}.bind(this)
			} );

		}

	});
});