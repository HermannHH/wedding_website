class AddInvitationDeclinedAtToGroupMember < ActiveRecord::Migration[6.0]
  def change
    add_column :group_members, :invitation_declined_at, :datetime
  end
end
