class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    callback_from :facebook
  end

  def twitter
    callback_from :twitter
  end

  private

  def callback_from(provider)
    provider = provider.to_s
    @auth = request.env['omniauth.auth']
    @user = User.find_for_oauth(@auth)

    if @user.persisted?
      flash[:notice] = I18n.t('devise.omniauth_callbacks.success', kind: provider.capitalize)
      sign_in_and_redirect @user, event: :authentication
    else
      flash[:alert] = I18n.t('devise.omniauth_callbacks.failure', kind: provider.capitalize, reason: "Failed to save user data")
      session["devise.#{provider}_data"] = @auth.except("extra")
      redirect_to new_user_registration_url
    end
  end
end
