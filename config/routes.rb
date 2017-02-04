Rails.application.routes.draw do
  resources :artists, only: [:new,:create,:show]
  root 'songs#index'
end
