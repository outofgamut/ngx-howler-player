import { Injectable, OnInit } from '@angular/core';

export interface Song {
  title: string;
  artist: string;
  path: string;
  category: string;
  img?: string;
  howl?: Howl;
}

@Injectable()
export class PlaylistService {

  sound: Howl;
  playingIndex = 0;
  currentSong: Song;
  playlist: Array<Song> = [
    {
      title: 'My heroes have always been Cowboys',
      artist: 'Willie Nelson',
      path: 'assets/Songs/Willie Nelson/Greatest Hits (& Some That Will Be)/13 - My Heroes Have Always Been Cowboys.mp3',
      img: 'assets/Images/willie_nelson.jpg',
      category: 'Texas-Nashville connection'
    },
    {
      title: 'Bobbie McGee',
      artist: 'Kris Kristopherson',
      path: 'assets/Songs/Kris Kristofferson/16 Biggest Hits/01 - Me and Bobby McGee.mp3',
      img: 'assets/Images/kris_kristofferson.jpg',
      category: 'Texas-Nashville connection'
    },
    {
      title: 'Mr. Bojangles',
      artist: 'Jerry Jeff Walker',
      path: 'assets/Songs/Jerry Jeff Walker/Mr. Bojangles/02 - Mr. Bojangles.mp3',
      category: 'Texas-Nashville connection'
    },
    {
      title: 'Good Hearted Woman',
      artist: 'Waylon Jennings',
      path: 'assets/Songs/Phaseone/Unknown Album/Daily Routine.mp3',
      category: 'Texas-Nashville connection'
    },
    {
      title: 'London Homesick Blues',
      artist: 'Gary P Nunn',
      path: 'assets/Songs/Phaseone/Unknown Album/Daily Routine.mp3',
      category: 'Texas-Nashville connection'
    },
    {
      title: 'Pancho and Lefty',
      artist: 'Townes Van Zandt',
      path: 'assets/Songs/Phaseone/Unknown Album/Daily Routine.mp3',
      category: 'Texas-Nashville connection'
    },
    {
      title: 'He Stopped Loving Her today',
      artist: 'George Jones',
      path: 'assets/Songs/Phaseone/Unknown Album/Daily Routine.mp3',
      category: 'Texas-Nashville connection'
    },
    {
      title: 'Desperados Waiting for a Train',
      artist: 'Guy Clarke',
      path: 'assets/Songs/Phaseone/Unknown Album/Daily Routine.mp3',
      category: 'Texas-Nashville connection'
    },
  ];

  constructor() { }




  /**
 * Skip to the next or previous track.
 * @param  {String} direction 'next' or 'prev'.
 */
  skip(direction: string) {

    let index = 0;
    if (direction === 'prev') {
      index = this.playingIndex - 1;
      if (index < 0) {
        index = this.playlist.length - 1;
      }
    } else {
      index = this.playingIndex + 1;
      if (index >= this.playlist.length) {
        index = 0;
      }
    }

    this.skipTo(index);

  }

  isPlaying(index: number) {
    return this.playingIndex === index;
  }

  play(index: number) {
    const self = this;
    this.currentSong = this.playlist[index];
    if (this.currentSong.howl) {
      this.sound = this.currentSong.howl;
    } else {
      this.sound = this.currentSong.howl = new Howl({
        src: this.currentSong.path,
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function () {
          // Display the duration.
          // duration.innerHTML = self.formatTime(Math.round(sound.duration()));

          // Start upating the progress of the track.

          // Start the wave animation if we have already loaded
        },
        onend: function () {
          // Stop the wave animation.
          self.skip('next');
        },
      });
    }

    // Begin playing the sound.
    this.sound.play();

    // Keep track of the index we are currently playing.
    this.playingIndex = index;
  }
    /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo(index: number) {

    // Stop the current track.
    if (this.playlist[this.playingIndex].howl) {
      this.playlist[this.playingIndex].howl.stop();
    }

    this.play(index);
  }

  pause() {
    this.sound.pause();
  }

  resume() {
    this.sound.play();
  }

  stop() {
    this.sound.stop();
  }

  formatTime(secs: number) {
    const roundedSecs = Math.round(secs);
    const minutes = Math.floor(roundedSecs / 60) || 0;
    const seconds = (roundedSecs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
}

