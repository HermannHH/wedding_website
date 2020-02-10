class CreateGroupMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :group_members do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
