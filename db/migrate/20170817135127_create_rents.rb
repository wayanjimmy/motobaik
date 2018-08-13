class CreateRents < ActiveRecord::Migration[5.1]
  def up
    create_table :rents do |t|
      t.integer 'customer_id'
      t.integer 'vehicle_id'
      t.datetime 'started_at'
      t.datetime 'finished_at'
      t.decimal 'price', :precision => 8, :scale => 2
      t.timestamps

      t.index [:customer_id, :vehicle_id]
    end
  end

  def down
    drop_table :rents
  end
end
