# == Schema Information
#
# Table name: group_members
#
#  id                     :bigint           not null, primary key
#  first_name             :string
#  last_name              :string
#  email                  :string
#  group_id               :bigint           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  phone_number           :string
#  token                  :string
#  language               :string
#  dietary_preference     :text
#  rsvp_confirmed_at      :datetime
#  invitation_declined_at :datetime
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

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def confirm_rsvp!
    self.update!(
      invitation_declined_at: nil,
      rsvp_confirmed_at: Time.now.utc
    )
  end

  def has_confirmed?
    !self.rsvp_confirmed_at.nil?
  end

  def decline_invitation!
    self.update!(
      invitation_declined_at: Time.now.utc,
      rsvp_confirmed_at: nil
    )
  end

  def has_declined?
    !self.invitation_declined_at.nil?
  end

  def not_yet_responded?
    !has_declined? && !has_confirmed?
  end

  # def personal_url
  #   # https://stackoverflow.com/questions/341143/can-rails-routing-helpers-i-e-mymodel-pathmodel-be-used-in-models
  #   Rails.application.routes.url_helpers.root_url(gt: self.group.token , token: self.token)
  # end

  # def rsvp_path
  #   Rails.application.routes.url_helpers.rsvp_api_v1_groups_member_path(token: self.token )
  # end

  # def update_path
  #   Rails.application.routes.url_helpers.api_v1_groups_member_path(token: self.token)
  # end

end
