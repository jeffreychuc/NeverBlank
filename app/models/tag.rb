# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string
#  author_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord

  has_many :taggings
  has_many :notes, through: :taggings

  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

end
