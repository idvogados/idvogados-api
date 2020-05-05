const express = require("express");

const { DeliveryPersonRouter } = require("./route/DeliveryPersonRouter");


module.exports = (diTransactionUseCase) => {

    const deliveryPersonRouter = new DeliveryPersonRouter(diTransactionUseCase);

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));


    app.use("/deliveryperson", deliveryPersonRouter.getRouter());

    return app;
}
