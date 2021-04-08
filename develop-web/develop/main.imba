
const Hotel = require './images/hotel.png'

tag AsidePage < aside
	def render
		<self>

tag ArticlePage < article

	def render
		<self>
			<img src=Hotel>

tag NavigationPage < nav

	def render
		<self>
			<aside>
			<ul>


export tag Sketch < main
	@classes = []

	def render
		<self>
			<NavigationPage route="/:collection*/*:document*/*:field*">
			<ArticlePage route="/:collection*/*:document*/*:field*">
			<AsidePage route="/:collection*/*:document*/*:field*">