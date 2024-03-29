
import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import './dash.css';
import ContactCard from '../../components/ContactCard/ContactCard';
import { userContext } from '../../context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // Set the number of items to display per page
  const [itemsPerPage] = useState(3); 
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();

  // Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!currentUser?.token) {
      navigate('/directory/login');
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8800/contacts/', {
          headers: {
            Authorization: `BEARER ${currentUser.token}`
          }
        });
        setContacts(response.data.data);
        // Set filteredContacts initially with all contacts
        setFilteredContacts(response.data.data); 
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/contacts/${id}`);
      // Remove the deleted contact from the state
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
      setFilteredContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.log(error);
      // Handle error here, show a notification, etc.
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = contacts.filter((contact) =>
      `${contact.firstname} ${contact.middlename} ${contact.surname}`.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredContacts(filtered);
    // Reset to the first page when performing a new search
    setCurrentPage(1); 
  };

  // Calculate the index of the last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display on the page
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <nav>
        {/* After: Passed Accessibility check */}
        <Link to="/directory/create">
          <button className='dash_btn' title='Add Contact'>
            <UserPlusIcon className='addIcon' />
          </button>
        </Link>
        {currentUser?.token && <Link to="/directory/logout"><button>Logout</button></Link>}
      </nav>
      <main>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search contacts'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {currentItems.length > 0 ? (
          <div>
            {currentItems.map(({ _id, ...rest }) => (
              <ContactCard key={_id} id={_id} {...rest} handleDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <h1 className='no_contact'>No contact found 😳</h1>
        )}
        {/* Pagination buttons */}
        <div className='pagination'>
          {Array.from({ length: Math.ceil(filteredContacts.length / itemsPerPage) }).map((_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}  className={currentPage === index + 1 ? 'activePage' : null}>
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
