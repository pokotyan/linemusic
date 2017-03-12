class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  mount_uploader :user_image, UserImageUploader

  has_many :follows, dependent: :destroy #中間テーブル
  has_many :follow_artists, through: :follows, source: :artist

  has_many :fav_songs, dependent: :destroy
  has_many :f_songs, through: :fav_songs, source: :song

  has_many :fav_albums, dependent: :destroy
  has_many :f_albums, through: :fav_albums, source: :album

  has_many :playlists

  def self.find_for_oauth(auth)
    user = User.where(uid: auth.uid, provider: auth.provider).first
    unless user
      new_user = User.new
      new_user.set_values(auth)
      return new_user
    end
    user
  end

  def set_values(auth)
    self.uid = auth.uid
    self.provider = auth.provider
    self.name = auth.info.name
    self.email = dummy_email(auth)
    self.password = Devise.friendly_token[0, 20]
    self.remote_user_image_url = get_image_url(auth)
    self.save
  end

  private

  def get_image_url(auth)
    #https://tagamidaiki.com/facebook-api-picture-size/
    return auth.info.image.gsub('http://','https://') + "?type=large" if provider == "facebook"
    #http://qiita.com/narikei/items/a5fff94db748a3574ed1
    return auth.info.image.gsub('http://','https://').gsub('_normal','') if provider == "twitter"
  end

  def dummy_email(auth)
    "#{auth.uid}-#{auth.provider}@example.com"
  end
end
