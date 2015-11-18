

  (function() {

            var documentElem = $(document),
                nav = $('nav'),
                lastScrollTop = 0;

            documentElem.on('scroll', function() {
                var currentScrollTop = $(this).scrollTop();

                //scroll down
                if ( currentScrollTop > lastScrollTop ) nav.addClass('hidden');
                //scroll up
                else nav.removeClass('hidden');

                lastScrollTop = currentScrollTop;
            });



        })();
