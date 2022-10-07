import { useState } from 'react'
import '../styles/LoadingScreen.css'
function LoadingScreen() {

  return (
    <div className="overlay">
      <div className="lds-circle"><div></div></div>
    </div>
  )
}

export default LoadingScreen
