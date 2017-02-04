# encoding: utf-8
require 'mp3info'
class SongUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process :resize_to_fit => [50, 50]
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_white_list
     %w(mp3)
  end

  #mp3の情報をsongモデルの各カラムへセット
  #http://unching-star.hatenablog.jp/entry/2014/05/10/222039
  #http://maku77.github.io/ruby/ruby-mp3info.html
  process :set_mp3_data
  def set_mp3_data
    Mp3Info.open(current_path) do |mp3|
      model.length = (mp3.length + 0.5).to_i
      model.name = mp3.tag.title

      # デバッグ用
      # mp3.tag2.each do |key, val|
      #   Rails.logger.info "#{key}: #{val}"
      # end
      # mp3.tag.each do |key, val|
      #   Rails.logger.info "#{key}: #{val}"
      # end
    end
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

end
