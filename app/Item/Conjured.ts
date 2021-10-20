import { Item } from './index'

export class Conjured extends Item {
    public update() {
        this.decreaseSellInBy(1)

        this.hasSellInDatePassed()
            ? this.decreaseQualityBy(4)
            : this.decreaseQualityBy(2)
    }
}
