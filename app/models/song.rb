class Song < ActiveRecord::Base
  belongs_to :album

  has_many :fav_songs, dependent: :destroy
  has_many :f_users, through: :fav_songs, source: :user

  has_many :playlist_songs, dependent: :destroy
  has_many :playlists, through: :playlist_songs

  mount_uploader :path, SongUploader

  validates :album_id,:path, presence: true
end
