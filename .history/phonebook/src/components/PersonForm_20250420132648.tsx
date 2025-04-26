import { formProps } from "../types/formprops";

const PersonForm = ({
  newName,
  newNumber,
  handleName,
  handleNumbe,
  addPhoneDetails,
}: formProps) => (
  <form onSubmit={addPhoneDetails}>
    <div>
      name:
      <input
        placeholder={"Full Name"}
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      Phone: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
