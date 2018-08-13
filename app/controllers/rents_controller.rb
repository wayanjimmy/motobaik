class RentsController < ApiController
  before_action :set_rent, only: [:show, :update, :destroy]

  # GET /rents
  def index
    @rents = Rent.latest.includes(:customer, :vehicle).where('customer_id IS NOT NULL')
    @rents = @rents.by_year(params[:year]) if params[:year].present?
    @rents = @rents.by_month(params[:month]) if params[:month].present?
    @rents = @rents.by_customer(params[:customer]) if params[:customer].present?
    render json: @rents, include: ['customer', 'vehicle']
  end

  # POST /rents
  def create
    @rent = Rent.create!(rent_params)
    render json: @rent, status: :created, include: ['customer', 'vehicle']
  end

  # GET /rents/:id
  def show
    json_response(@rent)
  end

  # PUT /rents/:id
  def update
    @rent.update(params_permit(:company_cash))
    json_response(@rent)
  end

  # DELETE /rents/:id
  def destroy
    @rent.destroy
    json_response(@rent)
  end

  private

  def set_rent
    @rent = Rent.find(params[:id])
  end

  def rent_params
    params.permit(:customer_id, :vehicle_id, :started_at, :finished_at, :price, :daily)
  end
end
