class Artist < ActiveRecord::Base
  belongs_to :genre
  has_many :albums, dependent: :destroy
end
