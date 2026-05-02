$(window).load(function () {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

$(document).ready(function () {

	/* =============================================
	   VARIABLES GLOBALES
	   ============================================= */
	var selectedSong      = 'hbd.mp3'; // son par défaut
	var countdownInterval = null;

	/* =============================================
	   UTILS — RESPONSIVE
	   ============================================= */
	function isMobile() {
		return $(window).width() < 768;
	}

	function getBalloonW() {
		return isMobile() ? 50 : 100;
	}

	function getTopPos() {
		return isMobile() ? 180 : 240;
	}

	function getSpacing() {
		return Math.min(80, Math.floor(($(window).width() - getBalloonW()) / $('.balloons').length));
	}

	function getStartPos() {
		var total = $('.balloons').length;
		return ($(window).width() / 2) - ((total - 1) * getSpacing()) / 2;
	}

	/* =============================================
	   RESIZE — repositionne les ballons si l'écran change
	   ============================================= */
	$(window).resize(function () {
		var spacing  = getSpacing();
		var startPos = getStartPos();
		$('.balloons').stop().each(function (index) {
			$(this).animate({
				top:  getTopPos(),
				left: startPos + (index * spacing)
			}, 500);
		});
	});

	/* =============================================
	   ÉTAPE 1 — ALLUMER LES AMPOULES
	   ============================================= */
	$('#turn_on').click(function () {
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#play').fadeIn('slow');
		});
	});

	/* =============================================
	   ÉTAPE 2 — POPUP CHOIX DU SON
	   ============================================= */
	$('#play').click(function () {
		// Afficher le modal
		$('#sound-modal').css('display', 'flex');

		// Compte à rebours 5s → son par défaut si aucun choix
		var seconds = 5;
		$('#countdown').text(seconds);
		countdownInterval = setInterval(function () {
			seconds--;
			$('#countdown').text(seconds);
			if (seconds <= 0) {
				clearInterval(countdownInterval);
				$('#sound-modal').css('display', 'none');
				launchSound(selectedSong);
			}
		}, 1000);
	});

	// Choix d'une chanson dans le popup
	$(document).on('click', '.song-choice', function () {
		clearInterval(countdownInterval);
		selectedSong = $(this).data('src');
		$('#sound-modal').css('display', 'none');
		launchSound(selectedSong);
	});

	// Passer → son par défaut
	$('#skip-sound').click(function () {
		clearInterval(countdownInterval);
		$('#sound-modal').css('display', 'none');
		launchSound(selectedSong);
	});

	// Lance le son et enchaîne les animations d'ampoules
	function launchSound(src) {
		var audio = $('.song')[0];
		audio.src = src;
		audio.play();

		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').addClass('peach-after');

		$('#play').fadeOut('slow');
		setTimeout(function () {
			$('#bannar_coming').fadeIn('slow');
		}, 2000);
	}

	/* =============================================
	   ÉTAPE 3 — BANNIÈRE
	   ============================================= */
	$('#bannar_coming').click(function () {
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#balloons_flying').fadeIn('slow');
		});
	});

	/* =============================================
	   ÉTAPE 4 — VOL DES BALLONS
	   ============================================= */
	function rand() {
		return {
			l: Math.max(0, ($(window).width() - getBalloonW()) * Math.random()),
			t: 500 * Math.random()
		};
	}

	function loopOne()   { var r = rand(); $('#b1').animate({ left: r.l, bottom: r.t }, 10000, loopOne); }
	function loopTwo()   { var r = rand(); $('#b2').animate({ left: r.l, bottom: r.t }, 10000, loopTwo); }
	function loopThree() { var r = rand(); $('#b3').animate({ left: r.l, bottom: r.t }, 10000, loopThree); }
	function loopFour()  { var r = rand(); $('#b4').animate({ left: r.l, bottom: r.t }, 10000, loopFour); }
	function loopFive()  { var r = rand(); $('#b5').animate({ left: r.l, bottom: r.t }, 10000, loopFive); }
	function loopSix()   { var r = rand(); $('#b6').animate({ left: r.l, bottom: r.t }, 10000, loopSix); }
	function loopSeven() { var r = rand(); $('#b7').animate({ left: r.l, bottom: r.t }, 10000, loopSeven); }
	function loopEight() { var r = rand(); $('#b8').animate({ left: r.l, bottom: r.t }, 10000, loopEight); }

	$('#balloons_flying').click(function () {
		$('.balloon-border').animate({ top: -500 }, 8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');

		// Initiales visibles dès l'envol
		$('.balloons h2').fadeIn(1500);

		loopOne(); loopTwo(); loopThree(); loopFour();
		loopFive(); loopSix(); loopSeven(); loopEight();

		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#cake_fadein').fadeIn('slow');
		});
	});

	/* =============================================
	   ÉTAPE 5 — GÂTEAU
	   ============================================= */
	$('#cake_fadein').click(function () {
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#light_candle').fadeIn('slow');
		});
	});

	/* =============================================
	   ÉTAPE 6 — BOUGIES
	   ============================================= */
	$('#light_candle').click(function () {
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function () {
			$('#wish_message').fadeIn('slow');
		});
	});

	/* =============================================
	   ÉTAPE 7 — JOYEUX ANNIVERSAIRE (ballons en ligne)
	   ============================================= */
	$('#wish_message').click(function () {
		var spacing  = getSpacing();
		var startPos = getStartPos();
		var topPos   = getTopPos();

		$('.balloons').stop();

		// Chaque ballon arrive en cascade avec 150ms de décalage
		$('.balloons').each(function (index) {
			var $b    = $(this);
			var newId = $b.attr('id') + $b.attr('id').slice(-1);
			$b.attr('id', newId);
			setTimeout(function () {
				$b.animate({ top: topPos, left: startPos + (index * spacing) }, 800);
			}, index * 150);
		});

		var totalDelay = $('.balloons').length * 150 + 800;

		setTimeout(function () {
			$('.balloons').css('opacity', '0.9');
			$('.balloons h2').css('display', 'block');
		}, totalDelay);

		$(this).fadeOut('slow').delay(totalDelay + 1500).promise().done(function () {
			$('#story').fadeIn('slow');
		});
	});

	/* =============================================
	   ÉTAPE 8 — MESSAGE
	   ============================================= */
	$('#story').click(function () {
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function () {
			$('.message').fadeIn('slow');
		});

		function msgLoop(i) {
			$("p:nth-child(" + i + ")").fadeOut('slow').delay(1000).promise().done(function () {
				i = i + 1;
				$("p:nth-child(" + i + ")").fadeIn('slow').delay(3000);
				if (i == 13) {
					$("p:nth-child(12)").fadeOut('slow').promise().done(function () {
						$('.cake').fadeIn('fast');
						$('#cake_cut').fadeIn('slow');
					});
				} else {
					msgLoop(i);
				}
			});
		}

		msgLoop(0);
	});

	/* =============================================
	   ÉTAPE 9 — COUPER LE GÂTEAU
	   ============================================= */
	$('#cake_cut').click(function () {
		$(this).fadeOut('fast');
		$('.cake').addClass('is-cut');
		$('.fuego').fadeOut('slow');

		// Ballons s'envolent et disparaissent en cascade
		$('.balloons').each(function (index) {
			var $b = $(this);
			setTimeout(function () {
				$b.stop(true).animate({ top: '-=600', opacity: 0 }, 1200, 'swing');
			}, index * 80);
		});

		// Afficher "Miam" + bouton reload
		setTimeout(function () {
			$('.cake-cover').append('<h1 class="baked" style="display:none;">Miam ! 🍰</h1>');
			$('.baked').fadeIn('slow');
			$('#reload').fadeIn('slow');
		}, 1400);

		// Confettis
		setTimeout(function () {
			launchConfetti();
		}, 1500);
	});

	/* =============================================
	   CONFETTIS
	   ============================================= */
	function launchConfetti() {
		var colors = ['#F2B300','#0719D4','#D14D39','#8FAD00','#8377E4','#99C96A','#20CFB4','#f59352','#FF69B4','#00CED1'];
		var container = $('<div id="confetti-container"></div>').css({
			position: 'fixed', top: 0, left: 0,
			width: '100%', height: '100%',
			pointerEvents: 'none', zIndex: 9998, overflow: 'hidden'
		});
		$('body').append(container);
		for (var i = 0; i < 120; i++) {
			spawnConfetto(container, colors, i * 30);
		}
		setTimeout(function () {
			$('#confetti-container').fadeOut(1000, function () { $(this).remove(); });
		}, 8000);
	}

	function spawnConfetto(container, colors, delay) {
		var color    = colors[Math.floor(Math.random() * colors.length)];
		var size     = Math.random() * 10 + 6;
		var startX   = Math.random() * $(window).width();
		var drift    = (Math.random() - 0.5) * 200;
		var duration = Math.random() * 2000 + 2500;
		var isRect   = Math.random() > 0.5;
		var $c = $('<div></div>').css({
			position:        'absolute',
			top:             -size,
			left:            startX,
			width:           size,
			height:          isRect ? size * 0.4 : size,
			borderRadius:    isRect ? '2px' : '50%',
			backgroundColor: color,
			opacity:         Math.random() * 0.6 + 0.7,
			transform:       'rotate(' + (Math.random() * 360) + 'deg)'
		});
		container.append($c);
		setTimeout(function () {
			$c.animate({
				top:     $(window).height() + size,
				left:    '+=' + drift,
				opacity: 0
			}, {
				duration: duration,
				easing:   'linear',
				complete: function () { $c.remove(); }
			});
		}, delay);
	}

	/* =============================================
	   RELOAD
	   ============================================= */
	$('#reload').click(function () {
		window.location.reload();
	});

});