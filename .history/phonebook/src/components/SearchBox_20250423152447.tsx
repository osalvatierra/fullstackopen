import SearchBoxProps from "../types/searchboxprops";

const SearchBox = ({ placeholder, onChangeHandler }: SearchBoxProps) => (
  <input placeholder={placeholder} onChange={onChangeHandler} />
);

export default SearchBox;
