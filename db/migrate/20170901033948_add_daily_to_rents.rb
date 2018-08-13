class AddDailyToRents < ActiveRecord::Migration[5.1]
  def up
    add_column :rents, :daily, :boolean, :default => false
  end

  def down
    remove_column('rents', 'daily')
  end
end
