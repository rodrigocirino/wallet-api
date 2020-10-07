
class Wallet {

    constructor() {

    }

    get amount() {
        return this._amount
    }
    set amount(valor) {
        this._amount = valor;
    }
    get destination() {
        return this._destination
    }
    set destination(valor) {
        this._destination = valor;
    }
}

module.exports = Wallet;
