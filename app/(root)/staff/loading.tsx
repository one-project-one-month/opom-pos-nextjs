import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'

import React from 'react'

const Loading = () => {
  return (
    <Waveform
        size="35"
        stroke="3.5"
        speed="1"
        color="orange" 
    />
  )
}

export default Loading;

