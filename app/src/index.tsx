import * as ReactDOM from 'react-dom'
import App from './features'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root')

// @ts-expect-error `ReactDOM.createRoot` is not yet included on "@types/react".
const root = ReactDOM.createRoot(container)

root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
