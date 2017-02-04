class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name
      t.string :path
      t.references :album, index: true, foreign_key: true
      t.integer :play_count, default: 0
      t.integer :track_num

      t.timestamps null: false
    end
  end
end
