import React from 'react'
import ReactDOM from 'react-dom'
import App from './index'
console.log(process.env.REACT_APP_ENV )
ReactDOM.render(<App />, document.getElementById('root'))