class CreateTaggings < ActiveRecord::Migration[5.1]
  def change
    create_table :taggings do |t|
      t.integer :note_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
