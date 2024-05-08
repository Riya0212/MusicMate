import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event
  } from 'react-native-track-player';
  
  export async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    }
    catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,
      });
  
      isSetup = true;
    }
    finally {
      return isSetup;
    }
  }
  
//   export async function addTracks() {
//     await TrackPlayer.add([
//       {
//         id: '1',
//         url: require('@/assets/songs/Lae_Dooba.mp3'),
//         title: 'Lae Dooba',
//         artist: 'tobylane',
//         // duration: 60,
//       },
//       {
//         id: '2',
//         url: require('@/assets/songs/Tum_Se.mp3'),
//         title: 'Tum Se',
//         artist: 'tobylane',
//         // duration: 60,
//       },
//       {
//         id: '3',
//         url: require('@/assets/songs/Thodi_Der.mp3'),
//         title: 'Thodi Der',
//         artist: 'tobylane',
//         // duration: 60,
//       },
//       {
//         id: '4',
//         url: require('@/assets/songs/Maiyya_Mainu.mp3'),
//         title: 'Maiyya Mainu',
//         artist: 'tobylane',
//         // duration: 60,
//       },
//     ]);
//     await TrackPlayer.setRepeatMode(RepeatMode.Queue);
//   }
  
  export function secondsToHHMMSS (seconds) {
    // credits - https://stackoverflow.com/a/37096512
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
    return `${hrs}${mins}${scnds}`;
};
  export async function playbackService() {
    // TODO: Attach remote event handlers
  }