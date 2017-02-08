class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :user_image, UserImageUploader

  has_many :follows, dependent: :destroy #中間テーブル
  has_many :follow_artists, through: :follows, source: :artist

  has_many :fav_songs, dependent: :destroy
  has_many :f_songs, through: :fav_songs, source: :song
end
