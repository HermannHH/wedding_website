class HomeController < ApplicationController
  def index
    @group = Group.find_by!(token: url_params[:gt]).eager_load(:members)
    @current_member = Group::Member.find_by!(token: url_params[:token])

    # TODO: Set locale by current_member
    # TODO: Setup custom 404
  end

  def rsvp_confirm
    # TODO: rails g migration AddRsvpConfirmedAtToGroupMembers rsvp_confirmed_at:datetime

    @group_member = Group::Member.find_by!(token: url_params[:token])
    @group_member.confirm_rsvp!
    respond_to do |format|
      # format.html { redirect_to group_members_url, notice: 'Member was successfully destroyed.' }
      format.js
    end
  end

  def song_request
    #TODO: Setup song request
  end

  private

  skip_before_action :authenticate_user!

  def url_params
    params.permit(
      :gt, # Group Token
      :token # Group Member Token
    )
  end
end
