import { Item } from './index'

export class BasicItem extends Item {
    public update() {
        this.updateQualityBeforeSellIn()

        this.decreaseSellIn()

        this.updateQualityAfterSellIn()
    }

    private updateQualityAfterSellIn() {
        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(1)
        }
    }

    private updateQualityBeforeSellIn() {
        this.decreaseQualityBy(1)
    }
}
