json.extract! group_member, :id, :first_name, :last_name, :email, :group_id, :created_at, :updated_at
json.url group_member_url(group_member, format: :json)
