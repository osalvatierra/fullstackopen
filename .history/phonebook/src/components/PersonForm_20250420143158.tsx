import { formProps } from "../types/formprops";

const PersonForm = ({
  newName,
  newNumber,
  handleName,
  handleNumber,
  handleSubmit,
}: formProps) => (
  <form onSubmit={handleSubmit}>
    <div>
      name:
      <input placeholder={"Full Name"} value={newName} onChange={handleName} />
    </div>
    <div>
      Phone: <input value={newNumber} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
