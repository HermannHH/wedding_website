# == Schema Information
#
# Table name: group_member_song_requests
#
#  id              :bigint           not null, primary key
#  name            :string
#  artist          :string
#  group_member_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  payload         :jsonb
#

class Group::Member::SongRequest < ApplicationRecord
  belongs_to :member, class_name: "Group::Member", foreign_key: "group_member_id"
end
