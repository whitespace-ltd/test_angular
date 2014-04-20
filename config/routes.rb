TestAngular::Application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource  :sessions, only: [:create, :show, :destroy]
    resources :users,    only: [:create, :show, :index]

    root to: 'api#index'
  end

  root to: 'home#index'
end
