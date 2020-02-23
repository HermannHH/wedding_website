json.extract! question_and_answer, :id, :question, :answer, :created_at, :updated_at
json.url question_and_answer_url(question_and_answer, format: :json)
