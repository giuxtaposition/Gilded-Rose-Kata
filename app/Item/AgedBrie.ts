import { Item } from './index'

export class AgedBrie extends Item {
    public update() {
        this.decreaseSellInBy(1)

        this.hasSellInDatePassed()
            ? this.increaseQualityBy(2)
            : this.increaseQualityBy(1)
    }
}
