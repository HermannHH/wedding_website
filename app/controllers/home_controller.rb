class HomeController < ApplicationController
  def index
    @group = Group.find_by!(token: url_params[:gt])
    @current_member = Group::Member.find_by!(token: url_params[:token])

    # TODO: Set locale by current_member
    # TODO: Setup custom 404
  end

  def rsvp_confirm
    @group_member = Group::Member.find_by!(token: url_params[:token])
    @group_member.confirm_rsvp!
    respond_to do |format|
      # format.html { redirect_to group_members_url, notice: 'Member was successfully destroyed.' }
      format.js
    end
  end

  def song_request
    @sing_request = Group::Member::SongRequest.create!(song_request_params)
    respond_to do |format|
      # format.html { redirect_to group_members_url, notice: 'Member was successfully destroyed.' }
      format.js
    end
  end

  private

  skip_before_action :authenticate_user!

  def url_params
    params.permit(
      :gt, # Group Token
      :token # Group Member Token
    )
  end

  def song_request_params
    params.require(:song_request).permit(
      :name,
      :artist
    )
  end
end
