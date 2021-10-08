export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.isSpecialItem(this.items[i])) {
        this.decreaseQuality(this.items[i], 1);
      } else {
        this.increaseQuality(this.items[i], 1);

        if (this.isBackstagePasses(this.items[i])) {
          this.updateBackstagePassesQuality(this.items[i]);
        }
      }

      this.decreaseSellIn(this.items[i]);

      if (this.hasSellInDatePassed(this.items[i])) {
        this.updateQualityWhenSellInHasPassed(this.items[i]);
      }
    }

    return this.items;
  }

  updateQualityWhenSellInHasPassed(item) {
    if (this.isAgedBrie(item)) {
      this.increaseQuality(item, 1);
    }

    if (this.isBackstagePasses(item)) {
      this.decreaseQuality(item, item.quality);
    }

    if (!this.isSpecialItem(item)) {
      this.decreaseQuality(item, 1);
    }
  }

  updateBackstagePassesQuality(item) {
    if (item.sellIn < 11 && item.quality < 50) {
      this.increaseQuality(item, 1);
    }
    if (item.sellIn < 6 && item.quality < 50) {
      this.increaseQuality(item, 1);
    }
  }

  decreaseQuality(item, number) {
    if (item.quality > 0) {
      item.quality = item.quality - number;
    }
  }

  increaseQuality(item, number) {
    if (item.quality < 50) {
      item.quality = item.quality + number;
    }
  }

  decreaseSellIn(item) {
    if (!this.isSulfuras(item)) {
      item.sellIn = item.sellIn - 1;
    }
  }

  isSpecialItem(item) {
    return (
      this.isAgedBrie(item) ||
      this.isBackstagePasses(item) ||
      this.isSulfuras(item)
    );
  }

  isAgedBrie(item) {
    return item.name === "Aged Brie";
  }

  isBackstagePasses(item) {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }

  isSulfuras(item) {
    return item.name === "Sulfuras, Hand of Ragnaros";
  }

  hasSellInDatePassed(item) {
    return item.sellIn < 0;
  }
}
