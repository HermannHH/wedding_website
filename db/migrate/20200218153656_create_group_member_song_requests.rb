class CreateGroupMemberSongRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :group_member_song_requests do |t|
      t.string :name
      t.string :artist
      t.references :group_member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
