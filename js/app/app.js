/**
 * Created by BastisMacBook on 29/12/16.
 */
var app = (function () {
    
    //console.log("outer:" + $(window).outerHeight());
    //console.log("height:" + $(window).height());
    //height of sections
    
    var $appHeight = $(window).height();
    $("section").css("height",$appHeight);
    $("#background_image").css("height",$appHeight + 200);
    $("#background_image2").css("height",$appHeight + 200 );
    $("#background_image2").css("top",$appHeight + 200 );
    
    $('#main_nav').on('click', 'a', function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 2000);
        menu.toggleClass("hidden");
        burger1.toggleClass('burger_nav_expand_1');
        burger2.toggleClass('burger_nav_expand_2');
    });
    
    var menu = $("#menu"),
        burgerMenu = $('#burger_menu'),
        burger1 = $("#burger_1"),
        burger2 = $('#burger_2');
        
    $("#nav>a").on("click",function(){
        menu.toggleClass("hidden");
        burger1.toggleClass('burger_nav_expand_1');
        burger2.toggleClass('burger_nav_expand_2');
    })
    burgerMenu.on("click",function(){
        menu.toggleClass("hidden");
        burger1.toggleClass('burger_nav_expand_1');
        burger2.toggleClass('burger_nav_expand_2');
    })    
    
    function parallalex( ){
        
        //css approach
        var offSet = -(window.pageYOffset / 4 ) +"px";
        //console.log(offSet);
        document.getElementById("parallalex_background").style.transform = "translate3d(0px, " + offSet + ", 0)";
    }
    
    function makeStuffSEOfriendly(){
        $('img').attr("alt","pain4pleasure flo gropper tattoo");
    }
    
    window.addEventListener('scroll',  parallalex , false);

    
    var init = function() {
        //checkScreenWidthandSetSectionHeight();
        console.log("app.init!")
        mod_home.bindEvents();
        mod_gallery.bindEvents();
        mod_contact.bindEvents();
        mod_footer.bindEvents();
        app.makeStuffSEOfriendly();
    };
    
    return {
        init: init,
        makeStuffSEOfriendly: makeStuffSEOfriendly
    }
})();

var mod_home = (function () {


    function bindEvents() {

    }

    function blur() {
        document.querySelector('.home_bgimage').classList.toggle("homeblur");
    }

    return{
        bindEvents:bindEvents
    }
})();

var mod_about = (function () {
        var caption = $("#about1_caption"),
            text = $("#about1_text"),
            image = $("#about_image"),
            caption2 = $("#about2_caption"),
            text2 = $("#about2_text"),
            caption3 = $("#about3_caption"),
            text3 = $("#about3_text"),  
            caption4 = $("#contact_caption"),
            text4 = $("#contact_text");
            
    
        $.ajax({
        //url: "http://pain4pleasure.de/test/Web/assets/text/images.json", for online ftp
        url: "assets/text/about.json",

        // Tell jQuery we're expecting JSONP
        dataType: "json",

        // Tell YQL what we want and that we want JSON

        // Work with the response
        success: function( response ) {
            console.log( response ); // server response
            data = response;
            caption.html(data.about.caption);
            text.html(data.about.paragraph);
            caption2.html(data.style.caption);
            text2.html(data.style.paragraph);
            caption3.html(data.termin.caption);
            text3.html(data.termin.paragraph);           
            caption4.html(data.motiv.caption);
            text4.html(data.motiv.paragraph);
        }
    });
})();

var mod_gallery = (function () {
    $.ajax({
        //url: "http://pain4pleasure.de/test/Web/assets/text/images.json", for online ftp
        url: "assets/text/images.json",

        // Tell jQuery we're expecting JSONP
        dataType: "json",

        // Tell YQL what we want and that we want JSON

        // Work with the response
        success: function( response ) {
            //console.log( response ); // server response
            images = response.midRes;
            thumbs = response.thumbs;
            loadThumbs();
        }
    });

    var currentImage = 0,currentThumb = 5,ImagesAdded = 6,count = 0;
    var path = "http://pain4pleasure.de/web/assets/images/tattoos/midRes/", //online
        path2 = "http://pain4pleasure.de/web/assets/images/tattoos/thumbs/";  //online
    var $gallery = $("#gallery");
    var img1 = document.getElementById("image"),
        img2 = document.getElementById("image2");
    var images = [],thumbs = [];
    
    //console.log(images);

    /*

    The idea is to load 2 images at the beginning, while one is shown, the hidden one lazy loads the image in the background


     */
    
    function displaySelectedImage(e){
        currentImage = thumbs.indexOf(e.target.src.substring(path2.length,e.target.length)); // the Index of the currently diplayed image
        var p = "" + path + images[currentImage] + "";
        //console.log("currentImage: " + currentImage);
        if($('.color')){
            $('.color').toggleClass("blackngrey");
            $('.color').toggleClass("color");
        }
        e.target.classList.toggle('blackngrey');
        e.target.classList.toggle('color');
        $(".gallery_image:not(.hidden)").toggleClass("hidden");
        $("img[src='" + p + "']" ).toggleClass("hidden");
        
    }
    
    function displayImage(){
        var p = "" + path + images[currentImage] + "";
        $(".gallery_image:not(.hidden)").toggleClass("hidden");
        $("img[src='" + p + "']" ).toggleClass("hidden");
        
    }
        

    
    function markThumbSelected(){
        $(".color").toggleClass("color").toggleClass("blackngrey");
        $("img[src='" + path2 + thumbs[currentImage] + "']" ).toggleClass("color").toggleClass("blackngrey");
        document.getElementById("gallery_thumb_container").style.transform = "translate3d(" + ( - 90 * currentImage ) + "px," + "0," + "0)";
    }
    
    function loadImagesNext(){
        console.log(currentImage);
        if(currentImage < images.length-1){
            currentImage++;
        }else{
            currentImage = 0;
        }
        loadImages();
        displayImage();
        markThumbSelected();
    }    
    function loadImagesPrevious(){
        console.log(currentImage);
        if(currentImage > 0){
            currentImage--;
        }else{
            currentImage = images.length-1;
        }
        loadImages();
        displayImage();
        markThumbSelected();
    } 
    
    function loadImages(){
            var count2 = ImagesAdded;
            if(ImagesAdded < images.length){
                
                count2 += 7;
            
            for(var i = ImagesAdded; i < count2 ; i++){
                //console.log(i + "and" + ImagesAdded + "and" + count2);
                var image = document.createElement('img');
                image.src = path + i + "_mid.jpg";
                image.name = "" + i;
                image.classList.add("gallery_image","hidden");
                document.getElementById("image_view").appendChild(image);
                ImagesAdded++;
            }
        }else{
            //console.log("all images added");
        }
    }
    
    function loadThumbs(){
        
        var ctn = $("#gallery_thumb_container");
        for(var i = 0; i < thumbs.length; ++i){
            var $thumb = $('<img class="image_thumb blackngrey">');
            if(i == 0){
                $thumb.addClass("color");
                $thumb.removeClass("blackngrey");
            }
            var url = path2 + thumbs[i];
            $thumb.attr('src', url);
            $thumb.appendTo(ctn);
            console.log("thumbsloaded");
            
        }
    }   
    
    
    function loadThumbsPrev() {
            if(count > 0){
                var $vel = $('#gallery_thumb_wrapper').width() ;
                $('#gallery_thumb_container').animate( {left: "+=" + $vel} , 500 );
                count -= 1;
            }
            //check
            var con = $('#gallery_thumb_container').css('left');
            
    }
    
    function loadThumbsNext() {
            if(count < 4){
                var $vel = $('#gallery_thumb_wrapper').width() ;
                $('#gallery_thumb_container').animate( {left: "-=" + $vel} , 500 );
                count += 1;
            }
            //check
            var con = $('#gallery_thumb_container').css('left');

    }
    

    function bindEvents() {
        $("#gallery_btn_prev>a").click(function(){loadImagesPrevious();loadImages();});        
        $("#gallery_btn_next>a").click(function(){loadImagesNext();loadImages();});
        $('#gallery_thumb_wrapper').on('scroll', function(){ loadImages();});
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                    //loadImagesPrevious();
                    break;

                case 38: // up
                    break;

                case 39: // right
                    //loadImagesNext();
                    break;

                case 40: // down
                    break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
             
            if( $(".image_thumb")  ){
                    $(".image_thumb").on("click",function(e){
                    //console.log(e);
                    displaySelectedImage(e);
                    });
                    //console.log("attached");
                }
            else{
                console.log("images attached too soon");
            }
    }
    return {
        bindEvents:bindEvents
    }
})();

var mod_contact = (function () {
    
    
    var uploadedImagesCount = 0,
        maxImageSize = 2000048,
        maxImageCount = 8;
    var $form = $('#contact_form'),
        $form_elements = $('#contact_form>input');
    
    var bindEvents = function() {

        document.querySelectorAll('.files').forEach(function(item,e){
            item.addEventListener('change',function(e){
                imageUploadValidation(e);
            });
        });
    
        document.getElementById("contact_form_send_btn").addEventListener("click", function(){
        }, false );
    }
            

    function imageUploadValidation(event){
        var file = event.target.files[0],
            parent = event.target.parentElement;
            //console.log(file);
        if ( /\.(jpe?g|png|gif)$/i.test(file.name) ){
            console.log("file_format_pass");
        }else{
            window.alert("bitte nur Bilder in folgenden Formaten: .jpg, .png, .gif");    
            event.target.value = '';
        }
        if(file.size > maxImageSize){
            window.alert("Bitte ein kleineres Bild wählen");
            event.target.value = '';
        }else{
                var reader = new FileReader();
                reader.onloadend = function(){
                    //console.log(parent);
                    parent.style.backgroundImage = 'url("'+ reader.result + '")';  
                    parent.style.backgroundSize = 'cover';
                };
            if(file){
                reader.readAsDataURL(file);
            }
        };
    }
    
    function validateForm(){
        var allFieldsFilled = false, noFilesAttached = true;
        var $errorElements = [];
        
        
        $('#contact_left').find(':input').each(function(index,element){
            //console.log( $( element ).val() );
            if( $( element ).val() == "" ){
                $errorElements.push( $( element ) );
            }else {
                console.log( $( element ).val() );
            }
        })
        
        $('#contact_right').find(':input').each(function(index,element){
            if ( $( element ).val() != ""){
                noFilesAttached = false;
            }
        })
                                                
                                                
                                            
        if( $errorElements.length <= 0 ){
            allFieldsFilled = true;
        }else{
            allFieldsFilled = false;
            console.log( $errorElements );
        }
        
        
        
        
        if( allFieldsFilled  && !noFilesAttached){
            //send form
        }else{
            if( !allFieldsFilled ){
                alert("Bitte alle Felder ausfüller!");
            }
            if( noFilesAttached){
                alert("Bitte Bilder von der Stelle und dem Tattoo auswählen!");
            }
            
            event.preventDefault();
        }
        console.log("validated");
    }
    
    
    /*
    
    function send(store) {
        
        //for every key in local storage _> get value and build js object -> parseJson and send xhr
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
          console.log( localStorage.getItem( localStorage.key( i ) ) );
        }

        
        var formData = new FormData();
    
            //textData
            formData.append('section', 'general');
            formData.append('action', 'previewImg');
            // Main magic with files here
            formData.append('image', $('input[type=file]')[0].files[0]); 
        
        formData.append('email','basti.reissmueller@googlemail.com');
        formData.append('first_name','Basti');
        formData.append('last_name','Reiss');
        formData.append('message','Pain4Pleasure/formTransfer');
        
      $.ajax({
            url: 'http://www.pain4pleasure.de/web/php/contact.php',
            data: formData,
            type: 'POST',
            // THIS MUST BE DONE FOR FILE UPLOADING
            contentType: false,
            processData: false,
            // ... Other options like success and etc
            success: function(){console.log("files_uploaded")}
      })

    }  */
    return {
        bindEvents: bindEvents,
        validateForm: validateForm
    }

})();

var mod_footer = (function () {
    var expanded = false,
        footerData = {};
    
    var $footerExp = $('#foot_footer'),
        $footerNavigation = $('#footer_navigation'),
        $footerContent = $('#footer_content'),
        $footerBtnImp = $('#footer_btn_impressum');
    
    $.ajax({
        //url: "http://pain4pleasure.de/test/Web/assets/text/images.json", for online ftp
        url: "assets/text/footer.json",

        // Tell jQuery we're expecting JSONP
        dataType: "json",

        // Work with the response
        success: function( response ) {
            //console.log( response ); // server response
            footerData = response;
            bindData();
        }
    });
    function bindData(data){
        $footerContent.find('div').html(data);
    }
    
    function bindEvents(){
        $footerBtnImp.click(function (event) {
            bindData(footerData.impressum);
                $footerExp.toggleClass("footer_expand");
                $footerNavigation.toggleClass("footer_navigation_top");
                $footerContent.toggleClass("hidden");
                $footerBtnImp.toggleClass("footer_link_active");
            
                expanded != expanded;
        })
            
    };
                                                           
    return{
        bindEvents:bindEvents
    }
})();

$(window).on('load',function () {
    app.init();
});

//console.log("this website is made by Basti Reiss, for enquiries go to my website www.google.com");

