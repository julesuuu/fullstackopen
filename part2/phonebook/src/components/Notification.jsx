const Notification = ({ info }) => {
  const {message, type} = info
  if (message === null) {
    return null
  }
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}
export default Notification