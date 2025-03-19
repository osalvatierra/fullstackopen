export type formProps = {
  addPhoneDetails: (event: React.FormEvent<HTMLFormElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newName: string;
  newNumber: number;
};
