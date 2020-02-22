class Api::V1::Groups::Members::SongsController < Api::V1::BaseController

  def create
    group_member = Group::Member.find_by!(token: url_params[:member_token])
    song = Group::Member::SongRequest.new(data_params)
    song.member = group_member
    song.save!
    json_response(group_schema(group_member.group), :ok)
  end

  private

  skip_before_action :authenticate_user!

  def url_params
    params.permit(:member_token)
  end

  def data_params
    params.require(:song).permit(
      :name,
      :artist,
      :payload
    )
  end
end
