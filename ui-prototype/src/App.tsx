import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <button>HEE + {count}</button> */}

      <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 bg-amber-400">
        {/* <div
					className="button-square"
				>
					<span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
						Active
					</span>

				</div> */}
        
        {/* <div>
          <Button>test</Button>
        </div> */}

        <button
          className="button-square"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Count is {count}
        </button>

        <div className={`button-circle mid`}>
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
            Love Me
          </span>
        </div>
        <div className="button-circle circle">
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
            ?
          </span>
        </div>
      </div>
    </>
  )
}

export default App
