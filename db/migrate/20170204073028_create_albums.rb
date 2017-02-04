class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :name
      t.string :album_image
      t.references :artist, index: true, foreign_key: true
      t.date :release_date

      t.timestamps null: false
    end
  end
end
