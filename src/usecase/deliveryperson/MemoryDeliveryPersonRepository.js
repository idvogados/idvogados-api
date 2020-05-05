const { DeliveryPerson } = require("../../entity/DeliveryPerson");

let database = {};

class MemoryDeliveryPersonRepository {

    async findById(id) {
        if(database[id]) {
            return new DeliveryPerson(database[id]);
        }
        return null;
    }

    async add(deliveryPerson) {
        const dto = this.toDto(deliveryPerson);
        database[dto.id] = dto;
    }

    // as the mapping becomes more complex, it should move to mapper classes.
    toDto(deliveryPerson) {
        return {
            id: deliveryPerson.getId(),
            name: deliveryPerson.getName(),
            age: deliveryPerson.getAge()
        };
    }

    static clearDatabase() {
        database = {};
    }
}

module.exports = { MemoryDeliveryPersonRepository };
