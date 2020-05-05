"use stricct";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const request = require('supertest');


const { DeliveryPerson } = require("../../src/entity/DeliveryPerson");
const { MemoryDeliveryPersonRepository } = require("../../src/usecase/deliveryperson/MemoryDeliveryPersonRepository");
const { MemoryDI } = require("../../src/usecase/deliveryperson/MemoryDI");
const app = require("../../src/entrypoint/web_express/app")(MemoryDI);

beforeEach(() => MemoryDeliveryPersonRepository.clearDatabase());



describe("Delivery Person Use Cases Routes #integration #web_express", () => {

    it("Should return Ok on test route", async () => {
        await request(app).get('/deliveryperson/test').expect(200).expect({ok:true, message: "it worked"});
    });

    it("Should return 404 when no delivery person is found", async () => {
        await request(app).get('/deliveryperson/list/1234').expect(404);
    });

    it("Should return delivery person when providing valid id", async () => {
        const deliveryPersonDto = {id: "1234", name: "Zaphod", age: 42};
        const deliveryPersonRepository = new MemoryDeliveryPersonRepository;
        await deliveryPersonRepository.add(new DeliveryPerson(deliveryPersonDto));

        await request(app).get('/deliveryperson/list/1234').expect(200).expect(deliveryPersonDto);
    });

});
