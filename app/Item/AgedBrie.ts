import { Item } from './index'

export class AgedBrie extends Item {
    public update() {
        this.updateQualityBeforeSellIn()

        this.decreaseSellIn()

        this.updateQualityAfterSellIn()
    }

    private updateQualityAfterSellIn() {
        if (this.hasSellInDatePassed()) {
            this.increaseQualityBy(1)
        }
    }

    private updateQualityBeforeSellIn() {
        this.increaseQualityBy(1)
    }
}
