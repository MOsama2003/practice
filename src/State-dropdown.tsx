import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const StateDropdown = ({
  dropdownMenu,
  placeholder,
  link = "https://www.google.com",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // Array for selected options
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

  const handleCheckboxChange = (item) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((i) => i !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  return (
    <div className="state-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOptions.length > 0
          ? `${selectedOptions.length} selected`
          : placeholder}{" "}
        <ChevronDown size={20} />
      </div>

      {isOpen && (
        <div className="state-dropdown-list">
          {dropdownMenu.map((item, index) => (
            <div
              key={index}
              className="state-dropdown-item"
            >
              <label className="state-dropdown-label" htmlFor={`checkbox-${item.value}`}>
                <input
                  type="checkbox"
                  id={`checkbox-${item.value}`}
                  checked={selectedOptions.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <span>{item.label}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateDropdown;
