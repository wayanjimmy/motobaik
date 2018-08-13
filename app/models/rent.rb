class Rent < ApplicationRecord
  belongs_to :customer
  belongs_to :vehicle

  scope :latest, -> { order('created_at desc') }
  scope :by_year, -> (year) { where('extract(year from started_at) = ?', year) }
  scope :by_month, -> (month) { where('extract(month from started_at) = ?', month) }
  scope :by_customer, -> (customer) { where('customer_id = ?', customer) }
end
