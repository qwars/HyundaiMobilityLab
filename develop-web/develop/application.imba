
export tag Application < output

	def setup
		const datastate = self
		extend tag element
			def application
				datastate

	def render
		<self>