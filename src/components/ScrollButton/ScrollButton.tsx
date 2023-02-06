import { useState, useEffect } from 'react';
import { BsArrowUpCircleFill } from 'react-icons/bs';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return function () {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 600 ? setVisible(true) : setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return visible ? (
    <button
      style={{
        position: 'fixed',
        left: '10px',
        bottom: '15px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={scrollToTop}
    >
      <BsArrowUpCircleFill size={40} color="#fff" />
    </button>
  ) : (
    <></>
  );
};

export default ScrollButton;
