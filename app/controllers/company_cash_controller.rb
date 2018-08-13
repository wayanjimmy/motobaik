class CompanyCashController < ApiController
  def store
    company_cashes = params[:company_cashes]

    company_cashes.each do |cash|
      rent = Rent.find(cash['rent_id'])
      rent.company_cash = cash['company_cash']
      rent.save
    end

    json_response company_cashes
  end

  def company_cash_params
    params.permit(:company_cashes)
  end
end
