sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function(Controller, Filter, FilterOperator){
    "use strict";

    return Controller.extend("butterflies.Table", {

        onInit: function() {

            // database connection
            const oModel = this.getOwnerComponent().getModel("data");

            this.getView().setModel(oModel);

        },

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
                
            const oCombinedFilter = new Filter({
                filters: aFilters,
                and: false
            })
            
            const oTable = this.byId("mainTable");
            const oBinding = oTable.getBinding("rows");
            oBinding.filter(sQuery ? oCombinedFilter: aFilters);
        },
    })
})