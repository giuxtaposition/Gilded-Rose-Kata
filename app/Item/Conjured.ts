import { Item } from './index'

export class Conjured extends Item {
    public update() {
        this.updateQualityBeforeSellIn()

        this.decreaseSellIn()

        this.updateQualityAfterSellIn()
    }

    private updateQualityAfterSellIn() {
        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(2)
        }
    }

    private updateQualityBeforeSellIn() {
        this.decreaseQualityBy(2)
    }
}
