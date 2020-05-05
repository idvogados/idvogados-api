const { ListDeliveryPersonByIdUseCase } = require("./ListDeliveryPersonByIdUseCase");
const { MemoryDeliveryPersonRepository } = require("./MemoryDeliveryPersonRepository");

class MemoryDI {

    static listDeliveryPersonByIdUseCase(presenter) {
        const repository = new MemoryDeliveryPersonRepository;
        const useCase = new ListDeliveryPersonByIdUseCase(presenter, repository);
        return useCase;
    }

}

module.exports = { MemoryDI };
