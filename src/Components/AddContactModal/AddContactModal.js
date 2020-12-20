import React, { useContext, useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import { contactContext } from "../../App";
import 'antd/dist/antd.css';
const { TextArea } = Input;
//import './Resources/styles.scss';

const AddContactModal = (props) => {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const colorArray = ["#2F8DD8","#E6809C","#fca665","#38c4fa","#22d273","#7c7dfe","#59a7fe","#e83e8c","#9596fc","#4bdedb"];
    const phoneRegex = /^\d+$/;
    const [isModalVisible, setIsModalVisible] = useState(props.showForm);
    const [name, setName] = useState(props.userDetails.name ? props.userDetails.name : '');
    const [email, setEmail] = useState(props.userDetails.email ? props.userDetails.email : '');
    const [phone, setPhone] = useState(props.userDetails.phone ? props.userDetails.phone : '');
    const [company, setCompany] = useState(props.userDetails.company ? props.userDetails.company : '');
    const [address, setAddress] = useState(props.userDetails.address ? props.userDetails.address : '');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [contactState, setContactState] = useContext(contactContext);

    useEffect(() => {
        setIsModalVisible(true);
    }, [])

    const handleOk = (e) => {
        let emailerr = true;
        let phoneerr = true;
        let nameerr = true;
        //Check Name
        if(name.trim() === ''){
            setNameError('Please enter a name');
        }
        else{
            nameerr = false
            setNameError('')
        }

        //Check Phone number
        if(phone.trim() === ''){
            setPhoneError('Please enter phone number');
        }
        else if(phone.length !== 10){
            setPhoneError('Phone number should be 10 numbers')
        }
        else if(!phoneRegex.test(phone)){
            setPhoneError('Phone number is not valid')
        }
        else{
            if(!props.title.toLowerCase().includes('update')){
                let flag = checkMobileNumber();
                if(flag){  
                    phoneerr = false
                    setPhoneError('')
                }
            }
            else{
                phoneerr = false
                setPhoneError('')
            }
            
        }

        //Check Email
        if(email.trim() === ''){
            setEmailError('Please enter email')
        }
        else if(!(emailReg.test(email))){
            setEmailError('Invalid Email');
        }
        else{
            setEmailError('');
            emailerr = false
        }

        //Send Data to props
        if(!emailerr && !phoneerr && !nameerr ){
            let colorCode = colorArray[Math.floor(Math.random() * colorArray.length)]
            if(props.userDetails.avatharColor){
                colorCode = props.userDetails.avatharColor
            }
            let userObbj = {
                'phone':phone,
                'name' : name,
                'email' : email,
                'company' : company,
                'address' : address,
                'avatharColor':colorCode
            }
            props.onSave(userObbj);
            setIsModalVisible(false)
            props.onClose()
        }
    }

    //checkMobileNumber function to check whether the given number is already stored.
    const checkMobileNumber = () => {
        let users = [...contactState.users];
        const tempArray = users.filter((user) => {
            if(user.phone === phone){
                return user
            }
        })
        if(tempArray.length > 0){
            setPhoneError('Phone Number already saved')
            return false
        }
        else{
            return true
        }
    }
    //handleCancel to close the model
    const handleCancel = () => {
        setIsModalVisible(false)
        props.onClose();
    }

    //onNamechange to save the name
    const onNamechange = (e) =>  {
        setNameError('');
        setName(e.target.value)
    }

    //onEmailChange to save the email
    const onEmailChange = (e) => {
        setEmailError('');
        setEmail(e.target.value)
    }

    //onPhoneNumberChange to save the phone
    const onPhoneNumberChange = e => {
        setPhoneError('');
        setPhone(e.target.value)
    } 

    //onCompanyChange to save the email
    const onCompanyChange = e => setCompany(e.target.value);

    //onAddressChange to save the address
    const onAddressChange = e => setAddress(e.target.value)

    return(
        <Modal title={props.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={'Save'}>
            <div className='fields'>
                <div className='label'>Name <span className='required'>*</span></div>
                <Input placeholder='Name' value={name} required={true} onChange={onNamechange} />
                <div className='error'>{nameError}</div>
            </div>
            <div className='fields'>
            <div className='label'>Email <span className='required'>*</span></div>
                <Input placeholder='Email' value={email} required={true} onChange={onEmailChange}/>
                <div className='error'>{emailError}</div>
            </div>
            <div className='fields'>
            <div className='label'>Phone <span className='required'>*</span></div>
                <Input placeholder='Phone' value={phone} required={true} onChange={onPhoneNumberChange} />
                <div className='error'>{phoneError}</div>
            </div>
            <div className='fields'>
                <div className='label'>Company</div>
                <Input placeholder='Company' value={company} required={true} onChange={onCompanyChange}/>
            </div>
            <div className='fields'>
                <div className='label'>Address</div>
                <TextArea placeholder='Address' value={address} required={false} onChange={onAddressChange}/>
            </div>
        </Modal>
    )
}

export default AddContactModal;