class Home::InvitationsController < ApplicationController

  def update
    @group_member = Group::Member.find_by!(token: url_params[:token])
    respond_to do |format|
      if @group_member.update(data_params)
        format.js
      else
        format.json { render json: @group_member.errors, status: :unprocessable_entity }
      end
    end
  end

  def accept
    @group_member = Group::Member.find_by!(token: url_params[:token])
    ::ResponseCaptureWorker.perform_async( @group_member.token, 'accept' )
    respond_to do |format|
      if @group_member.confirm_rsvp!
        format.js
      else
        format.json { render json: @group_member.errors, status: :unprocessable_entity }
      end
    end
  end

  def decline
    @group_member = Group::Member.find_by!(token: url_params[:token])
    ::ResponseCaptureWorker.perform_async( @group_member.token, 'decline' )
    respond_to do |format|
      if @group_member.decline_invitation!
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
      :token
    )
  end

  def data_params
    params.require(:group_member).permit(
      :dietary_preference
    )
  end
end
