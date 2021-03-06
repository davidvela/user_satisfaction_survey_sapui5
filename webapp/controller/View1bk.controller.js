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
			
			
			// rich text editor sapui5 
			var sHtmlValue1 = ''
			var sHtmlValue2 = '<p style="text-align: justify; background: red; font-size: 10pt; font-family: Calibri, sans-serif;"><strong><span style="font-size: 10.5pt; font-family: sans-serif; background: red; color: yellow;">Lorem ipsum dolor sit amet</span></strong></p>'
			
			var sHtmlValue = '<p style="text-align: justify; background: white; font-size: 10pt; font-family: Calibri, sans-serif;"><strong><span style="font-size: 10.5pt; font-family: sans-serif; color: black;">Lorem ipsum dolor sit amet</span></strong>' +
				'<span style="font-size: 10.5pt; font-family: sans-serif; color: black;">, consectetur adipiscing elit. Suspendisse ornare, nibh nec gravida tincidunt, ipsum quam venenatis nisl, vitae venenatis urna sem eget ipsum. Ut cursus auctor leo et vulputate. ' +
				'Curabitur nec pretium odio, sed auctor felis. In vehicula, eros aliquam pharetra mattis, ante mi fermentum massa, nec pharetra arcu massa finibus augue. </span></p> ' +
				'<p style="margin: 0in 0in 11.25pt; text-align: justify; background: white; font-size: 10pt; font-family: Calibri, sans-serif;"><img style="float: left; padding-right: 1em;" src="http://monliban.org/images/1473838236_274706_l_srgb_s_gl_465881_large.jpg" width="304" height="181" />' +
				'<span style="font-size: 10.5pt; font-family: sans-serif; color: #0070c0;">Phasellus imperdiet metus est, in luctus erat fringilla ut. In commodo magna justo, sit amet ultrices ipsum egestas quis.</span><span style="font-size: 10.5pt; font-family: sans-serif; color: black;"> ' +
				'Nullam ac mauris felis. Sed tempor odio diam, nec ullamcorper lacus laoreet vitae. <strong>Aenean quam libero</strong>, varius eu ex eu, aliquet fermentum orci. Donec eget ante sed enim pretium tempus. <strong><em>Aliquam semper neque eu aliquam dictum</em></strong>. ' +
				'Nulla in convallis diam. Fusce molestie risus nec posuere ullamcorper. Fusce ut sodales tortor. <u>Morbi eget odio a augue viverra semper.</u></span></p>' +
				'<p style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">Fusce dapibus sodales ornare. ' +
				'Nullam ac mauris felis. Sed tempor odio diam, nec ullamcorper lacus laoreet vitae. Aenean quam libero, varius eu ex eu, aliquet fermentum orci. Donec eget ante sed enim pretium tempus. Nullam laoreet metus ac enim placerat, nec tempor arcu finibus. ' +
				'Curabitur nec pretium odio, sed auctor felis. Nam eu neque faucibus, pharetra purus id, congue elit. Phasellus neque lectus, gravida at cursus at, pretium eu lorem. </span></p>' +
				'<ul>' +
				'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">Nulla non elit hendrerit, auctor arcu sit amet, tempor nisl.</span></li>' +
				'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">Morbi sed libero pulvinar, maximus orci et, hendrerit orci.</span></li>' +
				'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">Phasellus sodales enim nec sapien commodo mattis.</span></li>' +
				'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">Integer laoreet eros placerat pharetra euismod.</span></li>' +
				'</ul>' +
				'<p style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #c00000;">Ut vitae commodo ante. Morbi nibh dolor, ullamcorper sed interdum id, molestie vel libero. ' +
				'Proin volutpat dui eget ipsum scelerisque, a ullamcorper ipsum mattis. Cras sed elit sit amet diam convallis vehicula vitae ut nisl. Ut ornare dui ligula, id euismod lectus eleifend at. Nulla facilisi. In pharetra lectus et augue consequat vestibulum.</span></p>' +
				'<ol>' +
				'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">Proin id eros vel libero maximus dignissim ac et velit.</span></li>' +
				'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">In non odio pharetra, dapibus augue quis, laoreet felis.</span></li>' +
				'</ol>' +
				'<p style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">Donec a consectetur libero. Donec ut massa justo. Duis euismod varius odio in rhoncus. Nullam sagittis enim vel massa tempor, ' +
				'ut malesuada libero mollis. Vivamus dictum diam diam, quis rhoncus ex congue vel.</span></p>' +
				'<p style="text-align: center; font-size: 10pt; font-family: Calibri, sans-serif;" align="center"><em><span style="font-family: sans-serif; color: #a6a6a6;">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</span></em></p>' +
				'<p style="text-align: right; font-size: 10pt; font-family: Calibri, sans-serif;" align="right"><span style="font-family: sans-serif; color: #353535;">-</span> <strong><span style="font-family: sans-serif; color: #353535;">Sed in lacus dolor.</span></strong></p>';
			
			var that = this;
			sap.ui.require(["sap/ui/richtexteditor/RichTextEditor"],
				function (RTE) {
					var oRichTextEditor = new RTE("myRTE2", {
						editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
						width: "100%",
						height: "200px",
						customToolbar: true,
						showGroupFont: true,
						showGroupLink: true,
						showGroupInsert: true,
						value: sHtmlValue2
					});

					that.getView().byId("idVerticalLayout").addContent(oRichTextEditor);
					sap.ui.getCore().applyChanges();
					oRichTextEditor.addButtonGroup("styleselect").addButtonGroup("table");
			});
			
			
			var oModeltxtx = new sap.ui.model.json.JSONModel({ 
				 HTML : "<h3>Test</h3>   Neptune <em>SAP</em> <strong>hola</strong> " 
				// HTML : "<h3>subheader</h3>" +
				// "<p>link: <a href=\"//www.sap.com\" style=\"color:green; font-weight:600;\">link to sap.com</a> - links open in a new window.</p>" +
				// "<p>paragraph: <strong>strong</strong> and <em>emphasized</em>.</p>" +
				// "<p>list:</p>" +
				// "<ul><li>list item 1</li><li>list item 2<ul><li>sub item 1</li><li>sub item 2</li></ul></li></ul>" +
				// "<p>pre:</p><pre>abc    def    ghi</pre>" +
				// "<p>code: <code>var el = document.getElementById(\"myId\");</code></p>" +
				// "<p>cite: <cite>a reference to a source</cite></p>" +
				// "<dl><dt>definition:</dt><dd>definition list of terms and descriptions</dd>"
			});
			this.getView().setModel(oModeltxtx, "txt");
			
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