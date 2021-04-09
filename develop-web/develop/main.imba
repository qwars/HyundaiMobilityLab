# https://www.image-map.net/

const Hotel = require './images/hotel.png'

const Calendar = require './images/calendar.png'

const Floors = require './floors.json'

Floors[1]:plan = require './images/Floor1.png'
Floors[2]:plan = require './images/Floor2.png'
Floors[3]:plan = require './images/Floor3.png'
Floors[4]:plan = require './images/Floor4.png'
Floors[5]:plan = require './images/Floor5.png'

tag AsidePage < aside
	def render
		<self>

tag ArticlePage < article

	def selectFloor item
		@floor = item

	def selected
		@room or @floor

	def render
		<self>
			if selected then <h2>
				<span> selected:name
				<dfn> selected:description
				<aside>
					<kbd> <img src=Calendar>
					<div.date-state-calendar>
						<span> "Заезд"
						<div.calendar>
							<ol> for item, i in Array(31)
								<li css:transform="rotate({ i * 11.7 }deg)">
							<ol> for item, i in Array(12)
								<li css:transform="rotate({ i * 30 }deg)">
						<span> "Выезд"
						<div.calendar>
							<ol> for item, i in Array(31)
								<li css:transform="rotate({ i * 11.7 }deg)">
							<ol> for item, i in Array(12)
								<li css:transform="rotate({ i * 30 }deg)">

			if selected then <div>
				<img src=selected:plan>
				if @rooms then <svg:svg xmlns="http://www.w3.org/2000/svg">
					<svg:g viewBox="0 0 490 280"> for item in @rooms
						<svg:polygon :click.selectFloor( item ) points=item:points>

			<div>
				<img src=Hotel>
				<svg:svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 280">
					<svg:g viewBox="0 0 490 280"> for item in Floors
						<svg:polygon :click.selectFloor( item ) points=item:points>


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