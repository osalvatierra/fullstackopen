type notificationProps = {
  message: string;
  type?: "note" | "error";
};

const Notifications = ({ message, type = "note" }: notificationProps) => {
  if (!message || message.trim() === "") {
    return null;
  }

  return (
    <div className={`${type === "error" ? "error" : "note"}`}>{message}</div>
  );
};

export default Notifications;
