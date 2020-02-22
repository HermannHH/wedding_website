module Schemas

  def group_schema(given)
    given.as_json(
      only: [:token, :name],
      include: {
        members: {
          only: [ :token, :email, :phone_number, :language, :dietary_preference ],
          methods: [
            :full_name,
            :has_confirmed,
            :personal_url,
            :rsvp_path,
            :update_path
          ]
        }
      }
    )
  end

end
