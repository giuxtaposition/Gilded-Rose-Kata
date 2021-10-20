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
    protected MAX_QUALITY: number = 50
    protected MIN_QUALITY: number = 0
    protected MIN_SELL_IN: number = 0

    constructor(name: string, sellIn: number, quality: number) {
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
        if (this._quality > this.MIN_QUALITY) {
            this._quality -= number
        }
    }

    protected increaseQualityBy(number) {
        if (this._quality < this.MAX_QUALITY) {
            this._quality += number
        }
    }

    protected decreaseSellInBy(number) {
        this._sellIn -= number
    }

    protected hasSellInDatePassed() {
        return this._sellIn < this.MIN_SELL_IN
    }

    get sellIn() {
        return this._sellIn
    }

    get quality() {
        return this._quality
    }
}
