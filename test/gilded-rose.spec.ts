import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose: ", function () {
  it("quality decreases by 1 for regular items", function () {
    const items = [new Item("+5 Dexterity Vest", 10, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(19);
  });

  it("quality decreases twice as fast after the sell by date has passed", function () {
    const items = [new Item("+5 Dexterity Vest", 0, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(18);
  });

  it("quality is never negative", function () {
    const items = [new Item("+5 Dexterity Vest", 10, 0)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(0);
  });

  it("quality is never >50", function () {
    const items = [new Item("Aged Brie", 2, 50)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(50);
  });
});

describe("Aged Brie:", function () {
  it("increases in quality the older it gets", function () {
    const items = [new Item("Aged Brie", 2, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(21);
  });
  it("increases in quality by 2 after sell by date", function () {
    const items = [new Item("Aged Brie", 0, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(22);
  });
});

describe("Sulfuras:", function () {
  it("never has to be sold or decreases in quality", function () {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(80);
    expect(updatedItems[0].sellIn).to.equal(0);
  });
});

describe("Backstage Passes:", function () {
  it("quality increases by 1 when > 10 days", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(21);
  });

  it("quality increases by 2 when 5 < days <= 10", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(22);
  });

  it("quality increases by 3 when 0 <= days <= 5", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ];

    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(23);
  });

  it("quality = 0 after the concert", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(0);
    expect(updatedItems[0].sellIn).to.equal(-1);
  });
});

describe("Conjured Items: decrease in quality twice as fast as normal items", function () {
  it("before Sell In date decrease by 2", function () {
    const items = [new Item("Conjured Potato", 2, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(18);
    expect(updatedItems[0].sellIn).to.equal(1);
  });
  it("after Sell In Date decrease by 4", function () {
    const items = [new Item("Conjured Potato", 0, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).to.equal(16);
    expect(updatedItems[0].sellIn).to.equal(-1);
  });
});
