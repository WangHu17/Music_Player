(function(){
    var audioElem = document.createElement('audio');
    audioElem.setAttribute('src',$('.active_song').attr('data-origin'));
    var timeLine  = $('.playerLineBar').get(0).offsetWidth;
    var t = new TimelineMax();
        t.to('.player_cdData',3,{
            rotation:'360deg',
            ease:Power0.easeNone,
            repeat:-1
        },'-=0.2s')
        t.pause();

        //点击播放
        $('.player_play').click(function(){
            if($('.player').hasClass('play')){
                $('.player').removeClass('play');
                
                TweenMax.to('.player_cdData',0.2,{
                    scale:1,
                    ease:Power0.easeNone
                })
                TweenMax.to('.back_Mask',0.2,{
                    top:0,
                    ease:Power0.easeNone
                })

                audioElem.pause();
                t.pause();
            }else{
                $('.player').addClass('play');
               
                TweenMax.to('.player_cdData',0.2,{
                    scale:1.1,
                    ease:Power0.easeNone
                })
                TweenMax.to('.back_Mask',0.2,{
                    top:'-50%',
                    ease:Power0.easeNone
                })
               
                t.play();
                audioPlay();
                changeSoneLrc();
                durationLine();
            }
        })
        
        function changeSoneLrc(){
            $('.songName').text($('.active_song').attr('songName'));
            $('.singer').text($('.active_song').attr('singer'));
        }
        function durationLine(){
            audioElem.addEventListener('timeupdate',function(){
                var duration =  this.duration;//整首歌的长度s为单位。
                var current = this.currentTime;//当前的时间s为单位。
                var percent = current/duration;
                $('.duration').css({
                    width:parseInt(percent*timeLine) + 'px'
                })

            })
        }
        function audioPlay(){
            if($('.player').hasClass('play')){
                audioElem.setAttribute('src',$('.active_song').attr('data-origin'));
                audioElem.play();
            }
           
        }
        //上一曲  下一曲

        $('.player_prev').click(function(){
             if($('.player .player_cdData.active_song').is(':first-child')){
                $('.player .player_cdData.active_song').removeClass('active_song')
                $('.player .player_cdData:last-child').addClass('active_song')
             }else{
                $('.player .player_cdData.active_song').removeClass('active_song').prev().addClass('active_song');
             }
             audioPlay();
             changeSoneLrc();
             durationLine();
        })

        $('.player_next').click(function(){
            if($('.player .player_cdData.active_song').is(':last-child')){
                $('.player .player_cdData.active_song').removeClass('active_song')
                $('.player .player_cdData:first-child').addClass('active_song')
             }else{
                $('.player .player_cdData.active_song').removeClass('active_song').next().addClass('active_song');
             }
             audioPlay();
             changeSoneLrc();
             durationLine();

        })
})()