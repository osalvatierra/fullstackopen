const Notifications = ({ message }: string) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notifications;
