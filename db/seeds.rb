# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# # https://stackoverflow.com/questions/6985222/how-to-clear-whole-database-in-rails-seeds-rb
ActiveRecord::Base.establish_connection
ActiveRecord::Base.connection.tables.each do |table|
  next if table == 'schema_migrations'

  # MySQL and PostgreSQL
  ActiveRecord::Base.connection.execute("TRUNCATE #{table}")

  # SQLite
  # ActiveRecord::Base.connection.execute("DELETE FROM #{table}")
end
ActiveRecord::Base.connection.close

demo = User.create({email: 'demo@appacademy.io', password: 'password'})
default_notebook = Notebook.create({author_id: demo.id, title:'First Notebook', lock: true})
demo.default_notebook = default_notebook.id
demo.save
demo_note = Note.create({author_id: demo.id, body: '<p>note with no title</p>', bodypreview: '1',notebook_id: default_notebook.id})
demo_note2 = Note.create({author_id: demo.id, bodypreview: '2',notebook_id: default_notebook.id})
demo_note3 = Note.create({author_id: demo.id, title: 'note with body and title', body: '<p>note with no title</p>', bodypreview: 'note with no title', notebook_id: default_notebook.id})
demo_notebook = Notebook.create({author_id: demo.id, title:'notebook with no notes'})
demo_notebook1 = Notebook.create({author_id: demo.id, title:'notebook with notes'})
demo_note4 = Note.create({author_id: demo.id, title: 'note in a notebook', body: '<p>note in a notebook</p>', bodypreview: 'note in a notebook', notebook_id: demo_notebook1.id})
demo_notebook2 = Notebook.create({author_id: demo.id, title:'notebook with many notes'})

demo_note5 = Note.create({author_id: demo.id, title: '1', body: '1',bodypreview: '1', notebook_id: demo_notebook2.id})
demo_note6 = Note.create({author_id: demo.id, title: '2', body: '2',bodypreview: '2', notebook_id: demo_notebook2.id})
demo_note7 = Note.create({author_id: demo.id, title: '3', body: '3',bodypreview: '3', notebook_id: demo_notebook2.id})

tag1 = Tag.create!({name: 'tag1', author_id: demo.id})
tag2 = Tag.create!({name: 'tag2', author_id: demo.id})
tag3 = Tag.create!({name: 'tag3', author_id: demo.id})

tagging1 = Tagging.create!({note_id: demo_note5.id, tag_id: tag1.id})
tagging2 = Tagging.create!({note_id: demo_note5.id, tag_id: tag2.id})
tagging3 = Tagging.create!({note_id: demo_note5.id, tag_id: tag3.id})
