// A $( document ).ready() block.

//this is a function that executes once the whole page loads
$( document ).ready(function() {
    /**
     * Slick Slider Initialization
     * */
    $('.slider').slick({
        slidesToShow: 2,
        variableWidth: true,
        arrows : true,
        speed: 400,
        //even though we already declared a width, we still need to declare a width inside of the slick function so that it does
        //not stretch out the width
    });

    //this is the slider for the news in the footer
    $('#bottom-slider').slick({
        arrows : false,
        dots : true,
        fade: true,
        autoplay: true,
        pauseOnHover: false, //doesn't pause on hover. Slick may have this on default which causes the logo to change on hover so make it false.
        pauseOnFocus: false,
        appendDots: $("#bottom-slider-controls")
    });


    /**
    * Slick Slider AutoPlay Controls
    * */
   //helper functio that finds a slider by its ID
    function findSlider($element) {
        let sliderID = $element.attr('aria-controls');
        return $('#' + sliderID);
    }

    //passes in all elements under playpause class and uses the field ".click" and it will call a function
    $('.footer .playpause-btn').click(function () {
        //inside the function, it will call findSlider on the current object (slider). Then it will find the ID associated with that slider and 
        //on the current element, it will toggle the play pause on the slider (connects the playpause btn with slider)
        let $slider = findSlider($(this));
        $(this).togglePlayPause($slider);
    });

  
    //Toggle Play/Pause Button
    $.fn.togglePlayPause = function ($slider) {
        //any variable or selector will have a dollar sign next to it 
        let $button = $(this),
        //setting the button's attribute "data-paused" to be true
            isPaused = $button.attr('data-paused') === 'true',
            //ternary operator. Sets newState to be false if isPaused is true and true if isPaused is false
            newState = isPaused ? 'false' : 'true';
            //checks if the slider is possibly null (!== checks if it's equal AND if it's of the same type)
        if (typeof $slider !== 'undefined') {
            if ($slider.hasClass('slick-initialized')) {
                //a class that is already in the slick slider but needs to be checked if it's there to continue
                // console.log($slider.slick('getSlick'));
 
                if (isPaused) {/*This indicates that the SYMBOL is on paused */
                    $slider.slick('slickPlay');
                    //if isPaused is true (paused button should be there), will add pause class and remove play
                    $button.addClass('pause').removeClass('play');
                } else {
                    $slider.slick('slickPause');
                    //if isPaused is false, pause button should not be there and will add play class and adds pause class
                    $button.addClass('play').removeClass('pause');
                }
            }
        }
        //update button
        $button.attr({
            'data-paused': newState
        });
    }

    /**
     * CODE FOR THE LEGACY SLIDER (WORKS)
     * */
    var legacy_button_paused = false;
    //variable that decides the status of pause button (default will be false)
    var legacy_slides = document.querySelectorAll('.animated-photos-section .animate-picture');


    //querySelector will select all elements in the picturehover class

    //very similar to a lambda function in Java. legacy_reset holds a function that passes in parameter "slides" which can be assumed to be
    //some list, and will do a for each loop on it, each element being a slide. we access the classList to remove the cl "active"
    //this is an anonymous class (has no name). Only used when the function has a one time use
    legacy_reset = (slides) => {
        slides.forEach((slide) => {
            //removes the class "active"
            slide.classList.remove('active');
        });
    };
    //if legacy_button_status is TRUE, it will be paused. if it is FALSE, it will not be paused

    //legacy_timer is a variable that holds a function. setInterval() repeatedly  executes a function at a given time. In this case,
    //it performs this function repeatedly every 5 seconds
    var legacy_timer = setInterval(() => {
        // .forEach is like a for each loop. It iterates through each element in the list (legacy slides)
        //if the legacy_button_paused is TRUE, then it will iterate through all the elements in legacy_slides
        if(!legacy_button_paused){//if legacy_button_paused is FALSE, then it will play
            legacy_slides.forEach((slide) => {
                //for each slide, it will create a list called slideClasses that contains the list of html classes under the element
                const slideClasses = slide.classList;
                //the if statements will control which picture is in the front. If the element currently has "picture1" class, it will remove that class and add picture2 instead. This removes any elements of CSS
                //associated with "picture1" and add "picture2" elements
                if (slideClasses.contains('picture1')) {
                    //the classList holds the lists of HTML CLASSES on an element
                    slideClasses.remove('picture1');
                    slideClasses.add('picture2');
                    //if the slide contains picture2, it will remove it from the front and add picture 3 to the front
                } else if (slideClasses.contains('picture2')) {
                    slideClasses.remove('picture2');
                    slideClasses.add('picture3');
                } else if (slideClasses.contains('picture3')) {
                    slideClasses.remove('picture3');
                    slideClasses.add('picture1');
                    document.querySelector('.animated-photos-description.active').classList.remove('active');
                    //the specific slide's current DESC
                    document.querySelector('.' + slide.dataset.desc).classList.add('active');
                }
            });


        }
    }, 5000);
    //passes in an amount of time the function will occur each interval
    //iterates through slides again with for each loop
    legacy_slides.forEach((slide) => {
        //whenever the slide is clicked on, it will stop propogation (meaning it will stop the event from occuring repeatedly)
        slide.onclick = (e) => {
            //prevents propogation of the current event happening
            e.stopPropagation();
            //resets slides to first slide?
            legacy_reset(legacy_slides);
        };
    });

    var legacy_paused_btn = document.getElementById('button');//gets the HTML element by a specified ID
    legacy_button_paused = false; //redeclaring the legacy_button_paused so that we can use its status for the  (the boolean might be changed due to its use in the first if statement)

    //the preventDefault function is used to prevent a "default" function from occurring. I think this is here so that the functionality of the button
    //can be removed so that we can just remove the "play" "pause" classes to change the symbol instead 
    legacy_paused_btn.addEventListener('click', (e) => {
        e.preventDefault();
    //Determines if the slider is playing when logo is on paused or play
    //if the legacy button is on the PAUSED logo (true), the animation must be playing. This means the paused status should be false, and it will remove the PLAY class and add PAUSE from the button,
    //element to display the PAUSE button when playing
        if (legacy_button_paused) {
            legacy_button_paused = false; //this change of boolean determines if the slideshow is playing. if it's false, that means it's not paused
            legacy_paused_btn.classList.remove('play'); //removes the play class from the button
            legacy_paused_btn.classList.add('pause'); //adds the pause
        } else {
            //else if the pause button is FALSE, it should be the play button
            legacy_button_paused = true; //boolean for if the slideshow is paused and in this case it is
            legacy_paused_btn.classList.remove('pause'); //removes the pause logo
            legacy_paused_btn.classList.add('play'); //adds the play logo
        }
    });



});


