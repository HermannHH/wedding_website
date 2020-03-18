# == Schema Information
#
# Table name: groups
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  token      :string
#
require 'csv'

class Group < ApplicationRecord

  has_many :members, class_name: "Group::Member", foreign_key: "group_id", dependent: :destroy

  has_many :song_requests, through: :members

  accepts_nested_attributes_for :members, allow_destroy: true

  validates     :name, presence: true, uniqueness: true

  has_secure_token


  def self.member_count
    total = 0
    Group.all.each do |group|
      total += group.members.size
    end
    total
  end


  def self.confirmed_member_count
    total = 0
    Group.all.each do |group|
      total += group.members.where.not(rsvp_confirmed_at: nil).size
    end
    total
  end


  def self.import(file)
    row_counter = 0
    success_counter = 0
    error_counter = 0
    error_rows = []
    CSV.foreach(file.path, headers: true, header_converters: :symbol).with_index( 2 ) do |row, row_number|
      group = Group.find_or_create_by!(name: row[:group_name])
      member = Group::Member.new(
        row.to_hash.slice(
          :first_name,
          :last_name,
          :email,
          :phone_number,
          :language,
          :country_code
        )
      )
      member.group = group
      row_counter += 1
      # binding.pry
      if member.save
        success_counter += 1
      else
        error_counter += 1
        error_rows << row_number
        puts "ERR: #{group.name} - #{row[:first_name]}  - #{member.errors.full_messages.join(",")}"
      end
    end
    return {
      row_counter: row_counter,
      success_counter: success_counter,
      error_counter: error_counter,
      error_rows: error_rows
  }.to_hash
  end

  def self.to_csv
    CSV.generate(headers: true) do |csv|
      csv << ['group_name', 'first_name', 'last_name', 'response', 'phone_number' ]
      all.each do |group|
        group.members.each do |member|
          csv << [
            group.name,
            member.first_name,
            member.last_name,
            member.attendance_status,
            member.standardised_phone_number
            # member.email,
            # member.phone_number,
            # member.personal_url,
            # member.language,
            # member.country_code
          ]
        end
      end
    end
  end

end
