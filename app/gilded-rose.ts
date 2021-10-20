export abstract class Item {
    protected _name: string
    protected _sellIn: number
    protected _quality: number

    constructor(name, sellIn, quality) {
        this._name = name
        this._sellIn = sellIn
        this._quality = quality
    }

    abstract update()

    static basicItem(name, sellIn, quality) {
        return new BasicItem(name, sellIn, quality)
    }

    static agedBrie(name, sellIn, quality) {
        return new AgedBrie(name, sellIn, quality)
    }

    static backstagePasses(name, sellIn, quality) {
        return new BackstagePasses(name, sellIn, quality)
    }

    static sulfuras(name, sellIn, quality) {
        return new Sulfuras(name, sellIn, quality)
    }

    static conjured(name, sellIn, quality) {
        return new Conjured(name, sellIn, quality)
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

    get name() {
        return this._name
    }

    get sellIn() {
        return this._sellIn
    }

    get quality() {
        return this._quality
    }
}

export class BasicItem extends Item {
    public update() {
        this.decreaseQualityBy(1)

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.decreaseQualityBy(1)
        }
    }
}

export class AgedBrie extends Item {
    public update() {
        this.increaseQualityBy(1)

        this.decreaseSellIn()

        if (this.hasSellInDatePassed()) {
            this.increaseQualityBy(1)
        }
    }
}

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

export class Sulfuras extends Item {
    public update() {}
}

export class Conjured extends Item {
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
        this.items = items
    }

    updateQuality() {
        this.items.forEach(item => {
            item.update()
        })

        return this.items
    }
}
