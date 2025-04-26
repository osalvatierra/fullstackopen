type notificationProps = {
  message: string;
};

const Notifications = ({ message }: notificationProps) => {
  if (message === null) {
    return null;
  }

  return <div className="note">{message}</div>;
};

export default Notifications;
