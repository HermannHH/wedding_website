# == Schema Information
#
# Table name: question_and_answers
#
#  id         :bigint           not null, primary key
#  question   :text
#  answer     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class QuestionAndAnswer < ApplicationRecord

  validates     :question, presence: true
  validates     :answer, presence: true

end
