class VehiclesController < ApiController
  before_action :set_vehicle, only: [:show, :update, :destroy]

  # GET /vehicles
  def index
    @vehicles = Vehicle.latest
    json_response(@vehicles)
  end

  # POST /vehicles
  def create
    @vehicle = Vehicle.create!(vehicle_params)
    json_response(@vehicle, :created)
  end

  # GET /vehicles/:id
  def show
    json_response(@vehicle)
  end

  # PUT /vehicles/:id
  def update
    @vehicle.update(vehicle_params)
    json_response(@vehicle)
  end

  # DELETE /vehicles/:id
  def destroy
    @vehicle.destroy
    json_response(@vehicle)
  end

  private

  def vehicle_params
    params.permit(:police_number, :brand, :machine_number, :frame_number, :bpkb_number, :machine_capacity, :bought_at)
  end

  def set_vehicle
    @vehicle = Vehicle.find(params[:id])
  end
end
