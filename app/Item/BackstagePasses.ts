import { Item } from './index'

export class BackstagePasses extends Item {
    public update() {
        this.increaseQualityBy(1)
        this.updateQualityBeforeSellIn()

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(this._quality)
        }
    }

    public updateQualityBeforeSellIn() {
        if (this._sellIn < 11 && this._quality < 50) {
            this.increaseQualityBy(1)
        }
        if (this._sellIn < 6 && this._quality < 50) {
            this.increaseQualityBy(1)
        }
    }
}
