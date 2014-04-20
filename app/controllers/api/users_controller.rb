class Api::UsersController < ApiController
  skip_before_filter :api_session_token_authenticate!, only: [:create]

  def create
    user = User.create(user_params)
    unless user.errors.size == 0
      render json: {errors: user.errors}
    else
      render json: user
    end
  end

  def index
    respond_with User.all
  end

  def show
    user = User.find_by_id(params[:id])
    return _not_found unless user
    respond_with user
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
