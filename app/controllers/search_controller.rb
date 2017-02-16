class SearchController < ApplicationController

  def show
    @search_text = params[:id]
  end

  def incremental_search
    songs = Song.where('name like ?', "%#{params[:input]}%")
    artists = Artist.where('name like ?', "%#{params[:input]}%")
    albums = Album.where('name like ?', "%#{params[:input]}%")
    result = {}
    result[:songs] = songs.to_a
    result[:artists] = artists.to_a
    result[:albums] = albums.to_a
    render json: result
  end
end
