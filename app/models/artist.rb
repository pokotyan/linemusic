class Artist < ActiveRecord::Base
  belongs_to :genre
  has_many :albums, dependent: :destroy

  mount_uploader :artist_image, ArtistImageUploader
end
