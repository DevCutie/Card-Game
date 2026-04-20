import React from 'react'

const WinMessage = ({moves}) => {
  return (
    <div className='win-message'> 
      <h2>Congratulation!</h2>
      <p>You completed the game in {moves} moves! </p>
    </div>
  )
}

export default WinMessage