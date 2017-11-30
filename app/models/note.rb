# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  author_id   :integer          not null
#  notebook_id :integer
#  title       :string           not null
#  body        :string
#  bodypreview :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Note < ApplicationRecord
  validates :author_id, presence: true
  validates :title, presence: true

  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

  belongs_to :notebook,
  primary_key: :id,
  foreign_key: :notebook_id,
  class_name: :Notebook,
  optional: true

end
