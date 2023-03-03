import React from 'react'

export default function Notes(props) {
  const selectitem = () => {
    props.deleteitem(props.id)
  }

  const selectEdit = () => {
    props.editItem(props.id)
  }
  
  return (
    <>

      <div className="boxnotes">
        <h3>{props.title}</h3>

        <p>{props.content}</p>
        <button className='editbtn' title='Edit Note' onClick={selectEdit}><span className="material-symbols-outlined removesymbol">
          edit_note
        </span></button>
        <button className='remover' title='Delete Note' onClick={selectitem}><span className="material-symbols-outlined removesymbol">
          delete
        </span></button>
      </div>

    </>
  )
}
