class TrendController < ApplicationController
  def index
    @new_albums = Album.order(release_date: :desc)
    @reccomend_artists = Artist.all.select{|a|a.reccomend?}
  end
end
