# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.where(:email => 'jimmyeatcrab@gmail.com').first_or_create(
  :name => 'Jimmy',
  :email => 'jimmyeatcrab@gmail.com',
  :password => 'secret',
  :password_confirmation => 'secret'
)

10.times do
  Customer.create(
    :name => FFaker::Name.name,
    :phone => FFaker::PhoneNumber.imei,
    :address => FFaker::Address.street_address
  )
end

10.times do
  Vehicle.create(
    :police_number => FFaker::PhoneNumber.imei,
    :bought_at => FFaker::Time.date,
    :brand => FFaker::Name.name,
    :machine_number => FFaker::PhoneNumber.imei,
    :frame_number => FFaker::PhoneNumber.imei,
    :bpkb_number => FFaker::PhoneNumber.imei,
    :machine_capacity=> rand(100..250)
  )
end

customers = Customer.all
customers.each do |customer|
  vehicle = Vehicle.all.shuffle.first
  rent = Rent.new(:vehicle => vehicle, :started_at => Time.now, :finished_at => Time.now + 5.days, :price => 250000)
  customer.rents << rent
end
