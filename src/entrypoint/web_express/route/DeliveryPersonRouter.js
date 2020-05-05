var express = require("express");

const { Presenter } = require("../../../usecase/Presenter");


class DeliveryPersonRouter extends Presenter {

    constructor(diUseCase) {
        super();
        this.diUseCase = diUseCase;
        this.router = express.Router();
        this.loadRoutes();
    }

    getRouter() {
        return this.router;
    }

    loadRoutes() {
        this.router.get("/test", this.test.bind(this));
        this.router.get("/list/:id", this.list.bind(this));
    }

    test(req, res) {
        res.json({ok:true, message: "it worked"});
    }

    async list(req, res) {
        const commandUseCase = await this.diUseCase.listDeliveryPersonByIdUseCase(this);
        await commandUseCase.execute(req.params);
        this.sendDtoResponseBack(res);
    }

    sendDtoResponseBack(res) {
        res.status(this.responseCode).json(this.payload);
    }

    ok(payloadDto) {
        this.responseCode = 200;
        this.payload = payloadDto;
    }

    notFound() {
        this.responseCode = 404;
        this.payload = null;
    }

    invalidError(message) {
        this.responseCode = 422;
        this.payload = { ok: false, message };
    }

    internalError(message) {
        this.responseCode = 500;
        this.payload = { ok: false, message };
    }
}

module.exports = { DeliveryPersonRouter };
