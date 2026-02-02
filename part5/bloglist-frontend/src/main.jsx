import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { UserContextProvider } from './UserContext'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </Router>
)

export default store