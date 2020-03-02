Rails.application.routes.draw do

  resources :question_and_answers
  get '/404', to: "errors#not_found"
  get '/422', to: "errors#unacceptable"
  get '/500', to: "errors#internal_error"

  resources :groups, param: :token do
    collection do
      post :import
    end
    resources :members, module: :groups, param: :token
  end

  devise_for :users,
  path_names: {},
  controllers: {
    sessions: 'auth/sessions'
  }

  authenticated :user do
    root to: 'groups#index', as: :authenticated_root
  end
  root to: "home#index"

  resources :invitations, only: [:update], module: :home, param: :token do
    member do
      patch :accept
      patch :decline
    end
  end


  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      namespace :groups do
        resources :members, only: [ :index, :update ], param: :token do
          resources :songs, only: [ :create ], module: :members
        end
      end
    end
  end

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

end
