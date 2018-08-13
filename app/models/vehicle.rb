class Vehicle < ApplicationRecord
  has_many :rents
  has_many :customers, :through => :rents

  scope :latest, -> { order('created_at desc') }
  validates :police_number, :bpkb_number, :bought_at, presence: true
end
