Rails.application.routes.draw do

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
