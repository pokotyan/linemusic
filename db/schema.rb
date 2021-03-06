# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170311225352) do

  create_table "albums", force: :cascade do |t|
    t.string   "name",         limit: 255
    t.string   "album_image",  limit: 255
    t.integer  "artist_id",    limit: 4
    t.date     "release_date"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "albums", ["artist_id"], name: "index_albums_on_artist_id", using: :btree

  create_table "artists", force: :cascade do |t|
    t.string   "name",         limit: 255
    t.string   "artist_image", limit: 255
    t.integer  "genre_id",     limit: 4
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.boolean  "reccomend",                default: false, null: false
  end

  add_index "artists", ["genre_id"], name: "index_artists_on_genre_id", using: :btree

  create_table "fav_albums", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "album_id",   limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "fav_albums", ["album_id"], name: "index_fav_albums_on_album_id", using: :btree
  add_index "fav_albums", ["user_id"], name: "index_fav_albums_on_user_id", using: :btree

  create_table "fav_songs", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "song_id",    limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "fav_songs", ["song_id"], name: "index_fav_songs_on_song_id", using: :btree
  add_index "fav_songs", ["user_id"], name: "index_fav_songs_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "artist_id",  limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "follows", ["artist_id"], name: "index_follows_on_artist_id", using: :btree
  add_index "follows", ["user_id"], name: "index_follows_on_user_id", using: :btree

  create_table "genres", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "playlist_songs", force: :cascade do |t|
    t.integer  "playlist_id", limit: 4
    t.integer  "song_id",     limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "playlist_songs", ["playlist_id"], name: "index_playlist_songs_on_playlist_id", using: :btree
  add_index "playlist_songs", ["song_id"], name: "index_playlist_songs_on_song_id", using: :btree

  create_table "playlists", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.boolean  "private",                 default: false, null: false
    t.integer  "user_id",     limit: 4
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  add_index "playlists", ["user_id"], name: "index_playlists_on_user_id", using: :btree

  create_table "songs", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "path",       limit: 255
    t.integer  "album_id",   limit: 4
    t.integer  "play_count", limit: 4,   default: 0
    t.integer  "track_num",  limit: 4
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "length",     limit: 4
  end

  add_index "songs", ["album_id"], name: "index_songs_on_album_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "",    null: false
    t.string   "encrypted_password",     limit: 255, default: "",    null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.boolean  "admin",                              default: false, null: false
    t.string   "name",                   limit: 255
    t.string   "user_image",             limit: 255
    t.string   "uid",                    limit: 255
    t.string   "provider",               limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "albums", "artists"
  add_foreign_key "artists", "genres"
  add_foreign_key "fav_albums", "albums"
  add_foreign_key "fav_albums", "users"
  add_foreign_key "fav_songs", "songs"
  add_foreign_key "fav_songs", "users"
  add_foreign_key "follows", "artists"
  add_foreign_key "follows", "users"
  add_foreign_key "playlist_songs", "playlists"
  add_foreign_key "playlist_songs", "songs"
  add_foreign_key "playlists", "users"
  add_foreign_key "songs", "albums"
end
