class Api::ApiController < ApiController
  skip_before_filter :api_session_token_authenticate!, only: [:index]

  def index
    respond_with \
      sessions_url: api_sessions_url,
      users_url:    api_users_url
  end
end
