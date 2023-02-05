import s from './ContactsGroupSelect.module.css';

interface ContactsGroupSelectProps {
  onGroupChange: (x: boolean) => void;
}

const ContactsGroupSelect = ({ onGroupChange }: ContactsGroupSelectProps) => {
  return (
    <div className={s.select}>
      <button className={s.selectButton} onClick={() => onGroupChange(false)}>
        All contacts
      </button>
      <button className={s.selectButton} onClick={() => onGroupChange(true)}>
        Favorite contacts
      </button>
    </div>
  );
};

export default ContactsGroupSelect;
