class HomeController < ApplicationController
  def index
    # group = Group.eager_load(:members).find_by!(token: url_params[:gt])
    @group = Group.eager_load(:members).eager_load(:song_requests).find_by!(token: url_params[:gt])
    @current_member = Group::Member.find_by!(token: url_params[:token])
    @questions = QuestionAndAnswer.all
  end

  def accept
    group_member = Group::Member.find_by!(token: url_params[:token])
    group_member.confirm_rsvp!
  end

  def decline

  end

  private

  layout 'public'

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
