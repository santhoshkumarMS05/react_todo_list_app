import React from 'react';
import LineItem from './LineItem';

const ItemList = ({items,handlecheck,handledelete}) => {
   
    return (
        <ul>
             {items.map(item=>(
                  <LineItem 
                  item={item}
                  key={item.id}
                  handlecheck={handlecheck}
                  handledelete={handledelete} />
                  ))
                  }
            </ul>
            ) 
  
}

export default ItemList;