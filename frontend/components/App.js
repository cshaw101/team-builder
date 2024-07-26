// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]


export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  const [inputValue, setInputValue] = useState({
  fname: '',
  lname: '',
  bio: ''
})
  // ✨ Create a third state to track the values of the inputs

  useEffect(() => {
    if (editing !== null) {
      const memberToEdit = members.find(member => member.id === editing);
      if (memberToEdit) {
        setInputValue({
          fname: memberToEdit.fname,
          lname: memberToEdit.lname,
          bio: memberToEdit.bio
        });
      }
    } else {
      setInputValue({
        fname: '',
        lname: '',
        bio: ''
      });
    }
  }, [editing, members]);

  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
    const { id, value } = evt.target
   setInputValue({
    ...inputValue,
    [id]: value,
   })
  console.log(inputValue)
  }
  const edit = id => {
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
    setEditing(id)
  }
  const submitNewMember = () => {
    const newMember = {
      id: getId(),
      fname: inputValue.fname,
      lname: inputValue.lname,
      bio: inputValue.bio
    };
    setMembers([...members, newMember]);
    setInputValue({
      fname: '',
      lname: '',
      bio: ''
    });
  };
  const editExistingMember = () => {
    setMembers(members.map(member =>
      member.id === editing ? { 
        ...member, 
        fname: inputValue.fname, 
        lname: inputValue.lname, 
        bio: inputValue.bio } 
        : member
    ));
    setEditing(null);
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (editing !== null) {
      editExistingMember();
    } else {
      submitNewMember();
    }
    setInputValue({
      fname: '',
      lname: '',
      bio: ''
    });
  };
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input onChange={onChange} id="fname" type="text" value={inputValue.fname} placeholder="Type First Name" />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input onChange={onChange} id="lname" type="text" value={inputValue.lname} placeholder="Type Last Name" />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea onChange={onChange} id="bio" value={inputValue.bio} placeholder="Type Bio" />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
