import React from 'react'
import './index.css';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa'
const AddItem = ({newitems,setnewitems,handlesubmit}) => {
  const inputref={useRef}
  return (
    <form className='addform' onSubmit={handlesubmit}>
      <label htmlFor="addItem" class="label">Add Item</label>
      <input 
       autoFocus
       ref={inputref}
       id='addItem'
       type="text" 
       placeholder='Add Item'
       required
       value={newitems}
       onChange={(e)=> setnewitems(e.target.value)}/>
       <button
        type='submit'
        aria-label='Add Item'
        onClick={()=>inputref.current.focus()}>
        <FaPlus></FaPlus>
        </button>
    </form>
  )
}

export default AddItem