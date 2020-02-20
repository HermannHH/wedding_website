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

  has_many :members, class_name: "Group::Member", foreign_key: "group_id"

  accepts_nested_attributes_for :members, allow_destroy: true

  validates     :name, presence: true, uniqueness: true

  has_secure_token


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

end
