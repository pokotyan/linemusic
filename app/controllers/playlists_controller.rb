class PlaylistsController < ApplicationController
  def create
    #params[:data]はこんなデータ {"data"=>{"title"=>"test_title", "desc"=>"test_desc", "public_state"=>"publish"}}
    title = params[:data][:title]
    desc = params[:data][:desc]
    public_state = params[:data][:public_state]
    @playlist = current_user.playlists.create(name:title,description:desc)
    @playlist.private = false if public_state == "publish"
    @playlist.private = true if public_state == "private"
    @playlist.save
  end

  def show
    @playlist = Playlist.find(params[:id])
    @songs_id = @playlist.songs.map{|s|s.id}
  end
end
