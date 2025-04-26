type notificationProps = {
  message: string;
};

const Notifications = ({ message }: notificationProps) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notifications;
