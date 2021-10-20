import { Item } from './index'

export class BasicItem extends Item {
    public update() {
        this.decreaseSellInBy(1)

        this.hasSellInDatePassed()
            ? this.decreaseQualityBy(2)
            : this.decreaseQualityBy(1)
    }
}
