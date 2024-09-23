import Header from './Header';
import './index.css';
import Content from './Content';
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = "http://localhost:3502/items";
  const [items, setitem] = useState([]);
  const [newitems, setnewitems] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState('');
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data is not Received");
        const listitem = await response.json();
        setitem(listitem);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item)=>{
    const id=items.length ? items[items.length - 1].id + 1 :1
    const addNewitem= {id,checked:false,item}
    const listitem=[...items,addNewitem]
    setitem(listitem) 
    const postOptions = {
      method: 'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewitem)
    }
    const result=await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
  };

  const handlecheck = async (id) => {
    const listitem = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setitem(listitem);
  
    const myItem = listitem.find((item) => item.id === id); // Find the item to update
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' // Corrected Content-Type header
      },
      body: JSON.stringify({ checked: myItem.checked }) // Update the 'checked' status
    };
    const reqUrl = `${API_URL}/${id}`; // URL for the specific item
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result); // Handle any errors from the API
  };
  
  

  const handledelete = async (id) => {
    const listitem = items.filter((item) => item.id !== id); // Filter out the item to be deleted
    setitem(listitem);
  
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' // Correct Content-Type for DELETE (though some servers might not require it)
      }
    };
    const reqUrl = `${API_URL}/${id}`; // URL for the specific item
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result); // Handle any errors from the API
  };
  

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!newitems) return;
    addItem(newitems);
    setnewitems('');
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        newitems={newitems}
        setnewitems={setnewitems}
        handlesubmit={handlesubmit}
      />
      <SearchItem
        search={search}
        setsearch={setsearch}
      />
      <main>
        {isLoading && <p> Loading the Data...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handlecheck={handlecheck}
            handledelete={handledelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
