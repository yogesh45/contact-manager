import React, { useState, useContext, useEffect } from 'react';
import './Assets/styles.scss';
import EditIcon from './Assets/edit_svg.svg';
import DeleteIcon from './Assets/delete.svg';
import { contactContext } from "../../App";
import Avathar from '../CommonComponents/Avathar';
import AddContactModal from '../AddContactModal/AddContactModal';

const ContactsList = () => {
    const [contactState, setContactState] = useContext(contactContext)
    const [showModal, setShowModal] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(null);

    useEffect(() => {
        setContactState(contactState);
    },[ contactState ])

    /**@function to save the contact */
    const onSaveContact = (contactObj) => {
        let tempUsers = [...contactState.users];
        let tempselectedUser = contactState.selectedUser;
        tempUsers[clickedIndex] = contactObj ;
        if(JSON.stringify(contactState.users[clickedIndex] === JSON.stringify(tempselectedUser))){
            setContactState({...contactState, users:tempUsers, selectedUser:tempselectedUser});
        }
        else{
            setContactState({...contactState, users:tempUsers});
        }
        setShowModal(false);
    }

    /**@function to hide the modal */
    const modalClose = () => {
        setShowModal(false)
    }

    /**@function to show the description of the user */
    const contactClick = (index) => {
        let clickedCont = contactState.users[index];
        setContactState({
            ...contactState,
            selectedUser:clickedCont
        })
    }

    /**@function to delete contact */
    const deleteContact = (index) => {
        let clickedCont = [...contactState.users];
        let tempselectedUser = contactState.selectedUser
        if(clickedCont[index]){
            clickedCont.splice(index, 1);
            if(JSON.stringify(contactState.users[index]) === JSON.stringify(tempselectedUser)){
                setContactState({
                    ...contactState,
                    users : clickedCont,
                    selectedUser: null
                })
            }
            else{
                setContactState({
                    ...contactState,
                    users : clickedCont
                })
            }
        }
        
    }
    return(
        <div className='contacts-list' id='contacts-list-comp'>
            {
                showModal ? <AddContactModal 
                    userDetails={contactState.users[clickedIndex] ? contactState.users[clickedIndex] : {}} 
                    showModal={showModal} 
                    onClose={modalClose} 
                    onSave={onSaveContact}
                    title={'Update Contact'}
                /> : ''
            }
            <div className='contacts-list-table'>
                {
                    contactState.users.length > 0 ? 
                    <table id="contacts">
                        <thead>
                            <tr>
                                <th id='add'>+</th>
                                <th id='basic_info'>Basic Info</th>
                                <th id='company'>Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contactState.users.map((contact, index) => {
                                    if(contact.name.toLowerCase().includes(contactState.searchText.toLowerCase())){
                                        return(
                                            <tr className={JSON.stringify(contact) === JSON.stringify(contactState.selectedUser) ? 'selected' : 'not-selected'} key={contact.name} onClick={() =>contactClick(index)}>
                                                <td id='add'>
                                                    <input type='checkbox' className='select-checkbox'/>
                                                </td>
                                                <td id='basic_info'>
                                                    <Avathar colorCode={contact.avatharColor}  name={contact.name} width={40} height={40}/>
                                                    <div className='details'>
                                                        <div className='name'>
                                                            {contact.name}
                                                        </div>
                                                        <span>
                                                            {contact.email}
                                                        </span>
                                                        <div className='icons'>
                                                            <img src={EditIcon} title='Edit' className='edit-contact' alt='Edit Icon' onClick={(e) => {
                                                                e.stopPropagation(); 
                                                                setShowModal(true); 
                                                                setClickedIndex(index)
                                                            }}/>
                                                            <img src={DeleteIcon} title='Delete' className='delete-contact' alt='Delete-icon' onClick={ (e) => {
                                                                e.stopPropagation();
                                                                deleteContact(index);
                                                            }} />                                               
                                                        </div>
                                                    </div>
                                                </td>
                                                <td id='company'>
                                                    {contact.company}
                                                </td>
                                            </tr>
                                        )
                                    }
                                    
                                }) 
                            }
                        </tbody>
                    </table> : 
                    <div className='no-contact-list'>
                        Click on the add button to add new contact
                    </div>
                }
                
            </div>
        </div>
    )
}

export default ContactsList