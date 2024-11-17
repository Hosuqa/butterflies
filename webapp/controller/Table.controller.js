sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",

], function(Controller, Filter, FilterOperator, JSONModel){
    "use strict";

    return Controller.extend("butterflies.Table", {

        onInit: function() {

            // database connection
            const oModel = this.getOwnerComponent().getModel("data");

            this.getView().setModel(oModel);


            // creating new model for purpose of edit mode 
            const oStateModel = new JSONModel({
                editable: false 
              });
              this.getView().setModel(oStateModel, "state");

        },
        // search field function
        onFilterTable: function(oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");


            console.log('squery: ',sQuery)

            if (sQuery.length > 0) {
                aFilters.push(new Filter("Name", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Family", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Location", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Date", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Wingspan", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Weight", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Price", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter({
                    path: "Abundance",
                    operator: FilterOperator.BT,
                    value1: parseFloat(sQuery),
                    value2: parseFloat(sQuery)
                }))
                aFilters.push(new Filter({
                    path:"Color Rating",
                    operator: FilterOperator.BT,
                    value1: parseFloat(sQuery),
                    value2: parseFloat(sQuery)
                }))
                aFilters.push(new Filter("Habitat", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Lifespan", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Migration", FilterOperator.Contains, sQuery))
                aFilters.push(new Filter("Threat Level", FilterOperator.Contains, sQuery))
            }
                
            // merging filters
            const oCombinedFilter = new Filter({
                filters: aFilters,
                and: false
            })
            
            const oTable = this.byId("mainTable");
            const oBinding = oTable.getBinding("rows");
            oBinding.filter(sQuery ? oCombinedFilter: aFilters);
        },

        onToggleEdit: function() {

            const oStateModel = this.getView().getModel("state");
            const bEditable = oStateModel.getProperty("/editable");

            // negation of editable
            oStateModel.setProperty("/editable", !bEditable);

            if (!bEditable) {

                // creating backup data model on false value of editable 
                const oModel = this.getView().getModel("data");
                const aCurrentData = oModel.getProperty("/butterflies");
        
                const oBackupModel = new JSONModel({
                    butterfliesBackup: JSON.parse(JSON.stringify(aCurrentData))
                });
                this.getView().setModel(oBackupModel, "backup");
            }
        },

        onSave: function() {
            const oModel = this.getView().getModel("data");
            const aData = oModel.getProperty("/butterflies");

            const vData = aData.map(element => {
                const record = {
                    "GUID": element.GUID,
                    "Name": element["Name"].toString(),
                    "Family": element["Family"].toString(),
                    "Location": element["Location"].toString(),
                    "Date": new Date(element["Date"]).toISOString().split("T")[0],
                    "Wingspan": parseFloat(element["Wingspan"]).toString()+" mm",
                    "Weight": parseFloat(element["Weight"]).toString()+" g",
                    "Price": parseFloat(element["Price"]).toString(),
                    "Abundance": parseFloat(element["Abundance"]),
                    "Color Rating": parseFloat(element["Color Rating"]),
                    "Habitat": element["Habitat"].toString(),
                    "Lifespan": element["Lifespan"].toString(),
                    "Migration Pattern": element["Migration Pattern"].toString(),
                    "Threat Level": element["Threat Level"].toString()
                }
                return record; 
            })
            console.log("vdata: ", vData);
            oModel.setProperty("/butterflies", vData);

            // clearing backup
            this.getView().setModel(null, "backup");

            // cancel edition
            const oStateModel = this.getView().getModel("state");
            oStateModel.setProperty("/editable", false);
        },

        onCancel: function() {

            const oModel = this.getView().getModel("data");
            const oBackupModel = this.getView().getModel("backup");
            const oBackupData = oBackupModel.getProperty("/butterfliesBackup");

            // assigning oBackupData to current
            oModel.setProperty("/butterflies", oBackupData);

            // clearing backup
            this.getView().setModel(null, "backup");

            // cancel edition
            const oStateModel = this.getView().getModel("state");
            oStateModel.setProperty("/editable", false);
        },
    })
})