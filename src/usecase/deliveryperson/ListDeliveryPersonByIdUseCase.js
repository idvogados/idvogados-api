const { UseCaseCommand } = require("../UseCaseCommand");


class ListDeliveryPersonByIdUseCase extends UseCaseCommand {

    constructor(presenter, deliveryPersonRepository) {
        super();
        this.presenter = presenter;
        this.deliveryPersonRepository = deliveryPersonRepository;
    }

    async execute({ id }) {

        try {
            const deliveryPerson = await this.deliveryPersonRepository.findById(id);
            if(deliveryPerson)
                return this.presenter.ok(deliveryPerson);
            else
                return this.presenter.notFound();
        } catch(error) {
            return this.presenter.internalError(error.message);
        }

    }

}

module.exports = { ListDeliveryPersonByIdUseCase };
