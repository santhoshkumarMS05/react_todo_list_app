import React from 'react';
import ItemList from './ItemList';
const Content = ({items,handlecheck,handledelete}) => {
      
      return (
      <> 
            {(items.length) ? (
               <ItemList 
               items={items}
               key={items.id}
               handlecheck={handlecheck}
               handledelete={handledelete} />
            ): 
            (
                  <p className='para'>No List items are Here </p>
            )}
      </>   
);
}
export default Content;