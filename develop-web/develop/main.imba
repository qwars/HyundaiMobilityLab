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
			<em.state-messages
				.warning=false
				.invalid=false
				.announcement=true
				html=application.message
				> if application.message

tag ArticlePage < article

	def selectFloor item
		application.floor = item

	def selectRoom item
		application.room = item

	def selected
		application.room or application.floor

	def toggleCalendar
		@isActiveCalendar = !@isActiveCalendar
		application.beginning = Date.new
		application.completion = Date.new

	def selectDayBeginning i
		if i > application.beginning.daysInMonth then i = application.beginning.daysInMonth
		application.beginning = Date.new application.beginning.setDate i

	def selectMonthBeginning i
		if application.beginning.getMonth != i then application.beginning.setDate 1
		application.beginning = Date.new application.beginning.setMonth i

	def selectDayCompletion i
		if i > application.completion.daysInMonth then i = application.completion.daysInMonth
		application.completion = Date.new application.completion.setDate i

	def selectMonthCompletion i
		if application.completion.getMonth != i then application.completion.setDate 1
		application.completion = Date.new application.completion.setMonth i

	def render
		<self>
			if selected then <h2>
				<span> selected:name
				<dfn> selected:description
				if selected:isActive then <aside>
					<kbd :click.toggleCalendar> <img src=Calendar>
					<div.date-state-calendar .hidden=!@isActiveCalendar>
						<span> "Заезд"
						<div.calendar>
							<ol css:transform="rotate( { -application.beginning.rotateDate }deg )"> for item, i in Array(31)
								<li css:transform="rotate({ i * 11.7 }deg)" :click.selectDayBeginning(i + 1)>
							<ol css:transform="rotate( { -application.beginning.rotateMont }deg )"> for item, i in Array(12)
								<li css:transform="rotate({ i * 30 }deg)" :click.selectMonthBeginning(i)>
						<span> "Выезд"
						<div.calendar>
							<ol css:transform="rotate( { -application.completion.rotateDate }deg )"> for item, i in Array(31)
								<li css:transform="rotate({ i * 11.7 }deg)" :click.selectDayCompletion(i + 1)>
							<ol css:transform="rotate( { -application.completion.rotateMont }deg )"> for item, i in Array(12)
								<li css:transform="rotate({ i * 30 }deg)" :click.selectMonthCompletion(i)>
				else
					if application.room then <aside> <em> "Там живет грязный варвар, желаете присоедениться?"
					else <aside> <em> "Глубочайшее извенямба, но все номера заняты."

			if selected then <div>
				<img src=selected:plan>
				if application.rooms then <svg:svg xmlns="http://www.w3.org/2000/svg">
					<svg:g viewBox="0 0 490 280"> for item in application.rooms
						<svg:polygon :click.selectRoom( item ) points=item:points>

			<div>
				<img src=Hotel>
				<svg:svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 280">
					<svg:g viewBox="0 0 490 280"> for item in Floors
						<svg:polygon :click.selectFloor( item ) points=item:points>


tag NavigationPage < nav

	def completionDate
		application.completion.toLocaleDateString 'ru',
			month: 'long'
			day: 'numeric'

	def beginningDate
		application.beginning.toLocaleDateString 'ru',
			month: 'long'
			day: 'numeric'

	def render
		<self>
			<aside>
			<section>
				beginningDate
				completionDate

export tag Sketch < main
	@classes = []

	def render
		<self .loading=application.loading>
			if application.loading then <.loading>
			<NavigationPage route="/:collection*/*:document*/*:field*">
			<ArticlePage route="/:collection*/*:document*/*:field*">
			<AsidePage route="/:collection*/*:document*/*:field*">