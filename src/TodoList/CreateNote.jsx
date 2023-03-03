import React from 'react'

export default function CreateNote(props) {
    
    //ON CHANGE FUNCTION
    const changeEvent = (e) => {
        props.passEvent(e)
    }
    //ONCLICK FUNCTION 
    const addevent = (e) => {
        e.preventDefault()
        props.passAdddata(props.passNotes)
    }

    return (
        <>
  
            <div className="ctreatebox" >
                <form onSubmit={addevent}>
                    <input type="text" placeholder='Titile...' className='title' onChange={changeEvent} name='title' value={props.passNotes.title} />
                    <textarea name="content" cols="" rows="" placeholder='Write note...' className='notes' onChange={changeEvent} value={props.passNotes.content} required />
                {/*  TURNARY OPERATOR FOR TOGGLE THE BUTTON ADD OR EDIT */}
                    {!props.togglebtn ? <button type='submit' title='Add note' className='btn' ><span className="material-symbols-outlined symbol">
                        edit_note
                    </span></button>
                        : <button type='submit' title='Add note' className='btn' ><span className="material-symbols-outlined symbol"  >
                            add
                        </span></button>
                    }
                </form>
                
            </div>
            { (props.addnotes.length>=1)?
            <div className="btn-div">
            <button className='delAll' title='Delete All' onClick={()=>{
                props.passdeleteAllNote()
            }}>delete all</button>
            </div> : null}
           
            
        </>
    )
}
