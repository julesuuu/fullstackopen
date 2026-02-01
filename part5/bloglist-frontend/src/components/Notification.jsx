import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification || !notification.message) {
    return null
  }

  const notificationStyle = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='blogNotif' style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification