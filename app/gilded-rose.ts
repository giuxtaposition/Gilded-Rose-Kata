import { Item } from './Item'
export default class GildedRose {
    items: Item[]

    constructor(items: Item[]) {
        this.items = items
    }

    updateQuality() {
        this.items.forEach(item => {
            item.update()
        })

        return this.items
    }
}
