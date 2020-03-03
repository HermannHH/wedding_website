class AddCountryCodeToGroupMember < ActiveRecord::Migration[6.0]
  def change
    add_column :group_members, :country_code, :string
  end
end
