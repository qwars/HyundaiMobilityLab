# https://www.image-map.net/

const Hotel = require './images/hotel.png'

const Calendar = require './images/calendar.png'
const Skull = require './images/skull.png'

tag AsidePage < aside
	def render
		<self>
			<em.state-messages
				.{ application.message:name }
				html=application.message:message
				> if application.message

tag ArticlePage < article

	def selectFloor item
		application.floor = item

	def selectRoom item
		application.room = item

	def selected
		application.room or application.floor

	def selectedplan
		application.room and application.room:plan or application.floor:plan

	def clearSelected
		if application.room then application.room = undefined
		else application.floor = undefined
		application.isActiveCalendar = false

	def toggleCalendar
		application.isActiveCalendar = !application.isActiveCalendar
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
				if selected:isActive or true then <aside>
					<kbd :click.clearSelected> <img src=Skull>
					<kbd :click.toggleCalendar> <img src=Calendar>
					<div.date-state-calendar .hidden=!application.isActiveCalendar>
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
				<img@plan src=selectedplan>
				if application.rooms then <svg:svg xmlns="http://www.w3.org/2000/svg"
					width=@plan.dom:offsetWidth
					height=@plan.dom:offsetHeight
					viewBox="0 0  { @plan.dom:naturalWidth } { @plan.dom:naturalHeight }">
					<svg:g> for item in application.rooms
						<svg:polygon :click.selectRoom( item ) points=item:points>

			<div>
				<img src=Hotel>
				<svg:svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 280">
					<svg:g viewBox="0 0 490 280"> for item in application.floors
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

	def selected
		application.room or application.floor

	def inputComment e
		application.internalComment = e.target.textContent

	def pasteAsPlainText e
		if e.event:clipboardData then document.execCommand 'insertText', false , ( e.event:originalEvent || e.event ):clipboardData.getData('text/plain');
		else if window:clipboardData then document:selection:createRange.pasteHTML window:clipboardData.getData 'Text'

	def render
		<self>
			<aside>
			unless application.isActiveCalendar then <section>
			else <section>
				unless selected:pid then <h3>
					<span> "Бронируем весь "
					<q> selected:name
				else <h3> "Бронируем номер"
				<dl>
					<dt> <span> "Заезд"
					<dd> <time> beginningDate
					<dt> <span> "Выезд"
					<dd> <time> completionDate
				<div>
					<strong> "Комментарий, пожалуйста: "
					<p contenteditable=true data-placeholder='Здесь можно вылить все, что накипело! Приветствуется, для истории'
						:paste.prevent.pasteAsPlainText
						:input.silence.inputComment > application.internalComment
				if selected and selected:attributes:length
					<hr> <legend> "Состояние, оснощение { application.room ? 'номера' : 'этажа' }"
					<dl> for item in selected:attributes
						if item[2] then <dt> <img src=item[1] alt=item[0] title=item[1]>
						else
							<dt> item[0]
							<dd html=item[1]>

export tag Sketch < main
	@classes = []

	def render
		<self .loading=application.loading>
			if application.loading then <.loading>
			<NavigationPage route="/:collection*/*:document*/*:field*">
			<ArticlePage route="/:collection*/*:document*/*:field*">
			<AsidePage route="/:collection*/*:document*/*:field*">