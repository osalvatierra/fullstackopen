import { useState } from 'react'
import { SearchBoxProps } from '../types/searchboxprops'
import { Input } from './ui';


const SearchBox = ({ placeholder, onSearch }: SearchBoxProps) => {
  const [searchField, setSearchField] = useState('')
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
    onSearch(searchFieldString)
  }
  return (
    <Input
      placeholder={placeholder}
      value={searchField}
      onChange={onSearchChange}
    />
  )
}

export default SearchBox
