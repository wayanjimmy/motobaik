Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    post 'authenticate', to: 'authentication#authenticate'
    resources :customers
    resources :vehicles
    resources :rents
    post 'company_cash', to: 'company_cash#store'
  end

  get '*path', to: 'application#fallback_index_html', constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
