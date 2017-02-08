class FollowsController < ApplicationController

  def create
    @artist = Artist.find(params[:format])
    current_user.follows.create(artist_id:@artist.id)
  end

  def destroy
    @artist = Artist.find(params[:id])
    follow = current_user.follows.find_by(artist_id:@artist.id)
    follow.destroy
  end
end
