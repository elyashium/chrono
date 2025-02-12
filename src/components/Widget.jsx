import React from 'react'
import { useState } from 'react'
export default function Widget() {

    const [timeLeft, setTimeLeft] = useState(0);
    // will add logic here 
    return (

        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg shadow-lg">
            ⏳ {timeRemaining}m remaining
        </div>

    )
}
