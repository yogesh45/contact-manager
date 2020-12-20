import React from 'react';
import './Assests/styles.scss';
import Search from './Assests/search.png';
import Email from './Assests/post.png';

const HeaderComponent = () => {
    return(
        <div className='header-component'>
            <div className='header-search'>
                <img src={Search} title='Search' alt='Search' />
            </div>
            <div className='header-options'>
                <div className='add'>
                    + Add
                </div>
                <div className='email-icon'>
                    <img src={Email} title='Email' className='email-img' alt='Email' />
                </div>
                <div className='user-name'>
                    <div>Mark Henry</div> 
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;