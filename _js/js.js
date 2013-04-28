<!--- hide script from old browsers
var gtc = gtc || {};

gtc = {
	settings: {
	spreadsheet_url: "https://docs.google.com/spreadsheet/pub?key=0Ang1OfZPG6vydE1xR2FuQWx4RThCTmk0ZzVIYjZXd2c&output=html",
	win: window,
	item: '#nav ul li'
	},

	init: function() {
		Tabletop.init({ 
			key: gtc.settings.spreadsheet_url,
			callback: gtc.getData,
			simpleSheet:false
		});
	},

	getData: function(data, tabletop) {
		var andrei = tabletop.models['andrei'], renda = tabletop.models['renda'];
		var thisDay, prefix = '.day-';
		
		gtc.bindActions(gtc.settings.win, gtc.settings.item);

		var wkday = [];
		wkday[0]="monday";
		wkday[1]="tuesday";
		wkday[2]="wednesday";
		wkday[3]="thursday";
		wkday[4]="friday";

		for (i=0; i< wkday.length; i++) {
			if ( andrei.elements[i].day == wkday[i] ) {
				var daySelector = prefix + wkday[i];
				gtc.entryMaker($(daySelector + ' .challenger').first(), andrei.elements[i]);
				gtc.entryMaker($(daySelector + ' .challenger').next(), renda.elements[i]);
			}
		}
		
	},

	entryMaker: function(side, person) {
		var depart = side.find('ul li p.info-depart');
		var arrive = side.find('ul li p.info-arrive');
		var emoj = side.find('ul li p.info-emoji');
		var note = side.find('ul li p.info-notes');

		depart.html(person.departure);
		arrive.html(person.arrival);
		emoj.html(person.emoji);
		note.html(person.notes);
	},

	bindActions: function(obj, itm){

		$(obj).on('scroll',function(){
			gtc.highlight($(this));
		});

		$(itm).on('click', function(){
			gtc.jumpLink($(this));
		});
	},

	dayName: function(day) {
		var weekday = [];
		weekday[0]="sunday";
		weekday[1]="monday";
		weekday[2]="tuesday";
		weekday[3]="wednesday";
		weekday[4]="thursday";
		weekday[5]="friday";
		weekday[6]="saturday";

		return weekday[day];
	},

	highlight: function(obj){
		var $win = obj;
		var sectionTop = $('.day h3');

		sectionTop.each(function(){
			var heder = $('ul.info-day li');
			var boxBottom = $(this).position().top + $(this).outerHeight();
			
			if ($win.scrollTop() >= $(this).offset().top - 200) {
				var sectName = $(this);
				
				heder.each(function(){
					if ($(this).html() == sectName.html()) {
						$(this).css({'opacity':1});
					} else {
						$(this).css({'opacity':0.1});
					}
				});
			}
		});
	},

	jumpLink: function(link) {
		var sect = $(link).html();
		var list_top = $("ul.info-day li:contains(" + sect + ")").offset().top;
		var sect_top = $(".day h3:contains(" + sect + ")").offset().top;
		console.log(sect_top);
		if (sect !== "Monday") {
			$('html, body').animate({scrollTop: sect_top},'ease');
		} else {
			$('html, body').animate({scrollTop: 0},'fast');
		}
	}
};

var widthWatcher = function() {
	var ww = $('#width-watcher');
	
	if ( ww.length == 0 ) {
		var wrapper = $('#wrapper');
		var div = $('<div />').attr('id', 'width-watcher');
		var parag = $('<p />');

		parag.html(window.innerWidth + "px");
		parag.appendTo(div);
		div.prependTo(wrapper);

	} else {
		var parag = $('#width-watcher p');
		parag.html(window.innerWidth + "px");
	}

};



$(document).ready(function(){
	var date = new Date();
	var theDay = date.getDay();

	console.log('Today is ' + gtc.dayName(theDay).toUpperCase());

	gtc.init();

	// a window width monitor
	// widthWatcher(); window.onresize = function(){ widthWatcher(); }

});





// stop hiding script -->