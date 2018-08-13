class CreateVehicles < ActiveRecord::Migration[5.1]
  def up
    create_table :vehicles do |t|
      t.string 'police_number', :null => false
      t.string 'brand' 
      t.string 'machine_number'
      t.string 'frame_number'
      t.string 'bpkb_number'
      t.integer 'machine_capacity'
      t.date 'bought_at'
      t.timestamps
    end
  end

  def down
    drop_table :vehicles
  end
end
