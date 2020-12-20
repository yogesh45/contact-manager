import { createContext, useState } from 'react';
import './App.css';
import ContactListHeader from './Components/ContactListHeader/ContactListHeader';
import ContactsList from './Components/ContactListTable/ContactListtable';
import Contactdescription from './Components/ContactsDescription/Contactdescription';
import SideBarComponent from './Components/SideBarComponent/SideBarComponent';
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";

export const contactContext = createContext( [ {}, () => {}] );

function App() {
  const [contactState, setContactState] = useState({
    users : [],
    selectedUser:null,
    searchText : ''
  })
  return (
    <div className="App">
      <HeaderComponent />
      <SideBarComponent />
      <contactContext.Provider value = {[contactState,setContactState]}>
        <div className='contact-list-app'>
          <ContactListHeader />
          <div className='contact-details'>
            <ContactsList />
            <Contactdescription />
          </div>
        </div>
      </contactContext.Provider>
    </div>
  );
}

export default App;
