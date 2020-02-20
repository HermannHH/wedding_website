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
  # validates :email, presence: true, email: true, uniqueness: { scope: :group_id }
  validates :email, presence: true, email: true

  has_secure_token

  def confirm_rsvp!
    self.update!(
      rsvp_confirmed_at: Time.now.utc
    )
  end

  def has_confirmed
    !self.rsvp_confirmed_at.nil?
  end

  def personal_link
    # https://stackoverflow.com/questions/341143/can-rails-routing-helpers-i-e-mymodel-pathmodel-be-used-in-models
    Rails.application.routes.url_helpers.root_url(gt: self.group.token , token: self.token)
  end

end
