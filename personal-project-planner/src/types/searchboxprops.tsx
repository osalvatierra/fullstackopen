export type SearchBoxProps = {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  onSearch: (searchTerm: string) => void
}
