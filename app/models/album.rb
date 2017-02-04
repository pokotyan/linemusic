class Album < ActiveRecord::Base
  belongs_to :artist
  has_many :songs, dependent: :destroy

  mount_uploader :album_image, AlbumImageUploader

  validates :artist_id,:name, presence: true
end
