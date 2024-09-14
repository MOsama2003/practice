import { ChevronDown, Trash2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const SearchDropdown = ({ dropdownMenu, placeholder, link = "https://www.google.com" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // New state for selected option
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : placeholder} <ChevronDown />
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {dropdownMenu.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => {
                setSelectedOption(item); 
                setIsOpen(false);
              }}
            >
              <span>{item.label}</span>
              <button className="trash-button">
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <div className="dropdown-link">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="dropdown-link"
              onClick={() => setIsOpen(false)}
            >
              View All
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
