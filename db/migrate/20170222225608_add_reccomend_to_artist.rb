class AddReccomendToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :reccomend, :boolean, default: false, null: false
  end
end
