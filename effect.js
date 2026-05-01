$(window).load(function () {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

$('document').ready(function () {
	var vw;

	$(window).resize(function () {
    vw = $(window).width() / 2;
    var balloons = $('.balloons');
    var totalBalloons = balloons.length;
    var balloonW = $(window).width() < 768 ? 50 : 100;
    var spacing  = Math.min(80, Math.floor(($(window).width() - balloonW) / totalBalloons));
    var startPos = vw - ((totalBalloons - 1) * spacing) / 2;

    balloons.stop();
    balloons.each(function(index) {
        $(this).animate({ top: 240, left: startPos + (index * spacing) }, 500);
    });
});

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

	$('#play').click(function () {
		var audio = $('.song')[0];
		audio.play();
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(2000).promise().done(function () {
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function () {
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopOne()   { var r = rand(); $('#b1').animate({ left: r.l, bottom: r.t }, 10000, loopOne); }
	function loopTwo()   { var r = rand(); $('#b2').animate({ left: r.l, bottom: r.t }, 10000, loopTwo); }
	function loopThree() { var r = rand(); $('#b3').animate({ left: r.l, bottom: r.t }, 10000, loopThree); }
	function loopFour()  { var r = rand(); $('#b4').animate({ left: r.l, bottom: r.t }, 10000, loopFour); }
	function loopFive()  { var r = rand(); $('#b5').animate({ left: r.l, bottom: r.t }, 10000, loopFive); }
	function loopSix()   { var r = rand(); $('#b6').animate({ left: r.l, bottom: r.t }, 10000, loopSix); }
	function loopSeven() { var r = rand(); $('#b7').animate({ left: r.l, bottom: r.t }, 10000, loopSeven); }
	function loopEight() { var r = rand(); $('#b8').animate({ left: r.l, bottom: r.t }, 10000, loopEight); }

	
// rand() strictement dans les limites de l'écran
function rand() {
    var balloonW = $(window).width() < 768 ? 50 : 100;
    var balloonH = $(window).width() < 768 ? 92 : 183;
    return {
        l: Math.max(0, ($(window).width()  - balloonW) * Math.random()),
        t: Math.max(0, ($(window).height() - balloonH) * 0.7 * Math.random())
    };
}
	$('#balloons_flying').click(function () {
		$('.balloon-border').animate({ top: -500 }, 8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');
		loopOne(); loopTwo(); loopThree(); loopFour();
		loopFive(); loopSix(); loopSeven(); loopEight();

		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#cake_fadein').fadeIn('slow');
		});
	});

	$('#cake_fadein').click(function () {
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function () {
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function () {
			$('#wish_message').fadeIn('slow');
		});
	});

$('#wish_message').click(function () {
    vw = $(window).width() / 2;
    var balloons = $('.balloons');
    var totalBalloons = balloons.length;
    var balloonW = $(window).width() < 768 ? 50 : 100;
    var spacing  = Math.min(80, Math.floor(($(window).width() - balloonW) / totalBalloons));
    var startPos = vw - ((totalBalloons - 1) * spacing) / 2;

    balloons.stop();

    // Chaque ballon arrive avec un délai progressif → plus naturel
    balloons.each(function(index) {
        var $b    = $(this);
        var newId = $b.attr('id') + $b.attr('id').slice(-1);
        $b.attr('id', newId);

        setTimeout(function() {
            $b.animate({ 
                top:  $(window).height() < 600 ? 180 : 240,
                left: startPos + (index * spacing) 
            }, 1200); // 1200ms au lieu de 500ms
        }, index * 200); // 200ms de décalage entre chaque ballon
    });

    // Texte apparaît après que tous les ballons soient en place
    var totalDelay = totalBalloons * 200 + 1200;
    setTimeout(function() {
        $('.balloons').css('opacity', '0.9');
        $('.balloons h2').fadeIn(2000);
    }, totalDelay);

    $(this).fadeOut('slow').delay(totalDelay + 2000).promise().done(function () {
        $('#story').fadeIn('slow');
    });
});

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

	$('#cake_cut').click(function () {
		var $btn = $(this);

		// 1. Masquer le bouton
		$btn.fadeOut('fast');

		// 2. Déclencher l'animation de coupe
		$('.cake').addClass('is-cut');

		// 3. Éteindre les bougies
		$('.fuego').fadeOut('slow');

		// 4. Ballons montent et disparaissent
		$('.balloons').each(function(index) {
			var delay = index * 80; // décalage en cascade pour chaque ballon
			var $b = $(this);
			setTimeout(function() {
				$b.stop(true).animate({
					top: '-=600',
					opacity: 0
				}, 1200, 'swing');
			}, delay);
		});

		// 5. Après la coupe (1.4s) → afficher "Miam"
		setTimeout(function () {
			$('.cake-cover').append('<h1 class="baked" style="display:none;">Miam ! 🍰</h1>');
			$('.baked').fadeIn('slow');
			$('#reload').fadeIn('slow');
		}, 1400);

		// 6. Après que les ballons soient partis (1.5s) → lancer les confettis
		setTimeout(function () {
			launchConfetti();
		}, 1500);
	});

	function launchConfetti() {
		var colors = ['#F2B300','#0719D4','#D14D39','#8FAD00','#8377E4','#99C96A','#20CFB4','#f59352','#FF69B4','#00CED1'];
		var container = $('<div id="confetti-container"></div>').css({
			position: 'fixed',
			top: 0, left: 0,
			width: '100%', height: '100%',
			pointerEvents: 'none',
			zIndex: 9998,
			overflow: 'hidden'
		});
		$('body').append(container);

		var total = 120;
		for (var i = 0; i < total; i++) {
			spawnConfetto(container, colors, i * 30);
		}

		// Nettoyer après 8 secondes
		setTimeout(function() {
			$('#confetti-container').fadeOut(1000, function() { $(this).remove(); });
		}, 8000);
	}

	function spawnConfetto(container, colors, delay) {
		var color  = colors[Math.floor(Math.random() * colors.length)];
		var size   = Math.random() * 10 + 6;           // 6–16px
		var startX = Math.random() * $(window).width();
		var drift  = (Math.random() - 0.5) * 200;      // dérive horizontale
		var duration = Math.random() * 2000 + 2500;    // 2.5s–4.5s
		var isRect = Math.random() > 0.5;              // carré ou cercle

		var $c = $('<div></div>').css({
			position:  'absolute',
			top:       -size,
			left:      startX,
			width:     size,
			height:    isRect ? size * 0.4 : size,
			borderRadius: isRect ? '2px' : '50%',
			backgroundColor: color,
			opacity:   Math.random() * 0.6 + 0.7,
			transform: 'rotate(' + (Math.random() * 360) + 'deg)'
		});

		container.append($c);

		setTimeout(function() {
			$c.animate({
				top:    $(window).height() + size,
				left:   '+=' + drift,
				opacity: 0
			}, {
				duration: duration,
				easing:   'linear',
				complete: function() { $c.remove(); }
			});
		}, delay);
	}
	$('#reload').click(function(){
		window.location.reload();
	});
});