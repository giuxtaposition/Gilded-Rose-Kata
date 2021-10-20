import { Item } from './index'

export class Conjured extends Item {
    public update() {
        this.decreaseQualityBy(2)

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(2)
        }
    }
}
