"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const { Presenter } = require("../../../../src/usecase/Presenter");
const { MemoryDeliveryPersonRepository } = require("../../../../src/usecase/deliveryperson/MemoryDeliveryPersonRepository");
const { ListDeliveryPersonByIdUseCase } = require("../../../../src/usecase/deliveryperson/ListDeliveryPersonByIdUseCase");
const { DeliveryPerson } = require("../../../../src/entity/DeliveryPerson");


class DeliveryPresenter extends Presenter {
    ok(payload) {}
    notFound() {}
}


describe("List delivery person by id #unit", () => {

    it("Should return no delivery person if none was added to db", async () => {

        const deliveryPersonRepository = new MemoryDeliveryPersonRepository;

        const presenter = new DeliveryPresenter;
        sinon.spy(presenter, "notFound");

        const listDeliveryPersonByIdUseCase = new ListDeliveryPersonByIdUseCase(presenter, deliveryPersonRepository);
        await listDeliveryPersonByIdUseCase.execute({id: "1234"});

        expect(presenter.notFound).to.have.been.called;
    });

    it("Should return one delivery person if one was added to db", async () => {

        const deliveryPersonDto = {id: "1234", name: "Zaphod", age: 42};

        const deliveryPersonRepository = new MemoryDeliveryPersonRepository;
        await deliveryPersonRepository.add(new DeliveryPerson(deliveryPersonDto));

        const presenter = new DeliveryPresenter;
        sinon.spy(presenter, "ok");

        const listDeliveryPersonByIdUseCase = new ListDeliveryPersonByIdUseCase(presenter, deliveryPersonRepository);
        await listDeliveryPersonByIdUseCase.execute({id: deliveryPersonDto.id});

        const response = presenter.ok.getCall(0).args[0];
        expect(response).to.deep.equal(deliveryPersonDto);
    });
});
