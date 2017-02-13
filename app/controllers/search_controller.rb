class SearchController < ApplicationController

  def show
    @search_text = params[:id]
  end

end
