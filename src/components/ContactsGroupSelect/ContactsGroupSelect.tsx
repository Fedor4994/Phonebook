import s from './ContactsGroupSelect.module.css';

interface ContactsGroupSelectProps {
  onGroupChange: (x: boolean) => void;
  isFavoriteContacts: boolean;
}

const ContactsGroupSelect = ({
  onGroupChange,
  isFavoriteContacts,
}: ContactsGroupSelectProps) => {
  return (
    <div className={s.select}>
      <button
        className={isFavoriteContacts ? s.selectButton : s.activeSelectButton}
        onClick={() => onGroupChange(false)}
      >
        All contacts
      </button>
      <button
        className={isFavoriteContacts ? s.activeSelectButton : s.selectButton}
        onClick={() => onGroupChange(true)}
      >
        Favorite contacts
      </button>
    </div>
  );
};

export default ContactsGroupSelect;
