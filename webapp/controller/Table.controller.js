sap.ui.define([
    "sap/ui/core/mvc/Controller"

], function(Controller){
    "use strict";

    return Controller.extend("butterflies.Table", {

        onInit: function() {

            // database connection
            const oModel = this.getOwnerComponent().getModel("data");

            this.getView().setModel(oModel);

        }
    })
})