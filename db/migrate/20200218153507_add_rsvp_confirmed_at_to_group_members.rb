class AddRsvpConfirmedAtToGroupMembers < ActiveRecord::Migration[6.0]
  def change
    add_column :group_members, :rsvp_confirmed_at, :datetime
  end
end
