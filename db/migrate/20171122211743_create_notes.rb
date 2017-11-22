class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :author_id
      t.integer :notebook_id
      t.string :title
      t.string :body

      t.timestamps
    end
  end
end
