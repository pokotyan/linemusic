Indico.api_key = ENV['INDICO_API_KEY']
class ArtistsController < ApplicationController

  def show
    @artist = Artist.find(params[:id])
    @artist_songs = @artist.albums.map{|a|a.songs}.flatten
    @songs_id = @artist_songs.map{|s|s.id}

    @songs_keywords = Indico.keywords(@artist_songs.map{|s|s.name}.join(" "))
    @songs_emotions = Indico.emotion(@artist_songs.map{|s|s.name}.join(" "))
  end

  def new
    @artist = Artist.new
  end
  def create
    @artist = Artist.new(artist_params)
    if @artist.save
      redirect_to root_path, notice: "アーティストの投稿が完了しました"
    else
      flash.now[:alert] = "アーティストの投稿に失敗しました"
      render :new
    end
  end

  private

  def artist_params
    params.require(:artist).permit(
        :genre_id,
        :name,
        :artist_image,
    )
  end
end
