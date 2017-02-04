class Song < ActiveRecord::Base
  belongs_to :album

  mount_uploader :path, SongUploader

  validates :album_id,:path, presence: true
end
