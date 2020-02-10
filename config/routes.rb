Rails.application.routes.draw do
  namespace :group do
    resources :members
  end
  resources :groups
  devise_for :users
  authenticated :user do
    root to: 'groups#index', as: :authenticated_root
  end
  root to: "home#index"
end
