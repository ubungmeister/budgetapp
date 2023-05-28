import React from 'react';
import {UserData} from '../../compnents/helpers/types';
import axios from 'axios';

type EditUserProps = {
    userForm: UserData;
    formOpen: boolean;
    setUserForm: (userForm: UserData) => void;
    setFormOpen: (formOpen: boolean) => void;
}

const EditUser = ({userForm,formOpen,setUserForm, setFormOpen}:EditUserProps, ) => {
    const formHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      try {
         const response = await axios.put(`http://localhost:1000/auth/edit-user/${userForm.id}`, {
            userForm
         });
      } catch (error) {
         console.log(error);
      }
      setFormOpen(false)
    }

    if(!formOpen){
        return null;
    }

    return (
        <div>
        <form onSubmit={(e)=>{formHandler(e)}}>
            <input type="text" placeholder={userForm.username} 
            onChange={(e)=>{setUserForm({...userForm, username:e.target.value})}}
            />
            <input type="text" placeholder={userForm.email} 
             onChange={(e)=>{setUserForm({...userForm, email:e.target.value})}}
             />
            {/* <input type="text" placeholder={userForm.role} 
             onChange={(e)=>{setUserForm({...userForm, role:e.target.value})}}
            /> */}
            <button type='submit'>Submit</button>
        </form>
          </div>
    );
};

export default EditUser;