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
#  country_code           :string
#

# TODO: Add language locale & configure based on views
# TODO: Convert views to use locales

class Group::Member < ApplicationRecord

  belongs_to :group
  has_many :song_requests, class_name: "Group::Member::SongRequest", foreign_key: "group_member_id"

  # validates :first_name, presence: true
  # validates :last_name, presence: true
  # validates :email, presence: true, email: true, uniqueness: { scope: :group_id }
  # validates :phone_number, mobile_phone: true, allow_blank: true
  validates :email, email: true, allow_blank: true

  attr_accessor :parsed_phone_number

  default_scope { order(id: :asc) }

  has_secure_token

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def attendance_status
    return "Pending" if not_yet_responded?
    return "Declined" if has_declined?
    return "Confirmed" if has_confirmed?
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

  def standardised_phone_number
    Phonelib.parse(self.phone_number, self.country_code&.upcase || 'ZA').to_s
  end

  def reset!
    self.update(rsvp_confirmed_at: nil, invitation_declined_at: nil, dietary_preference: nil)
  end

  def personal_url
    Rails.application.routes.url_helpers.root_url(gt: self.group.token , token: self.token)
  end

  def whatsapp_url
    "https://wa.me/#{self.standardised_phone_number.remove('+')}?text=#{CGI.escape(Rails.application.routes.url_helpers.root_url(gt: self.group.token, token: self.token ))}"
  end


  before_save :set_phone_number, if: lambda {|object| !object.phone_number.nil?}


  def set_phone_number
    self.phone_number = Phonelib.parse(self.phone_number, self.country_code&.upcase || 'ZA').to_s
  end

  # def update_path
  #   Rails.application.routes.url_helpers.api_v1_groups_member_path(token: self.token)
  # end

end
