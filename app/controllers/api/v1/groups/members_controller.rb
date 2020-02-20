class Api::V1::Groups::MembersController < Api::V1::BaseController

  def rsvp
    @group_member = Group::Member.find_by!(token: url_params[:token])
    @group_member.confirm_rsvp!
    json_response(@group_member, :ok)
  end

  def update
    @group_member = Group::Member.find_by!(token: url_params[:token])
    @group_member.update!(data_params)
    json_response(@group_member, :ok)
  end


  private

  skip_before_action :authenticate_user!, only: [:rsvp, :update]

  def url_params
    params.permit(:token)
  end

  def data_params
    params.require(:member).permit(
      :dietary_preference
    )
  end
end
