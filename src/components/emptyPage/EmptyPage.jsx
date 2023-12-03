import React from 'react'

function EmptyPage({text}) {
  return (
    <div className='emptypage'>
        <div className="emptypage__container">
            <p className="emptypage__text">
                {text}
            </p>
        </div>
    </div>
  )
}

export default EmptyPage