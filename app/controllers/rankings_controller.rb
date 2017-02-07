class RankingsController < ApplicationController

  def index
    @songs = Song.includes(:album).order(play_count: :desc)
    @songs_id = @songs.map{|song|song.id} #data属性に使う。pluck(:id)で曲のid一覧を取得してはダメ。再生数順に並び替えした一覧が必要。
  end
end
