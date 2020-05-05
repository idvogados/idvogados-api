const notImplemented = () => {throw new Error("Not implemented. Presenter should be extended.")};

class Presenter {
    ok(payload) {
        notImplemented();
    }

    notFound() {
        notImplemented();
    }

    validationError(invalidFields) {
        notImplemented();
    }

    internalError(message) {
        notImplemented();
    }
}

module.exports = { Presenter };
