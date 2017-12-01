# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  notes_id   :integer
#  tag_id     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ApplicationRecord
  belongs_to :notes
  belongs_to :tag
end
