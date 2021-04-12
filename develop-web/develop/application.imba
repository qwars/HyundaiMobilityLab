Date:prototype:daysInMonth = do Date.new( this.getYear, ( this.getMonth + 1), 0).getDate
Date:prototype:rotateMont = do this.getMonth * 30
Date:prototype:rotateDate = do ( this.getDate - 1 ) * 11.7

const Messages = require "./messages-statuses.json"

const Options = {}

export tag Application < output
	prop loading default: true
	prop floor
	prop floors
	prop room
	prop rooms
	prop reservation default: {}
	prop reservations

	def setup
		const datastate = self
		Options:url = do|path| "http://{ window:location:hostname }:{ 3000 }/rest-api/{ path or '' }"

		@loading = window.fetch( Options.url, Options ).catch( do|e| Imba.commit @loading = not announcementCompletion e )
			.then( do|response| response and response:ok and await response.json or Imba.commit )
			.then( do|resource| Imba.commit @loading = !@floors = resource )

		extend tag element
			def application
				datastate

	def floor= v
		isActiveCalendar = room = undefined
		unless v then @reservations = @floor = v
		else
			@floor = v
			@loading = window.fetch(
				Options.url( "{v:id}" ),
				Options
				)
				.catch( do|e| Imba.commit @loading = not errorCompletion e )
				.then( do|response| response and response:ok and await response.json or Imba.commit )
				.then( do|resource| Imba.commit @loading = !!resource and not @rooms = resource )
			@reservations = window.fetch(
				Options.url( "reservation/{v:id}" ),
				Options
				)
				.catch( do|e| Imba.commit @reservations = not errorCompletion e )
				.then( do|response| response and response:ok and await response.json or Imba.commit )
				.then( do|resource| Imba.commit @reservations = resource )

	def room= v
		if @room = v then isActiveCalendar = true
		unless v then @reservations = v
		else @reservations = window.fetch(
			Options.url( "reservation/{v:id}" ),
			Options
			)
			.catch( do|e| Imba.commit @reservations = not errorCompletion e )
			.then( do|response| response and response:ok and await response.json or Imba.commit )
			.then( do|resource| Imba.commit @reservations = resource )

	def isActiveCalendar
		@isActiveCalendar

	def isActiveCalendar= v
		@isActiveCalendar = v

	def internalComment
		@internalComment

	def internalComment= v
		@internalComment = v

	def beginning= v
		@reservation:beginning = v

	def beginning
		@reservation:beginning or Date.new

	def completion= v
		@reservation:completion = v

	def completion
		@reservation:completion or Date.new

	def message
		@message

	def message= v
		@message = v
		setTimeout(&, 3000) do Imba.commit @message = null

	def errorCompletion e
		message = Object.assign e,
			name:  'invalid',
			message: Messages[ e:message ] or e:message

	def warningCompletion e
		message = Object.assign e,
			name:  'warning',
			message: Messages[ e:message ] or e:message

	def announcementCompletion e
		message = Object.assign e,
			name:  'warning',
			message: Messages[ e:message ] or e:message


	def render
		<self>