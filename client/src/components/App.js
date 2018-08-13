import React from 'react'
import Main from './Main'
import Header from './Header'
import Sidebar from './Sidebar'

const App = () => (
  <div>
    <Header title="Motobaik" />
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Main />
      </div>
    </div>
  </div>
)

export default App
