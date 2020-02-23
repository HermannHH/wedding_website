class CreateQuestionAndAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :question_and_answers do |t|
      t.text :question
      t.text :answer

      t.timestamps
    end
  end
end
