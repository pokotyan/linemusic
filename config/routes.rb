Rails.application.routes.draw do
  devise_for :users
  resources :users, only: :show
  resources :rankings, only: :index
  resources :searchs, only: :show
  resources :genres, only: [:index,:show,:new,:create]
  resources :artists, only: [:new,:create,:show]
  resources :albums, only: [:new,:create,:show]
  resources :songs, only: [:index,:new,:create] do
    collection do
      get 'play'
      post 'set_music_info'
    end
  end
  resources :follows, only: [:create,:destroy]
  resources :fav_songs, only: [:create,:destroy]
  resources :fav_albums, only: [:create,:destroy]
  root 'songs#index'
end
