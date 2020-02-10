# == Schema Information
#
# Table name: group_members
#
#  id         :bigint           not null, primary key
#  first_name :string
#  last_name  :string
#  email      :string
#  group_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Group::Member < ApplicationRecord

  belongs_to :group

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true, uniqueness: { scope: :group_id }

end
