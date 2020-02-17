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

# TODO: Add phone number
# TODO: Add Token
# TODO: Add Language
# TODO: Add language locale & configure based on views
# TODO: Convert views to use locales
# TODO: Add Dietary preference free text

class Group::Member < ApplicationRecord

  belongs_to :group

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true, uniqueness: { scope: :group_id }

  def confirm_rsvp!
    self.update!(
      rsvp_confirmed_at: Time.now.utc
    )
  end

  def rsvp_confirmed?
    !self.rsvp_confirmed_at.blank?
  end

end
