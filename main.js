const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnListSong = $('.listsong');
const listMySong = $('.list-my-songs');
const screenOveflow = $('.overflow-select');
const numberSongOfSongs = $('.list-my-songs__number span');
const btnClose = $('.list-my-songs-close');
const thisCarousel = $('.carousel');

const nameOfCurrentSong = $('.mysongplaying__currentsong-song');
const singgerOfCurrentSong = $('.mysongplaying__currentsong-singger');
const btnPausePlay = $('.control-buttonsong-wrap');
const btnPausePlayIcon = $('.control-buttonsong-icon.big-icon'); 
const inputTime = $('.input-time');
const btnNext = $('.control-buttonsong-icon--next');
const btnPrevious = $('.control-buttonsong-icon--previous');
const btnChangeVolume = $('.input-volumn');
const btnRandom = $('.control-buttonsong-icon--random');
const audio = $('.song-audio');
const btnRepeat = $('.control-buttonsong-icon--repeat');
const listMySongs = $('.list-my-songs__list');
const btnSetTimeOut = $('.mysongplaying__setTimeOut');
const overflowSetTimeOut = $('.overflow-settimeout');
const setTimeOutBlock = $('.setTimePause');
const btnCloseSetTimeOut = $('.setTimePause__btn--close');
const btnSetSetTimeOut = $('.setTimePause__btn--set');
const inputSetHour = $('.setTimePause__input--hour');
const inputSetMinute = $('.setTimePause__input--minute');
const inputSetSec = $('.setTimePause__input--sec');


const app = {
    currentIndex : 0,
    timeOfCurrentSong: 0,
    isPlay : false,
    isRandom : false,
    isRepeat: false,
    songs: [
        {
            name: 'Anh làm gì sai',
            singer: 'Châu Khải Phong',
            path: './assets/audio/Anh Lam Gi Sai - Chau Khai Phong_ ACV.mp3',
            image: './assets/img/anh lam gi sai.jpg'
        },
        {
            name: 'Anh từng cố gắng',
            singer: 'Nhật Phong',
            path: './assets/audio/Anh Tung Co Gang - Nhat Phong.mp3',
            image: './assets/img/anh tung co gang.jpg'
        },
        {
            name: 'Đừng như người dưng',
            singer: 'Nhật Phong',
            path: './assets/audio/Dung Nhu Nguoi Dung - Nhat Phong.mp3',
            image: './assets/img/dung nhu nguoi dung.jpg'
        },
        {
            name: 'Em say rồi',
            singer: 'Thương Võ',
            path: './assets/audio/Em Say Roi - Thuong Vo.mp3',
            image: './assets/img/em say roi.jpg'
        },
        {
            name: 'Họ yêu ai mất rồi',
            singer: 'Doãn Hiếu',
            path: './assets/audio/HoYeuAiMatRoiLofiVersion-DoanHieuMrPaa-6973827.mp3',
            image: './assets/img/ho yeu ai mat roi.jpg'
        },
        {
            name: 'Thương thầm',
            singer: 'Hoài Bảo',
            path: './assets/audio/ThuongTham-RickyStarKhoa-6464375.mp3',
            image: './assets/img/thuong tham.jpg'
        }
    ],



    // Hàm load danh sách bài hát
    loadListSongs: function() {
        _this = this;
        //load ra danh sách bài hát
        var htmls = this.songs.map(function(song, index) {
            return `
                <div class="list-my-songs__list-item ${(_this.currentIndex === index) ? 'active' : ''}"  data-parent = "${index}">
                    <div class="list-my-songs__list-item-img">
                        <img src="${song.image}" alt="ANH">
                    </div>
                    <div class="list-my-songs__list-item-text">
                        <span class="list-my-songs__list-item-text-name">${song.name}</span>
                        <span class="list-my-songs__list-item-text-singer">${song.singer}</span>
                    </div>
                </div>
            `
        }).join('\n');

        listMySongs.innerHTML = htmls;

        //load ra slider ảnh của bài hát
        var listCarouselItems = this.songs.map(function(song, index) {
            return `
            <div class="carousel-item song${index}">
            <img src="${song.image}" alt="">
            </div>
            `
        });

        thisCarousel.innerHTML = listCarouselItems.join('\n');
        

        //thêm số lượng bài hát vào danh sách
        const numberOfSong = this.songs.length;
        numberSongOfSongs.innerText = `Playing (${numberOfSong}songs)`;
        
    },



    // Hàm load current song khi tải trang 
    loadCurrentSongs: function() {
        const nextPreSongs = $(`.carousel-item.song${this.currentIndex}`);
        nextPreSongs.click();
        nameOfCurrentSong.innerHTML = this.songs[this.currentIndex].name;
        singgerOfCurrentSong.innerHTML = this.songs[this.currentIndex].singer;
    },

    // xử lý khi cái nút random đang ở chế độ random
    loadMySongRandom: function() {
        const numberRandom = Math.floor(Math.random() * this.songs.length);
        this.currentIndex = numberRandom;
        audio.src = this.songs[this.currentIndex].path;
        this.loadCurrentSongs();
        audio.play();
    },


    // Hàm xử lý các sự kiện
    handleEventsKhang: function() {
        _this = this;
        var audioPath = _this.songs[_this.currentIndex].path;
        audio.src = audioPath;

        // xử lý sự kiện khi click vào danh sách
        btnListSong.onclick = function() {
            listMySong.classList.add('active');
            screenOveflow.classList.add('active');

            // Khi click vào Overflow
            screenOveflow.onclick = function() {
                screenOveflow.classList.remove('active');
                listMySong.classList.remove('active');
            }

            // khi ấn vào nút close 
            btnClose.onclick = function() {
                screenOveflow.classList.remove('active');
                listMySong.classList.remove('active');
            }

        };



        //xử lý khi nhấn vào phát vào dừng bài hát
        btnPausePlay.onclick = function() {
            //Thời lượng của bài hát hiện tại
            _this.timeOfCurrentSong = audio.duration;
           

            if(_this.isPlay) {
                audio.pause();
                
            }else {
                audio.play();
            }

        };


        //Khi bài hat đang phát
        audio.onplay = function() {
            _this.isPlay = true;
            btnPausePlayIcon.classList.add('active');
        };

        //Khi bài hát dừng lại
        audio.onpause = function() {
            btnPausePlayIcon.classList.remove('active');
            _this.isPlay = false;
        };

        //Khi bài hát đang phát
        audio.ontimeupdate = function() {
            const currentTimes = audio.currentTime;
            var songTempo = currentTimes / _this.timeOfCurrentSong * 100;
            if(isNaN(songTempo)) songTempo = 0;
            inputTime.value = songTempo;
        };


        //Khi ấn nút chuyển bài hát
        btnNext.onclick = function() {
            if(_this.isRandom) {
                _this.loadMySongRandom();
            }else {
                _this.currentIndex++;
                _this.currentIndex = (_this.currentIndex > _this.songs.length - 1) ? 0 : _this.currentIndex;
                audioPath = _this.songs[_this.currentIndex].path;
                audio.src = audioPath;
                _this.loadCurrentSongs();
                audio.play();
            }
            
        };


        //Khi ấn chuyển về trước bài hát
        btnPrevious.onclick = function() {
            if(_this.isRandom) {
                _this.loadMySongRandom();
            }else {
                _this.currentIndex--;
                _this.currentIndex = (_this.currentIndex < 0) ? _this.songs.length - 1 : _this.currentIndex;
                audioPath = _this.songs[_this.currentIndex].path;
                audio.src = audioPath;
                _this.loadCurrentSongs();
                audio.play();
            }
            
        };


        //khi tua bài hát
        inputTime.onchange = function() {
            var percentSongs = inputTime.value;
            _this.timeOfCurrentSong = audio.duration;
            audio.currentTime = percentSongs * _this.timeOfCurrentSong / 100;
            audio.play();
        };

        //xử lý khi tăng giảm ân lượng
        btnChangeVolume.onchange = function() {
            const percentOfVolume = btnChangeVolume.value;
            audio.volume = percentOfVolume / 100;
        };

        //xử lý khi ấn phát ngẫu nhiên bài hát
        btnRandom.onclick = function() {
            if(_this.isRandom) {
                _this.isRandom = false;
                btnRandom.classList.remove('active');
            }
            else {
                _this.isRandom = true;
                btnRandom.classList.add('active');
            }

        };


        //xử lý khi bài hát kết thúc
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            }
            else{
                btnNext.click();
            }
        };

        //xử lý khi ấn vào nút lặp lại
        btnRepeat.onclick = function() {
            if(_this.isRepeat) {
                btnRepeat.classList.remove('active');
                _this.isRepeat = false;
            }else{
                btnRepeat.classList.add('active');
                _this.isRepeat = true;
            }
        }


        //xử lý khi ta ấn vào các bài hát trong danh sách
        listMySongs.onclick = function(e) {
            const elementNotActive = e.target.closest(".list-my-songs__list-item:not(.active)");
            if(elementNotActive) {
                $('.list-my-songs__list-item.active').classList.remove('active');
                elementNotActive.classList.add('active');
                _this.currentIndex = Number(elementNotActive.dataset.parent);
                _this.loadCurrentSongs();
                audio.src = _this.songs[_this.currentIndex].path;
                audio.play();
            }
            
        };


        // xử lý khi ta ấn vào nút setTimeOut
        btnSetTimeOut.onclick = function() {
            overflowSetTimeOut.classList.add('active');
            setTimeOutBlock.classList.add('active');

            overflowSetTimeOut.onclick = function() {
                overflowSetTimeOut.classList.remove('active');
                setTimeOutBlock.classList.remove('active');
            }

            btnCloseSetTimeOut.onclick = function() {
                overflowSetTimeOut.classList.remove('active');
                setTimeOutBlock.classList.remove('active');
            }

            var valueHour = 0;
            var valueMinute = 0;
            var valueSec = 0;
            inputSetHour.onchange = function() {
                valueHour = inputSetHour.value;
                valueHour = (!isNaN(valueHour) && !'') ? valueHour : 0;
                valueHour = Number(valueHour);
                inputSetHour.value = valueHour;
            }

            inputSetMinute.onchange = function() {
                valueMinute = inputSetMinute.value;
                valueMinute = (!isNaN(valueMinute) && !'') ? valueMinute : 0;
                valueMinute = Number(valueMinute);
                inputSetMinute.value = valueMinute;
            }

            inputSetSec.onchange = function() {
                valueSec = inputSetSec.value;
                valueSec = (!isNaN(valueSec) && !'') ? valueSec : 0;
                valueSec = Number(valueSec);
                inputSetSec.value = valueSec;
            }

            btnSetSetTimeOut.onclick = function() {
                const SumOfTimeOut = valueHour * 60 * 60 + valueMinute * 60 + valueSec;
                setTimeout(function() {
                    audio.pause();
                }, SumOfTimeOut * 1000);

                overflowSetTimeOut.classList.remove('active');
                setTimeOutBlock.classList.remove('active');
            }
        };


    },

    start: function() {

        this.loadListSongs();

        this.handleEventsKhang();

        this.loadCurrentSongs();

    },

};

app.start();
