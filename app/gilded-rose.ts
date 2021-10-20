export class Item {
    private _name: string
    private _sellIn: number
    private _quality: number

    constructor(name, sellIn, quality) {
        this._name = name
        this._sellIn = sellIn
        this._quality = quality
    }

    public updateQuality() {
        this.updateQualityBeforeSellIn()

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.updateQualityAfterSellIn()
        }
    }

    private isSpecialItem() {
        return (
            this.isAgedBrie() || this.isBackstagePasses() || this.isSulfuras()
        )
    }

    private isConjured() {
        return this._name.includes('Conjured')
    }

    private isAgedBrie() {
        return this._name === 'Aged Brie'
    }

    private isBackstagePasses() {
        return this._name === 'Backstage passes to a TAFKAL80ETC concert'
    }

    private isSulfuras() {
        return this._name === 'Sulfuras, Hand of Ragnaros'
    }

    private decreaseQualityBy(number) {
        if (this._quality > 0) {
            this._quality = this.isConjured()
                ? this._quality - number - 1
                : this._quality - number
        }
    }

    private increaseQualityBy(number) {
        if (this._quality < 50) {
            this._quality = this._quality + number
        }
    }

    private decreaseSellIn() {
        if (!this.isSulfuras()) {
            this._sellIn = this._sellIn - 1
        }
    }

    private hasSellInDatePassed() {
        return this._sellIn < 0
    }

    private updateQualityBeforeSellIn() {
        if (!this.isSpecialItem()) {
            this.decreaseQualityBy(1)
        } else {
            this.increaseQualityBy(1)

            if (this.isBackstagePasses()) {
                this.updateBackstagePassesQuality()
            }
        }
    }

    updateBackstagePassesQuality() {
        if (this._sellIn < 11 && this._quality < 50) {
            this.increaseQualityBy(1)
        }
        if (this._sellIn < 6 && this._quality < 50) {
            this.increaseQualityBy(1)
        }
    }

    updateQualityAfterSellIn() {
        if (this.isAgedBrie()) {
            this.increaseQualityBy(1)
        }

        if (this.isBackstagePasses()) {
            this.decreaseQualityBy(this._quality)
        }

        if (!this.isSpecialItem()) {
            this.decreaseQualityBy(1)
        }
    }

    get name() {
        return this._name
    }

    get sellIn() {
        return this._sellIn
    }

    get quality() {
        return this._quality
    }

    set sellIn(sellIn) {
        this._sellIn = sellIn
    }

    set quality(quality) {
        this._quality = quality
    }
}

export class GildedRose {
    items: Array<Item>

    constructor(items = [] as Array<Item>) {
        this.items = items
    }

    updateQuality() {
        this.items.forEach(item => {
            item.updateQuality()
        })

        return this.items
    }
}
