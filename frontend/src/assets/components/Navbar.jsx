import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = [
  { to: '/', label: 'รายการรถ', icon: 'fa-solid fa-car' },
  { to: '/add', label: 'เพิ่มรถ', icon: 'fa-solid fa-circle-plus' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const listRef = useRef(null);
  const [bubble, setBubble] = useState({ left: 0, width: 0, opacity: 0 });

  const moveBubbleTo = (target) => {
    const listNode = listRef.current;
    if (!listNode || !target) return;
    const itemRect = target.getBoundingClientRect();
    const listRect = listNode.getBoundingClientRect();
    setBubble({
      left: itemRect.left - listRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  };

  const handleLeave = () => setBubble((prev) => ({ ...prev, opacity: 0 }));

  return (
    <header className="glass-navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span>Haupcar</span>
        </div>

        <nav className="nav-list" ref={listRef} onMouseLeave={handleLeave}>
          <span
            className="nav-bubble"
            style={{
              left: bubble.left,
              width: bubble.width,
              opacity: bubble.opacity,
            }}
            aria-hidden="true"
          />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item${location.pathname === item.to ? ' active' : ''}`}
              onMouseEnter={(e) => moveBubbleTo(e.currentTarget)}
            >
              <i className={item.icon} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
        >
          <i
            className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}