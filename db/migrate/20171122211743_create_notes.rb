class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :author_id, null: false
      t.integer :notebook_id
      t.string :title, null: false, default: 'Untitled'
      t.string :body
      t.string :bodypreview
      t.timestamps
    end
    add_index :notes, :author_id
  end
end
