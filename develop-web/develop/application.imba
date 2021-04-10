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

	def setup
		const datastate = self

		window.fetch( "http://{ window:location:hostname }:{ 3000 }/rest-api/", Options ).catch( do|e| Imba.commit @loading = !errorMessageView e )
			.then( do|response| response and response:ok and await response.json or Imba.commit )
			.then( do|resource| Imba.commit @loading = !!resource and not @floors = resource )

		extend tag element
			def application
				datastate

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

	def errorMessageView v
		@message = Messages[ v:message ]
		setTimeout(&, 3000) do Imba.commit @message = null

	def render
		<self>