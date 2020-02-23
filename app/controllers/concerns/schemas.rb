module Schemas

  def group_schema(given)
    given.as_json(
      only: [:token, :name],
      include: {
        members: {
          only: [ :token, :email, :phone_number, :language, :dietary_preference ],
          methods: [
            :full_name,
            :has_confirmed?,
            :has_declined?,
            :not_yet_responded?
          ],
          include: {
            song_requests: {
              only: [:id, :name, :artist]
            }
          }
        }
      }
    )
  end

end
