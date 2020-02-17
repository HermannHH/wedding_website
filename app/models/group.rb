# == Schema Information
#
# Table name: groups
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

#TODO: Add Token
class Group < ApplicationRecord

  has_many :members, class_name: "Group::Member", foreign_key: "group_id"

  validates     :name, presence: true, uniqueness: true

end
