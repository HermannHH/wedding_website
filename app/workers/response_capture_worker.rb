class ResponseCaptureWorker
  include Sidekiq::Worker

  public


  def perform( token, resp )
    group_member = Group::Member.find_by!(token: token)
    MemberResponseMailer.rsvp(group_member, resp).deliver_now
  end

  private

end
