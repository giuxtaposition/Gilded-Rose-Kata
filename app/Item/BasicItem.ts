import { Item } from './index'

export class BasicItem extends Item {
    public update() {
        this.decreaseQualityBy(1)

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(1)
        }
    }
}
