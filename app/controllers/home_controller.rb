class HomeController < ApplicationController
  def index
  end

  private

  skip_before_action :authenticate_user!
end
