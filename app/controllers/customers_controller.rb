class CustomersController < ApiController
  before_action :set_customer, only: [:show, :update, :destroy]

  # GET /customers
  def index
    @customers = Customer.latest
    json_response(@customers)
  end

  # POST /customers
  def create
    @customer = Customer.create!(customer_params)
    json_response(@customer, :created)
  end

  # GET /customers/:id
  def show
    json_response(@customer)
  end

  # PUT /customers/:id
  def update
    @customer.update(customer_params)
    json_response(@customer)
  end

  # DELETE /customers/:id
  def destroy
    @customer.destroy
    json_response(@customer)
  end

  private

  def customer_params
    params.permit(:name, :phone, :address)
  end

  def set_customer
    @customer = Customer.find(params[:id])
  end
end
