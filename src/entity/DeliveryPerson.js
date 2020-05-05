class DeliveryPerson {

    constructor({id, name, age}) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
    }

}

module.exports = { DeliveryPerson };
