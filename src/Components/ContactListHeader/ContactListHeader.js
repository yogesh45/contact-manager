import React, {  useState, useContext } from 'react';
import AddContactModal from '../AddContactModal/AddContactModal';
import contactListImg from './Resources/contacts_svg.svg'
import './Resources/styles.scss';
import {  contactContext } from "../../App";

const ContactListHeader = () => {
    const [contactState, setContactState] = useContext(contactContext)
    const userobj = {
        'name' : '',
        'phone' : '',
        'email' : '',
        'company' : '',
        'address' : ''
    }
    
    const [showForm, setShowForm] = useState(false);

    /**@function showAddContactForm - to show the modal */
    const showAddContactForm = () => {
        setShowForm(true);
    }

    /**@function modalClose - to hide the modal on close */
    const modalClose = () => {
        setShowForm(false);
    }

    /**@function onSaveContact - to save the contact */
    const onSaveContact = (contactObj) => {
        let tempUsers = [...contactState.users]
        tempUsers.push(contactObj);
        setContactState({...contactState, users:tempUsers});
        setShowForm(false);
    }

    /**@function onContactSearch - to search throught the contact list */
    const onContactSearch = (e) => {
        setContactState({
            ...contactState,
            searchText : e.target.value
        })
    }
    return(
        <div className='contact-list-header-container' id='contact-list-header-container'>
            {
                showForm ? <AddContactModal userDetails={userobj} showModal={showForm} onClose={modalClose} onSave={onSaveContact} title={'Add Contact'} /> : ''
            }
            <div className='header-title-sec'>
                <img src={contactListImg} alt='Contact List' className='contact-list-image' />
                <div className='header-title'>
                    <h3 className='title'>
                        Contacts
                    </h3>  
                    <span>Welcome to Contact page</span>  
                </div>
                <div className='sort-by-sec'>
                    <span>Sort by: </span>
                    Date created
                </div>
            </div>
            <div className='header-add-search'>
                <div className='header-search'>
                    <input type='text' className='search-input' placeholder='Search contacts' onChange={(e) => onContactSearch(e)}/>
                </div>
                <div className='add-contact'>
                    <button className='add-btn' onClick={showAddContactForm}>+ Add Contact</button>
                </div>
            </div>
        </div>
    )
}

export default ContactListHeader;