require 'csv'

namespace :vehicle do
  task export_to_csv: :environment do
    attributes = %w{police_number brand machine_number frame_number bpkb_number machine_capacity bought_at}
    CSV.open("temp_files/vehicles.csv", "w") do |csv|
      csv << attributes

      Vehicle.all.each do |vehicle|
        csv << attributes.map { |attr| vehicle.send(attr) }
      end
    end
  end

  task import_from_csv: :environment do
    csv_text = File.read("temp_files/vehicles.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      params = row.to_hash
      Vehicle.where(police_number: params['police_number']).first_or_create(params)
    end
  end
end
