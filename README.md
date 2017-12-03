# NeverBlank

NeverBlank is a full-stack web application that is a faithful clone of the popular organizational app Evernote.  It is built on a Ruby on Rails backend, PostgreSQL database, and React with a Redux architecture frontend.

Users have the ability to create `notes` and organize them via `notebook` and `tags`.  `Notes` are saved in the database with rich text formatting.

## Features Overview
*	Notes
	* Users have the ability to create `notes` with rich formatted text.
*	Notebooks
	* Users have the ability to organize `notes` into `notebooks`.
*	Tags
	* Users have the ability to organize their `notes` with `tags`.
*	Rich Text
	*	Users can save rich formatted text into their `notes`.


## Implementation Details


### Notes


A user has the ability to create/save/edit notes using the `React Quill` rich text editor.  Each note contains a `id`, `body`, `bodypreview`, `title`, `created_at` and `updated_at`. Notes are stored in the `body` as raw `HTML` tagged text and a stripped preview of that is stored in the `bodypreview` of the note.  Each note on creation is stored in a `notebook`.

### Notebooks
Users have the ability to organize their `notes` in `notebooks`.  Upon account creation, a `default_notebook` is generated for the user.  All `notes` are stored in here unless a user specifically creates a new `notebook` and generates `notes` in that specific notebook.  A `notebook` contains a `author_id`, `title`, `lock` (status that is given to a `default_notebook` to prevent deletion), `created_at` and `updated_at`.  Users have the ability to edit/delete a `notebook` from within a modal.

### Tags
Users have the ability to further organize their `notes` via `tags`.  `tags` have a `name` and are associated to `notes` by a `taggings` joins table.


### Rich text Editor

NeverBlank utlizes React Quill to allow the user to format and save rich formatted text.  The rich formatted text is saved into a `note` as html tagged text.

## Future Enhancements

### "Sort by" view for `notes` and `notebooks`
Users will be able to sort their `notes`/`notebooks` view via catagories such as `created_by`, `updated`, `by_title`, etc.
### Search
Users will be able to search through `notes` and `notebooks`.
### Reminders
Users will be able to add reminders which will be linked to `notes`.

