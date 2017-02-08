class Artist < ActiveRecord::Base
  belongs_to :genre
  has_many :albums, dependent: :destroy

  has_many :follows, dependent: :destroy #中間テーブル
  has_many :follower, through: :follows, source: :user

  validates :genre_id,:name, presence: true

  mount_uploader :artist_image, ArtistImageUploader
end
