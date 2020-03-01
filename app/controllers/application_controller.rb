class ApplicationController < ActionController::Base

  protect_from_forgery prepend: true
  before_action :set_raven_context, if: -> { Rails.env.production? }
  before_action :authenticate_user!


  include Schemas

  private

  def after_sign_in_path_for(resource)
    authenticated_root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path
  end

  def set_raven_context
    # Raven.user_context(id: session[:current_user_id]) # or anything else in session
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

end
