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

ActiveRecord::Schema.define(version: 20170923083338) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string "name", null: false
    t.string "phone"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_customers_on_deleted_at"
  end

  create_table "rents", force: :cascade do |t|
    t.integer "customer_id"
    t.integer "vehicle_id"
    t.datetime "started_at"
    t.datetime "finished_at"
    t.decimal "price", precision: 8, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "daily", default: false
    t.decimal "company_cash", precision: 8, scale: 2, default: "0.0"
    t.index ["customer_id", "vehicle_id"], name: "index_rents_on_customer_id_and_vehicle_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vehicles", force: :cascade do |t|
    t.string "police_number", null: false
    t.string "brand"
    t.string "machine_number"
    t.string "frame_number"
    t.string "bpkb_number"
    t.integer "machine_capacity"
    t.date "bought_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
