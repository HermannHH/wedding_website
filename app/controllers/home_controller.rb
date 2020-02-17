class HomeController < ApplicationController
  def index
    @group = Group.find_by!(id: params[:group_id]).eager_load(:members)
    #TODO: Setup custom 404
  end

  def rsvp_confirm
    # TODO: rails g migration AddRsvpConfirmedAtToGroupMembers rsvp_confirmed_at:datetime

    @group_member = Group::Member.find_by!(id: url_params[:group_member_id])
    @group_member.confirm_rsvp!
    respond_to do |format|
      # format.html { redirect_to group_members_url, notice: 'Member was successfully destroyed.' }
      format.js
    end
  end

  private

  skip_before_action :authenticate_user!

  def url_params
    params.permit(
      :group_id,
      :group_member_id
    )
  end
end
