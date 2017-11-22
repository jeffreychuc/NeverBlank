# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  author_id   :integer          not null
#  notebook_id :integer
#  title       :string
#  body        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Note < ApplicationRecord
  validates :author_id, presence: true
  validates :title, presence: true

  before_validation :init

  # init
  # sets default title of note as Untitled if user
  # does not include a title.
  def init
    self.title ||= 'Untitled'
  end

end
