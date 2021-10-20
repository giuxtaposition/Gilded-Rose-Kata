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

            this.decreaseSellIn(item)

            if (this.hasSellInDatePassed(item)) {
                this.updateQualityAfterSellIn(item)
            }
        })

        return this.items
    }

    updateQualityAfterSellIn(item) {
        if (item.isAgedBrie()) {
            this.increaseQuality(item, 1)
        }

        if (item.isBackstagePasses()) {
            this.decreaseQuality(item, item.quality)
        }

        if (!item.isSpecialItem()) {
            this.decreaseQuality(item, 1)
        }
    }

    updateQualityBeforeSellIn(item) {
        if (!item.isSpecialItem()) {
            this.decreaseQuality(item, 1)
        } else {
            this.increaseQuality(item, 1)

            if (item.isBackstagePasses()) {
                this.updateBackstagePassesQuality(item)
            }
        }
    }

    updateBackstagePassesQuality(item) {
        if (item.sellIn < 11 && item.quality < 50) {
            this.increaseQuality(item, 1)
        }
        if (item.sellIn < 6 && item.quality < 50) {
            this.increaseQuality(item, 1)
        }
    }

    decreaseQuality(item, number) {
        if (item.quality > 0) {
            item.quality = item.isConjured()
                ? item.quality - number - 1
                : item.quality - number
        }
    }

    increaseQuality(item, number) {
        if (item.quality < 50) {
            item.quality = item.quality + number
        }
    }

    decreaseSellIn(item: Item) {
        if (!item.isSulfuras()) {
            item.sellIn = item.sellIn - 1
        }
    }

    hasSellInDatePassed(item) {
        return item.sellIn < 0
    }
}
