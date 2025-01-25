import { INumberFormatter } from "../entities/INumberFormatter";

class BrlNumberFormatter implements INumberFormatter {

    private readonly currency: Intl.NumberFormat;

    constructor() {
        this.currency = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    formatCurrency(value: number): string {
        return this.currency.format(value)
    }


}

export { BrlNumberFormatter };
