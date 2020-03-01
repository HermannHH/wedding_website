class MemberResponseMailer < ApplicationMailer

  public

	def rsvp( member, resp )
    @member = member
    @resp = resp
		mail(
      to: "harris.hermann@gmail.com",
      cc: "samantha.brass@gmail.com",
			subject: "#{@member.full_name} has responded"
		)
	end

end
