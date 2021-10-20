import { Item } from './index'

export class BackstagePasses extends Item {
    public update() {
        this.updateQualityBeforeSellIn()

        this.decreaseSellIn()

        this.updateQualityAfterSellIn()
    }

    private updateQualityAfterSellIn() {
        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(this._quality)
        }
    }

    public updateQualityBeforeSellIn() {
        this.increaseQualityBy(1)
        if (this._sellIn < 11 && this._quality < this.MAX_QUALITY) {
            this.increaseQualityBy(1)
        }
        if (this._sellIn < 6 && this._quality < this.MAX_QUALITY) {
            this.increaseQualityBy(1)
        }
    }
}
