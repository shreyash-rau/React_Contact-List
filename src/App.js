// import logo from './logo.svg';
import { useRef, useState } from 'react';
import './App.css';
import Data  from './Data.json';
import { toast } from 'react-toastify';

function App() {

  const [data, setData] = useState(Data);
  const [edit, setEdit] = useState(false)

  return (
    <div className="card bg-dark">
      <div className='card-header'>
        <h2 className='text-white'>User Contact List</h2>
      </div><br/>
      <AddContact setData={setData}/>
      <form onSubmit={handleUpdate}>
      <div className='card-body'>
        <table className='table table-bordered '>
        <thead>
            <tr>
              {/* <td className="bg-dark text-white">ID</td> */}
              <td className="bg-dark text-white">Name</td>
              <td className="bg-dark text-white">E-Mail</td>
              <td className="bg-dark text-white">Phone</td>
              <td className="bg-dark text-white">Website</td>
              <td className="bg-dark text-white">Action Btn</td>
            </tr>
          </thead>

          <tbody>
            {
               data.map((current,i)=>(
                edit === current.id ? <EditContact current={current} data={data} setData={setData}/> :
                <tr key={i}>
                  {/* <td className="bg-dark text-white">{current.id}</td> */}
                  <td className="bg-dark text-white">{current.name}</td>
                  <td className="bg-dark text-white">{current.email}</td>
                  <td className="bg-dark text-white">{current.phone}</td>
                  <td className="bg-dark text-white">{current.website}</td>
                  <td className="bg-dark text-white">
                    <button type="button" className='btn btn-primary' onClick={()=>handleEdit(current.id)}>Edit</button>
                    &nbsp; &nbsp;    <button type="button" className='btn btn-danger' onClick={()=>handleDelete(current.id)}>Delete</button>
                  </td>
                </tr>
               ))
            }
          </tbody>
        </table>
      </div>
      </form>
    </div>
  );

  function handleUpdate(e){
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const phone = e.target.elements.phone.value;
    const website = e.target.elements.website.value;
    const Update = data.map(d=>d.id === edit ? {...d, name:name, email:email, phone:phone,website:website} : d)
    setData(Update)
      setEdit(false)
  }

  function handleEdit(id){
    setEdit(id);
  }

  function handleDelete(id){
    const Update=data.filter((d)=> id!==d.id)
    setData(Update)
  }    

}
// to edit the contact,,,,,,,,,
function EditContact({current, data, setData}){
  function handleName(e){
    const name = e.target.value;
    const updateData = data.map((d)=> d.id === current.id ? {...d,name:name} : d)
    setData(updateData) }

  function handleEmail(e){
    const email = e.target.value;
    const updateData = data.map((d)=> d.id === current.id ? {...d,email:email} : d)
    setData(updateData) }

    function handlePhone(e){
      const phone = e.target.value;
      const updateData = data.map((d)=> d.id === current.id ? {...d,phone:phone} : d)
      setData(updateData) }

    function handleWebsite(e){
      const website = e.target.value;
      const updateData = data.map((d)=> d.id === current.id ? {...d,website:website} : d)
      setData(updateData) }

  return(
    <tr>
      <td><input type="text" name="name" 
      value={current.name} onChange={handleName}
      placeholder='Enter Name' required/> </td> 
      <td><input type="email"  onChange={handleEmail}
      name="email" value={current.email} placeholder='Enter Email' required /></td>
      <td><input type="text"  onChange={handlePhone}
      name="phone" value={current.phone} placeholder='Enter Number' required /> </td>
      <td><input type="website"  onChange={handleWebsite}
      name="website" value={current.website} placeholder='Enter Website' required/> </td> 
      <td> <button type="submit" className='btn btn-secondary'>Update</button></td>
    </tr>
  )
}
// ,,,,,,,,,,,,,


// to adding new contact ......
function AddContact ({setData}){
  const nameRef= useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const websiteRef = useRef()
  function handleAdd(e){
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const phone = e.target.elements.phone.value;
    const website = e.target.elements.website.value;
    const newMember={
       name, email, phone, website 
    }
    setData(prevData => prevData.concat(newMember));
    nameRef.current.value=""
    emailRef.current.value=""
    phoneRef.current.value=""
    websiteRef.current.value=""
  }

  // ............


  return(
    <form className="form1" onSubmit={handleAdd}>
      <input type="text" name="name" placeholder='Enter Name' required ref={nameRef}/> &nbsp; 
      <input type="email" name="email" placeholder='Enter Email' required ref={emailRef}/> &nbsp; 
      <input type="text" name="phone" placeholder='Enter Number' required ref={phoneRef}/>  &nbsp; 
      <input type="website" name="website" placeholder='Enter Website' required ref={websiteRef}/>  &nbsp; 
      <button className='btn btn-primary'>ADD</button>
    
    </form>
  )
}

export default App;
