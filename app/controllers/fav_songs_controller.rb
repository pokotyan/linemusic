class FavSongsController < ApplicationController

  def create
    @song = Song.find(params[:format])
    current_user.fav_songs.create(song_id: @song.id)
  end
  def destroy
    @song = Song.find(params[:id])
    fav_song = current_user.fav_songs.find_by(song_id:@song.id)
    fav_song.destroy
  end
end
