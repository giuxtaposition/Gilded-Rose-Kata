import {
    BasicItem,
    AgedBrie,
    BackstagePasses,
    Conjured,
    Sulfuras,
} from './index'

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
