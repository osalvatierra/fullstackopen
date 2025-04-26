import { SearchBoxProps } from "../types/searchboxprops";

const SearchBox = ({ placeholder, onChangeHandler }) => (
  <input placeholder={placeholder} onChange={onChangeHandler} />
);

export default SearchBox;
