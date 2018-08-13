import React from 'react'
import TextInput from './TextInput'
import DateInput from './DateInput'
import SelectInput from './SelectInput'

const VehicleForm = ({
  vehicle,
  onChange,
  onSave,
  loading,
  allMachineCapacities,
}) => {
  const thereIsEmptyField =
    vehicle.police_number === '' ||
    vehicle.brand === '' ||
    vehicle.bpkb_number === ''
  return (
    <form>
      <TextInput
        name="police_number"
        label="Police Number"
        value={vehicle.police_number}
        onChange={onChange}
      />
      <TextInput
        name="brand"
        label="Brand"
        value={vehicle.brand}
        onChange={onChange}
      />
      <TextInput
        name="bpkb_number"
        label="BPKB Number"
        value={vehicle.bpkb_number}
        onChange={onChange}
      />
      <TextInput
        name="machine_number"
        label="Machine Number"
        value={vehicle.machine_number}
        onChange={onChange}
      />
      <TextInput
        name="frame_number"
        label="Frame Number"
        value={vehicle.frame_number}
        onChange={onChange}
      />
      <SelectInput
        name="machine_capacity"
        label="Machine Capacity"
        value={vehicle.machine_capacity}
        onChange={onChange}
        defaultOption="- Select Machine Capacity -"
        options={allMachineCapacities}
      />
      <DateInput
        name="bought_at"
        label="Bought date"
        value={vehicle.bought_at}
        onChange={onChange}
      />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={onSave}
        disabled={loading || thereIsEmptyField}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

export default VehicleForm
