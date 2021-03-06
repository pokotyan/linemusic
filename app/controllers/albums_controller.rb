class AlbumsController < ApplicationController

  def show
    @album = Album.find(params[:id])
    @songs_id = @album.songs.map{|s|s.id}
  end

  def new
    @album = Album.new
  end
  def create
    @album = Album.new(album_params)
    if @album.save
      redirect_to root_path, notice: "アルバムの投稿が完了しました"
    else
      flash.now[:alert] = "アルバムの投稿に失敗しました"
      render :new
    end
  end

  private

  def album_params
    params.require(:album).permit(
      :name,
      :album_image,
      :release_date,
      :artist_id,
    )
  end
end
