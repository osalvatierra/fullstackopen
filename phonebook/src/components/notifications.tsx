type notificationProps = {
  message: string | null
  type?: 'note' | 'error'
}

const Notifications = ({ message, type }: notificationProps) => {
  if (!message || message.trim() === '') {
    return null
  }

  return (
    <div className={`${type === 'error' ? 'note error' : 'note'}`}>
      {message}
    </div>
  )
}

export default Notifications
