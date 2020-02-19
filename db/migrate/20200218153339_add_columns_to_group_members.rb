class AddColumnsToGroupMembers < ActiveRecord::Migration[6.0]
  def change
    add_column :group_members, :phone_number, :string
    add_column :group_members, :token, :string
    add_index :group_members, :token, unique: true
    add_column :group_members, :language, :string
    add_column :group_members, :dietary_preference, :text
  end
end
