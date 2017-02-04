class GenresController < ApplicationController

  def index
    @genres = Genre.all
  end
  def new
    @genre = Genre.new
  end
  def create
    @genre = Genre.new(genre_params)
    if @genre.save
      redirect_to root_path, notice: "ジャンルの投稿が完了しました"
    else
      flash.now[:alert] = "ジャンルの投稿に失敗しました"
      render :new
    end
  end

  private
  def genre_params
    params.require(:genre).permit(:name)
  end
end
