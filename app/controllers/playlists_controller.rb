class PlaylistsController < ApplicationController
  def create
    #params[:data]はこんな感じのデータ {"song_id"=>["26", "23", "7", "5"], "playlist_id"=>"1"}
    song_ids = params[:data][:song_id].map(&:to_i)
    playlist_id = params[:data][:playlist_id].to_i
    song_ids.each do |song_id|
      PlaylistSong.find_or_create_by(playlist_id:playlist_id,song_id:song_id) #なければ作成。同じ曲を重複してプレイリストに入れない
    end
    @playlist = Playlist.find(playlist_id)
  end
end
