class Api::V1::Groups::MembersController < Api::V1::BaseController

  def index
    group_members = Group::Member.all
    json_response(member_schema(group_members), :ok)
  end

  def update
    group_member = Group::Member.find_by!(token: url_params[:token])
    group_member.update!(data_params)
    json_response(member_schema(group_member), :ok)
  end


  private

  skip_before_action :authenticate_user!

  def url_params
    params.permit(:token)
  end

  def data_params
    params.require(:member).permit(
      :first_name,
      :last_name,
      :phone_number,
      :email,
      :dietary_preference
    )
  end
end
