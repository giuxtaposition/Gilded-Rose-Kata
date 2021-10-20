export class Item {
    private _name: string
    private _sellIn: number
    private _quality: number

    constructor(name, sellIn, quality) {
        this._name = name
        this._sellIn = sellIn
        this._quality = quality
    }

    public isSpecialItem() {
        return (
            this.isAgedBrie() || this.isBackstagePasses() || this.isSulfuras()
        )
    }

    public isConjured() {
        return this._name.includes('Conjured')
    }

    public isAgedBrie() {
        return this._name === 'Aged Brie'
    }

    public isBackstagePasses() {
        return this._name === 'Backstage passes to a TAFKAL80ETC concert'
    }

    public isSulfuras() {
        return this._name === 'Sulfuras, Hand of Ragnaros'
    }

    decreaseQualityBy(number) {
        if (this._quality > 0) {
            this._quality = this.isConjured()
                ? this._quality - number - 1
                : this._quality - number
        }
    }

    increaseQualityBy(number) {
        if (this._quality < 50) {
            this._quality = this._quality + number
        }
    }

    decreaseSellIn() {
        if (!this.isSulfuras()) {
            this._sellIn = this._sellIn - 1
        }
    }

    hasSellInDatePassed() {
        return this._sellIn < 0
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
            this.updateQualityBeforeSellIn(item)

            item.decreaseSellIn()

            if (item.hasSellInDatePassed()) {
                this.updateQualityAfterSellIn(item)
            }
        })

        return this.items
    }

    updateQualityAfterSellIn(item) {
        if (item.isAgedBrie()) {
            item.increaseQualityBy(1)
        }

        if (item.isBackstagePasses()) {
            item.decreaseQualityBy(item.quality)
        }

        if (!item.isSpecialItem()) {
            item.decreaseQualityBy(1)
        }
    }

    updateQualityBeforeSellIn(item) {
        if (!item.isSpecialItem()) {
            item.decreaseQualityBy(1)
        } else {
            item.increaseQualityBy(1)

            if (item.isBackstagePasses()) {
                this.updateBackstagePassesQuality(item)
            }
        }
    }

    updateBackstagePassesQuality(item) {
        if (item.sellIn < 11 && item.quality < 50) {
            item.increaseQualityBy(1)
        }
        if (item.sellIn < 6 && item.quality < 50) {
            item.increaseQualityBy(1)
        }
    }
}
