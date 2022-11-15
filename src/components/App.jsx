import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formValue = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    setContacts(prev => [...prev, newContact]);
    actions.resetForm();
  };

  const handleChange = e => {
    e.preventDefault();
    setFilter(e.target.value.toLowerCase());
  };

  const renderList = () => {
    return filter
      ? contacts.filter(contact => contact.name.toLowerCase().includes(filter))
      : contacts;
  };

  const deleteContact = e => {
    setContacts(prev => prev.filter(contact => contact.id !== e.target.id));
  };

  return (
    <>
      <ContactForm formValue={formValue} />
      <Section title="Contacts:">
        <ContactList renderList={renderList()} deleteContact={deleteContact} />
      </Section>
      <Filter handleChange={handleChange} />
    </>
  );
};
