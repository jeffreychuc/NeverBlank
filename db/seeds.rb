# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo = User.create(email: 'demo@appacademy.io', password: 'password')
demo_note = Note.create(author_id: demo.id, body: 'note with no title')
demo_note2 = Note.create(author_id: demo.id)
demo_note3 = Note.create(author_id: demo.id, title: 'note with body and title', body: 'note with no title')
demo_notebook = Notebook.create(author_id: demo.id, title:'notebook with no notes')
demo_notebook1 = Notebook.create(author_id: demo.id, title:'notebook with notes')
demo_note4 = Note.create(author_id: demo.id, title: 'note in a notebook', body: 'note in a notebook', notebook_id: demo_notebook1.id)
demo_notebook2 = Notebook.create(author_id: demo.id, title:'notebook with many notes')
demo_note5 = Note.create(author_id: demo.id, title: '1', body: '1', notebook_id: demo_notebook2.id)
demo_note6 = Note.create(author_id: demo.id, title: '2', body: '2', notebook_id: demo_notebook2.id)
demo_note7 = Note.create(author_id: demo.id, title: '3', body: '3', notebook_id: demo_notebook2.id)
