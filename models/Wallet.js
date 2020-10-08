
class Wallet {

    constructor() {
        this.amount = 0;
        this.destination = null;
    }

    get _amount() {
        return this.amount
    }
    set _amount(valor) {
        this.amount = valor;
    }
    get _destination() {
        return this.destination
    }
    set _destination(valor) {
        this.destination = valor;
    }
}

module.exports = Wallet;
