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

  def member_schema(given)
    given.as_json(
      only: [ :token, :email, :phone_number, :language, :dietary_preference, :first_name, :last_name ],
      methods: [
        :full_name,
        :attendance_status,
        :standardised_phone_number,
        :personal_url,
        :whatsapp_url
      ],
      include: {
        group: {
          only: [:token, :name]
        },
        song_requests: {
          only: [:id, :name, :artist]
        }
      }
    )
  end

end
