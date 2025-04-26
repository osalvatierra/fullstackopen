type notificationProps = {
  message: string;
  type?: "note" | "error";
};

const Notifications = ({ message, type }: notificationProps) => {
  if (!message || message.trim() === "") {
    return null;
  }

  return <div className={`note ${type}`}>{message}</div>;
};

export default Notifications;
