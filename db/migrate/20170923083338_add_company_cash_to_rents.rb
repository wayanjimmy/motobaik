class AddCompanyCashToRents < ActiveRecord::Migration[5.1]
  def up
    add_column :rents, :company_cash, :decimal, precision: 8, scale: 2, default: 0
  end

  def down
    remove_column :rents, :company_cash, :decimal
  end
end
