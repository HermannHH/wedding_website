class Groups::MembersController < ApplicationController
  before_action :set_group_member, only: [:show, :edit, :update, :destroy]

  # GET /group/members
  # GET /group/members.json
  def index
    @group_members = Group::Member.all
  end

  # GET /group/members/1
  # GET /group/members/1.json
  def show
  end

  # GET /group/members/new
  def new
    @group_member = Group::Member.new
  end

  # GET /group/members/1/edit
  def edit
  end

  # POST /group/members
  # POST /group/members.json
  def create
    @group_member = Group::Member.new(group_member_params)
    @group_member.group = @group

    respond_to do |format|
      if @group_member.save
        format.html { redirect_to group_member_path(@group.id, @group_member.id), notice: 'Member was successfully created.' }
        format.json { render :show, status: :created, location: @group_member }
      else
        format.html { render :new }
        format.json { render json: @group_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /group/members/1
  # PATCH/PUT /group/members/1.json
  def update
    respond_to do |format|
      if @group_member.update(group_member_params)
        format.html { redirect_to group_member_path(@group.id, @group_member.id), notice: 'Member was successfully updated.' }
        format.json { render :show, status: :ok, location: @group_member }
      else
        format.html { render :edit }
        format.json { render json: @group_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /group/members/1
  # DELETE /group/members/1.json
  def destroy
    @group_member.destroy
    respond_to do |format|
      format.html { redirect_to group_members_url, notice: 'Member was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  skip_before_action :authenticate_user!, only: [:rsvp]

  before_action :set_group

  def set_group
    @group = Group.find_by!(token: url_params[:group_token] || url_params[:token])
  end
    # Use callbacks to share common setup or constraints between actions.
    def set_group_member
      @group_member = Group::Member.find(params[:id])
    end

  def url_params
    params.permit(:group_token, :token)
  end

    # Only allow a list of trusted parameters through.
    def group_member_params
      params.require(:group_member).permit(:first_name, :last_name, :email, :group_id)
    end
end
