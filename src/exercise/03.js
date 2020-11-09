// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

const useToggle = () => {
  const context = React.useContext(ToggleContext)

  if (typeof context === 'undefined') {
    throw new Error("Component used outside of Toggle")
  }

  return context;
}

function Toggle({onToggle, children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{ on, toggle }} children={children} />
}

function ToggleOn({children}) {
  const { on } = useToggle();

  return on ? children : null
}

function ToggleOff({children}) {
  const { on } = useToggle();

  return on ? null : children
}

function ToggleButton({props}) {
  const { on, toggle } = useToggle();

  return <Switch {...props} on={on} onClick={toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
