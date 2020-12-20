import React, { useContext, useEffect } from 'react';
import './Assests/styles.scss';
import Avathar from '../../Components/CommonComponents/Avathar';
import { contactContext } from '../../App';

const Contactdescription = () => {
    const [contactState, setContactState] = useContext(contactContext)
    
    useEffect(() => {
        setContactState(contactState)
    }, [contactState])


    return(
        <div className='contact-description'>
            {
                contactState.selectedUser ? 
                <>
                    <div className='contact-head'>
                        <div className='avathar-content'>
                            <Avathar colorCode={contactState.selectedUser.avatharColor}  name={contactState.selectedUser.name} width={80} height={80}/>
                        </div>
                        <h3 className='contact-name'>
                            {contactState.selectedUser.name}
                        </h3>
                    </div>
                    <div className='contact-body'>
                        <div className='user-name borderd'>
                            <div className='title'>
                                Full Name : 
                            </div>
                            <div className='value'>{contactState.selectedUser.name}</div>
                        </div>
                        <div className='user-email borderd'>
                            <div className='title'>    
                                Email : 
                            </div>
                            <div className='value'>
                                {contactState.selectedUser.email}
                            </div>
                        </div>
                        <div className='user-phone borderd'>
                            <div className='title'>
                                Phone :
                            </div>
                            <div className='value'>  
                                {contactState.selectedUser.phone}
                            </div> 
                        </div>
                        <div className='user-company borderd'>
                            <div className='title'>
                                Company : 
                            </div>
                            <span className='value'>
                                {contactState.selectedUser.company}
                            </span>
                        </div>
                        <div className='user-address borderd'>
                            <div className='title'>
                                Address : 
                            </div>
                            <div className='value'>
                                { contactState.selectedUser.address }
                            </div>
                        </div>
                    </div>
                </> :
                <div className='no-user-selected'>Select any contact from the contact list to view</div>
        }
        </div>
    )
}

export default Contactdescription; 
