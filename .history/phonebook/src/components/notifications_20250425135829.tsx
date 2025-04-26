type notificationProps = {
  message: string;
};

const Notifications = ({ message }: notificationProps) => {
  if (message === null) {
    return null;
  } else {
    return <div className="note">{message}</div>;
  }
};

export default Notifications;
