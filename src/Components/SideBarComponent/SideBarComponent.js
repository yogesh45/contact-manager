import React from 'react';
import './Assets/styles.scss';
import contact from './Assets/contact.png';
import home from './Assets/home.png';
import person from './Assets/person.png';
import timer from './Assets/timer.png';
import menu from './Assets/menu.png';

const SideBarComponent = () => {
    const sideBarConfig = [
        {
            img : home,
            title : 'Home',
            link : ''
        },
        {
            img : person,
            title : 'Person',
            link : ''
        },
        {
            img : timer,
            title : 'Timer',
            link : ''
        },
        {
            img : contact,
            title : 'Contact',
            link : ''
        }
    ]
    return(
        <div className='sidebar' style={{height : `${window.innerHeight}px`, width:'40px'}}>
            <div className='side-menu'>
                <img className='img' title={'Menu'} src={menu} alt='Menu'/>
            </div>
            <div className='sidebar-options'>
                {
                    sideBarConfig.map(sidebar => {
                        return(
                            <div className='sidebar-image'>
                                <img className='image' title={sidebar.title} src={sidebar.img} alt={sidebar.title}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SideBarComponent