Rails.application.routes.draw do

  get '/404', to: "errors#not_found"
  get '/422', to: "errors#unacceptable"
  get '/500', to: "errors#internal_error"

  resources :groups, param: :token do
    collection do
      post :import
    end
    resources :members, module: :groups, param: :token
  end
  devise_for :users
  authenticated :user do
    root to: 'groups#index', as: :authenticated_root
  end
  root to: "home#index"


  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      namespace :groups do
        resources :members, only: [ :update ], param: :token do
          member do
            patch :rsvp
          end
          resources :songs, only: [ :create ], module: :members
        end
      end
    end
  end

end
