# Gilded Rose Kata
This is my solution to [Gilded Rose Kata](https://github.com/xpeppers/GildedRose-Refactoring-Kata).

Requirements:

```
- All items have a SellIn value which denotes the number of days we have to sell the item	
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item
- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches: 
    - Quality increases by 2 when there are 10 days or less
    - By 3 when there are 5 days or less
    - Quality drops to 0 after the concert
- "Conjured" items degrade in Quality twice as fast as normal items
```

**Language**: Typescript

**Testing Frameworks**:
- [Mocha](https://github.com/mochajs/mocha): Test runner
- [Chai](https://github.com/chaijs/chai): BDD / TDD assertion library
- [NYC](https://github.com/istanbuljs/nyc): Test Coverage Generator

## Installing and running tests
``` bash
git clone https://github.com/giuxtaposition/.git
cd GildedRose_tests
yarn install
yarn test
```
