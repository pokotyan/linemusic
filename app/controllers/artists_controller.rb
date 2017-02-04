class ArtistsController < ApplicationController

  def show
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
