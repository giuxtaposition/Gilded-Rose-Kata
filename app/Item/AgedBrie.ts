import { Item } from './index'

export class AgedBrie extends Item {
    public update() {
        this.increaseQualityBy(1)

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.increaseQualityBy(1)
        }
    }
}
