class AddPayloadToGroupMemberSongRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :group_member_song_requests, :payload, :jsonb
  end
end
