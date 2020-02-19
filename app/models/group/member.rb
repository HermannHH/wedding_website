# == Schema Information
#
# Table name: group_members
#
#  id                 :bigint           not null, primary key
#  first_name         :string
#  last_name          :string
#  email              :string
#  group_id           :bigint           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  phone_number       :string
#  token              :string
#  language           :string
#  dietary_preference :text
#  rsvp_confirmed_at  :datetime
#

# TODO: Add language locale & configure based on views
# TODO: Convert views to use locales

class Group::Member < ApplicationRecord

  belongs_to :group
  has_many :song_requests, class_name: "Group::Member::SongRequest", foreign_key: "group_member_id"

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true, uniqueness: { scope: :group_id }

  has_secure_token

  def confirm_rsvp!
    self.update!(
      rsvp_confirmed_at: Time.now.utc
    )
  end

  def rsvp_confirmed?
    !self.rsvp_confirmed_at.blank?
  end

end
