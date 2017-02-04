class Album < ActiveRecord::Base
  belongs_to :artist
  has_many :songs, dependent: :destroy

  mount_uploader :album_image, AlbumImageUploader

  validates :artist_id,:name, presence: true


  # songs#newのcollection_selectの表示項目用
  def artist_name_and_album_name
    self.artist.name + ' - ' + self.name
  end
end
