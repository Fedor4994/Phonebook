import React from 'react';

import { ThreeDots } from 'react-loader-spinner';

import ContactForm from 'components/ContactForm/ContactForm';
import Section from 'components/Section/Section';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/FIlter/Filter';

import { useGetContactsQuery } from 'redux/contactsApi';

const ContactsPage = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm contacts={data} />
      </Section>

      <Section title={'Contacts'}>
        <Filter />
        {isLoading && !error ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#aaa"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <Contacts contacts={data} />
        )}
      </Section>
    </>
  );
};

export default ContactsPage;
