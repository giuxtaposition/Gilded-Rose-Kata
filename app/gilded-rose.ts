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
    this.items.forEach((item) => {
      this.updateQualityBeforeSellIn(item);

      this.decreaseSellIn(item);

      if (this.hasSellInDatePassed(item)) {
        this.updateQualityAfterSellIn(item);
      }
    });

    return this.items;
  }

  updateQualityAfterSellIn(item) {
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

  updateQualityBeforeSellIn(item) {
    if (!this.isSpecialItem(item)) {
      this.decreaseQuality(item, 1);
    } else {
      this.increaseQuality(item, 1);

      if (this.isBackstagePasses(item)) {
        this.updateBackstagePassesQuality(item);
      }
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
      item.quality = this.isConjured(item)
        ? item.quality - number - 1
        : item.quality - number;
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

  isConjured(item) {
    return item.name.includes("Conjured");
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
