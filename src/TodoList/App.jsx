import React, { useEffect, useState } from 'react';
import CreateNote from './CreateNote';
import Header from './Header';
import Notes from './Notes';
import { confirm } from "react-confirm-box";


// GET THE LOCALSTORAGE DATA💀
const getLocalList = () => {
  let list = localStorage.getItem('arrlist')
  if (list) {
    return JSON.parse(localStorage.getItem('arrlist'));
  } else {
    return [];
  }

}

//*******************************************************************
// --> MAIN COMPONENT FUNCTUTIN <-- //
export default function App() {

  // ----------------> DEFINED THE HOOKS <----------------
  var [notes, setnotes] = useState({
    title: '',
    content: ''
  })
  var [addnotes, setaddnotes] = useState(getLocalList())
  var [togglebtn, settogglebtn] = useState(true)
  var [editItemId, seteditItemId] = useState(null)
  // ---------------->END THE HOOKS <----------------

  // ----------------> CHANGE EVENT FUCTION <----------------
  const inputEvent = (e) => {
    var { value, name } = e.target
    setnotes((oldnote) => {
      return {
        ...oldnote,
        [name]: value
      }
    })
  }

  // ----------------> ADD & UPDATE EDIT ONCLICK FUNCTION <----------------
  const additem = (passNotes) => {
    if (!togglebtn) {     //IF CLICK ON THE EDIT BTN OR TOGGLENBTN = FALSE
      setaddnotes(addnotes.map((ele) => {
        if (ele.id === editItemId) {
          return { ...ele, name: notes }
        }
        return ele;
      }))
      settogglebtn(true)   // TOGGLE THE ADD BUTTON
      setnotes({         // INPUT FIELD BLANK
        title: '',
        content: ''
      })
    }
    else {    // IF ADD BUTTON IS CLICK OR TOGGLEBTN IS TRUE
      const notesEle = { id: new Date().getTime().toString(), name: passNotes }
      setaddnotes((oldnote) => {
        return [...oldnote, notesEle]
      })
      setnotes({
        title: '',    // INPUT FIELD BLANK
        content: ''
      })
    }
  }

  // ---------------->EDIT ONCLICK FUNCTION At EXISTING NOTE<----------------
  const editNote = (id) => {
    var elenote = addnotes.find((ele) => {  // FIND THE ID AND 
      return ele.id === id;                 // VALUE OF THE CLICKED ITEM BY EDIT-BTN
    })
    // console.log(elenote);    
    setnotes(elenote.name) // SET THE VALUE IN INPUT FIELD
    settogglebtn(false)   // TOGGLE THE ADD BUTTON TO EDIT BUTTON
    seteditItemId(id)   // STORE ID ID OF CLICKED ITEM
  }


  // ---------------->ONCLICK FUNCTION FOR DELETE A SLECTED ITEM  <----------------
  const deleteNote = (id) => {
    const updatedata = addnotes.filter((ele) => {
      return ele.id !== id;  // RETURN THE VALUE WHICH IS NOT CLICKED 
    })
    setaddnotes(updatedata)   // SET THE RETUNED VALUE IN THE ARRY

  }

  // const deleteAllNotes = () => {
  //    var result = confirm(
  //  "are you sure ? you want to delete all item"
  //   )
  //   setaddnotes([])   //delete all item from array
    

  // }
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }
  const deleteAllNote = async () => {
    const result = await confirm("Are you sure?" , options);
    if (result) {
      setaddnotes([])
      setnotes({         // INPUT FIELD BLANK
        title: '',
        content: ''
      })
      
    }
   
  };


  // ----------------> CREATE LOCAL STORAGE<----------------
  useEffect(() => { // TO PERFORM WHEN A NOTE ADD IN AARAY THAT IS 'addnotes'
 localStorage.setItem('arrlist', JSON.stringify(addnotes));
}, [addnotes])



  return (
    <>
    <div className="main">
      <div className="main-content " style={{marginBottom:"100px"}}>
      <Header />

      {/* INPUT  FIELD AND ADD BTN COMPONENT*/}
      <CreateNote
        passAdddata={additem}           // PASS ONCLICK FUNCTION FOR ADD THE NOTE
        togglebtn={togglebtn}          // PASS THE VALUE TRUE/FALSE FOR TOGGLE THE BTN
        passEvent={inputEvent}        // PASS ONCHANGE FUNCTION FOR FOR GET THE VALUE FROM INPUT FIELD
        passNotes={notes}            // PASS THE VALUE INPUT FIELD VALUE ATRIBUTE
        passdeleteAllNote = {deleteAllNote}
        addnotes={addnotes}
      />



      {     // EXECUTE A MAP FUN. TO GET THE DATE BY ONE FROM ARRAY(addnotes)
        addnotes?.map((val) => {


          return (<Notes       // CALL THE Notes COMPONENT AND PASS THE PROPS
            id={val.id}                         // PASS THE ID IF ITEM
            title={val.name.title}             // PASS THE TITLE OF NOTES
            content={val.name.content}        // PASS THE CONTENT OF NOTES
            key={val.id}                     // PASS THE UNIQUE KEY
            deleteitem={deleteNote}         // PASS A ONCLICK FUNCTION TO DELETE ITEM
            editItem={editNote}            //PASS A ONCLICK FUNCTION TO EDIT OR U[ADTE ITEM

          />
          );
        })}
        </div>
        

     <div className="footer-div" style={{marginTop:"100px"}}>
    
     </div>
     </div>
    </>

  )
}
