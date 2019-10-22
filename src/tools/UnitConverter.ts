export interface IUnitConverterQuantity {
    unit: string,
    amount: number
}

export default class UnitConverter {
    convert = (from: IUnitConverterQuantity, toUnit: string): IUnitConverterQuantity => {
        let newAmount: number = from.amount;
        // convert to oz
        switch (from.unit) {
            case 'g':
                newAmount /= 28.35;
                break;
            case 'lb':
                newAmount *= 16;
                break;
        }

        // convert to requested unit
        switch (toUnit) {
            case 'g':
                newAmount *= 28.35;
                break;
            case 'lb':
                newAmount /= 16;
                break
        }
        return {
            unit: toUnit,
            amount: newAmount
        };
    }
}