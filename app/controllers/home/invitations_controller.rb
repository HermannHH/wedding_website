class Home::InvitationsController < ApplicationController

  def update
    @group_member = Group::Member.find_by!(token: url_params[:token])
    if url_params[:intent] == 'accept'
      @group_member.confirm_rsvp!
    else
      @group_member.decline_invitation!
    end
    respond_to do |format|
      if @group_member.persisted?
        format.js
      else
        format.json { render json: @group_member.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  skip_before_action :authenticate_user!

  def url_params
    params.permit(
      :token,
      :intent
    )
  end
end
