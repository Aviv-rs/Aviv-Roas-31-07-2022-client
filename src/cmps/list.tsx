import { Item } from 'models/item.model'
import ListItem from './list-item'

function List({ items }: { items: Item[] }) {
  return (
    <section>
      {items.map((item: Item) => (
        <ListItem item={item} />
      ))}
    </section>
  )
}

export default List
