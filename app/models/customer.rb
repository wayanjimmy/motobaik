class Customer < ApplicationRecord
  acts_as_paranoid

  has_many :rents, dependent: :nullify
  has_many :vehicles, :through => :rents

  scope :latest, -> { order('created_at desc') }
  validates :name, :phone, :address, presence: true
end
