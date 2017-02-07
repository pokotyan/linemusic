Rails.application.routes.draw do
  devise_for :users
  resources :rankings, only: :index
  resources :genres, only: [:index,:show,:new,:create]
  resources :artists, only: [:new,:create,:show]
  resources :albums, only: [:new,:create,:show]
  resources :songs, only: [:index,:new,:create] do
    collection do
      get 'play'
      post 'set_music_info'
    end
  end
  root 'songs#index'
end
