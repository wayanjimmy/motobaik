import React from 'react'
import SelectInput from './SelectInput'

function leadZero(value) {
  if (value >= 10) {
    return value
  }

  return `0${value}`
}

function options() {
  let options = []
  for (let i = 0; i <= 23; i++) {
    options.push({
      text: `${leadZero(i)}:00`,
      value: `${leadZero(i)}:00`,
    })
  }
  return options
}

const TimePickerInput = props => {
  return <SelectInput {...props} options={options()} />
}

export default TimePickerInput
