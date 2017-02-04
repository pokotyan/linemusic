module ApplicationHelper

  #参考：https://joppot.info/2016/04/01/3079
  #svg画像を表示するためのヘルパー
  def embedded_svg filename, options={}
     file = File.read(Rails.root.join('app', 'assets', 'images', filename))
     doc = Nokogiri::HTML::DocumentFragment.parse file
     svg = doc.at_css 'svg'
     if options[:class].present?
       svg['class'] = options[:class]
     end
     doc.to_html.html_safe
  end

  #長い文字列（曲名とか）を省略して表示させる
  def omission_string(str)
    if str.length > 22
      str[0..21] + "…"
    else
      str
    end
  end

  #１曲の曲長。テーブルで使用
  def song_play_time(song_length)
    Time.at(song_length).utc.strftime("%M:%S")
  end

end
