# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :session_token, presence: true
  validates :password_digest, presence: {message: "Password can not be blank."}
  validates :password, length: {minimum: 6, allow_nil: true}
  before_validation :ensure_session_token

  attr_reader :password

  # password=
  # sets password to instance variable so that 
  # model level validations can check for length and presence
  # sets password_digest on user from plain text password
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)

  end

  # is_password?
  # checks if plaintext password matches with salted password in DB
  # returns a boolean
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  # ensure_session_token
  # generates new session token if user currently does not have
  # session token saved in DB
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(64)
  end

  # reset_session_token
  # generates new session token
  # saves user
  # returns new session token
  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64(64)
    self.save
    self.session_token
  end

  # self.find_by_credentials
  # searches DB for user via username
  # returns a user if the user is found in the DB
  # and the plain text password matches with the stored
  # password digest. Returns nil if user not found or if the password
  # does not match the user's password_digest
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if !user.nil? and user.is_password(password)
    nil
  end

end
