class FavAlbumsController < ApplicationController

  def create
    @album = Album.find(params[:format])
    current_user.fav_albums.create(album_id: @album.id)
  end
  def destroy
    @album = Album.find(params[:id])
    fav_album = current_user.fav_albums.find_by(album_id:@album.id)
    fav_album.destroy
  end
end
