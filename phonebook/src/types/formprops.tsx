export type formProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newName: string;
  newNumber: string;
};
