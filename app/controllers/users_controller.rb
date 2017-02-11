class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    #お気に入りソング
    @songs = @user.f_songs
    @songs_id = @user.f_songs.map{|s|s.id}

    #マイアーティスト
    @artists = @user.follow_artists
  end
end
