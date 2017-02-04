Rails.application.routes.draw do
  devise_for :users
  resources :artists, only: [:new,:create,:show]
  resources :albums, only: [:new,:create,:show]
  root 'songs#index'
end
