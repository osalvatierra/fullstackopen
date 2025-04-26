type notificationProps = {
  message: string;
  type?: "note" | "error";
};

const Notifications = ({ message, type = "note" }: notificationProps) => {
  if (!message || message.trim() === "") {
    return null;
  }

  return (
    <div className={`note ${type === "error" ? "error" : ""}`}>{message}</div>
  );
};

export default Notifications;
