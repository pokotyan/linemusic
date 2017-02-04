class Artist < ActiveRecord::Base
  belongs_to :genre
  has_many :albums, dependent: :destroy

  validates :genre_id,:name, presence: true

  mount_uploader :artist_image, ArtistImageUploader
end
