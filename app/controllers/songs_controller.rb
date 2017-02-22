class SongsController < ApplicationController
  def index
    @rankings = Song.includes(:album).order(play_count: :desc).limit(6)
    @new_albums = Album.order(release_date: :desc).limit(9)
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
    #set_music_info.js.hamlで曲名やアーティスト名の表示を更新しているが
    #名前に " や ' がに含まれていると文字列リテラルと解釈されて表示更新がされなくなるため、事前に置換しておく
    @song_name = replace_quotation(song.name) + " "

    @artist = song.album.artist
    @artist_name = replace_quotation(@artist.name)

    @album = song.album
  end

  private

  def replace_quotation(name)
    name.gsub(/\"|\'/, " ")
  end

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
