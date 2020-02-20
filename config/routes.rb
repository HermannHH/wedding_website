Rails.application.routes.draw do

  get '/404', to: "errors#not_found"
  get '/422', to: "errors#unacceptable"
  get '/500', to: "errors#internal_error"

  resources :groups do
    collection do
      post :import
    end
    resources :members, module: :groups
  end
  devise_for :users
  authenticated :user do
    root to: 'groups#index', as: :authenticated_root
  end
  root to: "home#index"
  namespace :home do
    patch :rsvp_confirm
  end
end
