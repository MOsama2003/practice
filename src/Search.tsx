import { Info, Search, ChevronUp, ChevronDown, Divide } from "lucide-react";
import {
  dropdownCategory,
  dropdownOptions,
  dropdownResponseSubmission,
  dropdownSerch,
  dropdownState,
  options,
} from "./data";
import { useState, FormEvent } from "react";
import SearchDropdown from "./DropDown";
import StateDropdown from "./State-dropdown";
import { DatePickerWithRange } from "./RangeDateCalendar";

interface DropdownItem {
  value: string;
  label: string;
}

const SearchSection: React.FC = () => {
  const [advanceSearch, setAdvanceSearch] = useState<boolean>(true);

  const handleBtnChange = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAdvanceSearch((prev) => !prev);
  };

  return (
    <form action="" className="search">
      <div className="search-filter-first-row">
        <div className="search-field">
          <Search />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <SearchDropdown
          dropdownMenu={dropdownSerch}
          placeholder={"Saved Search"}
        />
      </div>
      <div className="search-filter-second-row">
        <div className="radio-group">
          {options.map((item: DropdownItem, index: number) => (
            <div key={index} className="radio-item">
              <input
                type="radio"
                name="fav_language"
                value={item.value}
                id={`radio-${index}`}
              />
              <label htmlFor={`radio-${index}`}>
                <div className="radio-label">
                  <span>{item.label}</span>
                  <Info fill="#777777" className="info-icon" />
                </div>
              </label>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Exclude Keywords"
          className="exclude-keyword-input"
        />
      </div>
      <div className="search-filter-third-row">
        <button className="advance-search-btn" onClick={handleBtnChange}>
          Advance Search {!advanceSearch ? <ChevronUp /> : <ChevronDown />}
        </button>
        {advanceSearch && (
          <div className="grid-container">
            <select name="cars" className="advance-search-dropdown grid-item">
              {dropdownCategory.map((item: DropdownItem, index: number) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
            <StateDropdown
              dropdownMenu={dropdownState}
              placeholder={"Select State"}
            />
            <select name="cars" className="advance-search-dropdown grid-item">
              {dropdownOptions.map((item: DropdownItem, index: number) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
            <select name="cars" className="advance-search-dropdown grid-item">
              {dropdownResponseSubmission.map((item: DropdownItem, index: number) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
            
      <DatePickerWithRange/>
          </div>
        )}
      </div>
      <div className="search-filter-forth-row">
        <button className="advance-search-btn">Clear Filter</button>
        <div className="search-btn-parent">
          <button className="save-search-btn">Save Search</button>
          <button className="search-btn">Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchSection;
