import { Item } from './index'

export class BackstagePasses extends Item {
    public update() {
        this.decreaseSellInBy(1)

        this.hasSellInDatePassed()
            ? this.updateQualityAfterSellIn()
            : this.updateQualityBeforeSellIn()
    }

    private updateQualityAfterSellIn() {
        return this.decreaseQualityBy(this._quality)
    }

    public updateQualityBeforeSellIn() {
        this.increaseQualityBy(1)

        if (this._sellIn < 11) {
            this.increaseQualityBy(1)
        }

        if (this._sellIn < 6) {
            this.increaseQualityBy(1)
        }
    }
}
