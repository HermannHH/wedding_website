class ApplicationController < ActionController::Base

  protect_from_forgery prepend: true
  before_action :authenticate_user!


  include Schemas

  private

  def after_sign_in_path_for(resource)
    authenticated_root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path
  end

end
