class SongsController < ApplicationController
  def index
    @songs = Song.includes(:album).all
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

  def play
    song = Song.find(params[:music_id])
    song.increment!(:play_count) #再生回数をインクリ
    #audioタグのsrcへ直接パスを入れるのでダイジェストがついたパスを用意しなければいけないのでasset_pathを使う。
    #Rails.logger.info ActionController::Base.helpers.asset_path(music.path) デバッグ用
    render :text => ActionController::Base.helpers.asset_path(song.path)
  end

  def set_music_info
    song = Song.find(params[:music_id])
    @song_name = song.name + " "           #表示するときに曲名とアーティスト名に空白を設けたいのでここで設定しとく
    @artist_name = song.album.artist.name
    @album = song.album
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
