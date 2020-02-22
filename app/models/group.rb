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
    counter = 0
    CSV.foreach(file.path, headers: true, header_converters: :symbol) do |row|
      group = Group.find_or_create_by!(name: row[:group_name])
      member = Group::Member.new(
        row.to_hash.slice(
          :first_name,
          :last_name,
          :email,
          :phone_number,
          :language
        )
      )
      member.group = group
      # binding.pry
      if member.save
        counter += 1
      else
        puts "#{group.name}  - #{member.errors.full_messages.join(",")}"
      end
    end
    counter
  end

  def self.to_csv
    CSV.generate(headers: true) do |csv|
      csv << ['group_name', 'first_name', 'last_name', 'email', 'phone_number', 'personal_link', 'language']
      all.each do |group|
        group.members.each do |member|
          csv << [
            group.name,
            member.first_name,
            member.last_name,
            member.email,
            member.phone_number,
            member.personal_url,
            member.language
          ]
        end
      end
    end
  end

end
