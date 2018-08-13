class AddDeletedAtToCustomers < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :deleted_at, :datetime
    add_index :customers, :deleted_at
  end
end
