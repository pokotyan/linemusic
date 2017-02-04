class SongsController < ApplicationController
  def index
  end

  def new
    @song = Song.new
  end
  def create
    @song = Song.new(song_params)
    if @song.save
      redirect_to root_path, notice: "曲の投稿が完了しました"
    else
      flash.now[:alert] = "曲の投稿に失敗しました"
      render :new
    end
  end

  private

  def song_params
    params.require(:song).permit(
      :name,
      :path,
      :album_name,
      :album_id,
      :length
    )
  end
end
