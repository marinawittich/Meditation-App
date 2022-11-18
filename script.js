const app = () =>{
    const song = document.querySelector('.song');
    console.log(song);
    const play = document.querySelector('.play');
    const video = document.querySelector('.vid-container video');
    const outline = document.querySelector('.moving-outline circle');
    const sounds = document.querySelectorAll('.sound-picker button');
    const timesDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    
    // Time of playing
    let duration = 600;

    //Countdown in the circle
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

   

    //Play sound
    play.addEventListener('click', () =>{
        checkPlaying(song);
    })
     //Select duration
   
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            duration = this.getAttribute("data-time");
            timesDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
            
            
        })
    })
    //stop and play function
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src="./svg/pause.svg";
        }
        else{
            song.pause();
            video.pause();
            play.src="./svg/play.svg";
        }
    }
    //Animated the circle
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let minutes = Math.floor(elapsed / 60);
        let seconds = Math.floor(elapsed%60);

        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

    //Animate taimer
        timesDisplay.textContent = `${minutes}:${seconds}`;
        
        if (currentTime >= duration){
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src="./svg/play.svg";
        }
        else if (seconds < 10){
            seconds = "0" + seconds;
        }
        
    }
    //Choose sounds
    sounds.forEach (sound => {
        sound.addEventListener('click', function(){
            song.src= this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        })
    })

}

app();

//animation
gsap. from('.time-select', {y:-300, duration:3, delay:1, stagger:1, ease:"bounce",  opacity:0}) 
gsap. from('.sound-picker', {y:-300, duration:3, delay:1, stagger:1, ease:"bounce",  opacity:0})
gsap. from('.player-container', { duration:3, delay:4, opacity:0}) 
gsap. from('.header-container', { duration:3, delay:4, opacity:0}) 
 