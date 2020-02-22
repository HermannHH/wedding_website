class HomeController < ApplicationController
  def index
    group = Group.eager_load(:members).find_by!(token: url_params[:gt])
    @current_member = Group::Member.find_by!(token: url_params[:token])
    @group = group_schema(group)

    # TODO: Set locale by current_member
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
