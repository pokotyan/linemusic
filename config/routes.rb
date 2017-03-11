Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :users, only: :show
  resources :rankings, only: :index
  get '/search/incremental_search', to: 'search#incremental_search' #この定義はsearch#showより上に書く
  resources :search, only: :show
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
  resources :playlists, only: [:create,:destroy,:show]
  resources :playlist_songs, only: [:create,:destroy]
  resources :trend, only: :index
  root 'songs#index'
end
