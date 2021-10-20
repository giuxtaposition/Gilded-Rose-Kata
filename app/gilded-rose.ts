export class Item {
    protected _name: string
    protected _sellIn: number
    protected _quality: number

    constructor(name, sellIn, quality) {
        this._name = name
        this._sellIn = sellIn
        this._quality = quality
    }

    public update() {
        this.updateQualityBeforeSellIn()

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.updateQualityAfterSellIn()
        }
    }

    protected decreaseQualityBy(number) {
        if (this._quality > 0) {
            this._quality = this._quality - number
        }
    }

    protected increaseQualityBy(number) {
        if (this._quality < 50) {
            this._quality = this._quality + number
        }
    }

    protected decreaseSellIn() {
        this._sellIn = this._sellIn - 1
    }

    protected hasSellInDatePassed() {
        return this._sellIn < 0
    }

    public updateQualityBeforeSellIn() {
        this.decreaseQualityBy(1)
    }

    private updateQualityAfterSellIn() {
        this.decreaseQualityBy(1)
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

export class AgedBrie extends Item {
    constructor(sellIn, quality) {
        super('Aged Brie', sellIn, quality)
    }

    public update() {
        this.increaseQualityBy(1)

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.increaseQualityBy(1)
        }
    }
}

export class BackstagePasses extends Item {
    constructor(sellIn, quality) {
        super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
    }

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

export class Sulfuras extends Item {
    constructor(sellIn, quality) {
        super('Sulfuras, Hand of Ragnaros', sellIn, quality)
    }

    public update() {}
}

export class Conjured extends Item {
    constructor(sellIn, quality) {
        super('Conjured Potato', sellIn, quality)
    }

    public update() {
        this.decreaseQualityBy(2)

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(2)
        }
    }
}

export class GildedRose {
    items: Array<Item>

    constructor(items = [] as Array<Item>) {
        this.items = items.map(item => {
            switch (item.name) {
                case 'Aged Brie':
                    return new AgedBrie(item.sellIn, item.quality)
                case 'Backstage passes to a TAFKAL80ETC concert':
                    return new BackstagePasses(item.sellIn, item.quality)
                case 'Sulfuras, Hand of Ragnaros':
                    return new Sulfuras(item.sellIn, item.quality)
                case 'Conjured Potato':
                    return new Conjured(item.sellIn, item.quality)
                default:
                    return item
            }
        })
    }

    updateQuality() {
        this.items.forEach(item => {
            item.update()
        })

        return this.items
    }
}
