type notificationProps = {
  message: string;
  type: string;
};

const Notifications = ({ message, type }: notificationProps) => {
  if (!message || message.trim() === "") {
    return null;
  }

  return <div className={`${type} note`}>{message}</div>;
};

export default Notifications;
