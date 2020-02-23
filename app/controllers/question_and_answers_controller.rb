class QuestionAndAnswersController < ApplicationController
  before_action :set_question_and_answer, only: [:show, :edit, :update, :destroy]

  # GET /question_and_answers
  # GET /question_and_answers.json
  def index
    @question_and_answers = QuestionAndAnswer.all
  end

  # GET /question_and_answers/1
  # GET /question_and_answers/1.json
  def show
  end

  # GET /question_and_answers/new
  def new
    @question_and_answer = QuestionAndAnswer.new
  end

  # GET /question_and_answers/1/edit
  def edit
  end

  # POST /question_and_answers
  # POST /question_and_answers.json
  def create
    @question_and_answer = QuestionAndAnswer.new(question_and_answer_params)

    respond_to do |format|
      if @question_and_answer.save
        format.html { redirect_to @question_and_answer, notice: 'Question and answer was successfully created.' }
        format.json { render :show, status: :created, location: @question_and_answer }
      else
        format.html { render :new }
        format.json { render json: @question_and_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /question_and_answers/1
  # PATCH/PUT /question_and_answers/1.json
  def update
    respond_to do |format|
      if @question_and_answer.update(question_and_answer_params)
        format.html { redirect_to @question_and_answer, notice: 'Question and answer was successfully updated.' }
        format.json { render :show, status: :ok, location: @question_and_answer }
      else
        format.html { render :edit }
        format.json { render json: @question_and_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /question_and_answers/1
  # DELETE /question_and_answers/1.json
  def destroy
    @question_and_answer.destroy
    respond_to do |format|
      format.html { redirect_to question_and_answers_url, notice: 'Question and answer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    layout 'admin'
    # Use callbacks to share common setup or constraints between actions.
    def set_question_and_answer
      @question_and_answer = QuestionAndAnswer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def question_and_answer_params
      params.require(:question_and_answer).permit(:question, :answer)
    end
end
